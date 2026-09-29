#!/usr/bin/env bash
# Assess step for the revamp: type-check, build, then report weight.
set -uo pipefail
cd "$(dirname "$0")/.."

echo "── typecheck ──────────────────────────────────"
npx tsc --noEmit -p tsconfig.json || exit 1

echo "── build ──────────────────────────────────────"
npm run build 2>&1 | tail -18

echo "── stylesheet sanity ─────────────────────────"
# A class can be referenced by a component and have no rule at all, which
# renders the page unstyled with nothing in the build output to indicate it.
# Cross-check the class names used in app/ against the selectors in the CSS.
node -e '
const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

const css = fs.readFileSync("app/globals.css", "utf8");
const defined = new Set(
  [...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1])
);

// Tailwind utility classes and third-party class names are not in the
// stylesheet, so only flag names that look hand-written and are not obviously
// utilities.
const UTILITY = /^(?:[a-z0-9-]+:)*(?:flex|grid|block|inline|hidden|absolute|relative|fixed|sticky|static|container|mx|my|mt|mb|ml|mr|px|py|pt|pb|pl|pr|gap|items|justify|w|h|min-h|max-w|text|font|bg|border|rounded|shadow|opacity|z|top|left|right|bottom|space-y|overflow|object|order|col|row|transition|duration|ease|transform|rotate|translate|scale|pointer|select|cursor|antialiased|italic|uppercase|tracking|leading|sr-only|md|lg|sm|xl|group|peer|dark)(?:-|$)/;

const used = new Map();
for (const file of walk("app")) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    const raw = m[1] || m[2] || "";
    // Strip template expressions; they are values, not class names.
    const cleaned = raw.replace(/\$\{[^}]*\}/g, " ");
    for (const name of cleaned.split(/\s+/)) {
      if (!name || name.includes("$") || name.startsWith("{")) continue;
      if (UTILITY.test(name)) continue;
      if (!used.has(name)) used.set(name, file);
    }
  }
}

const missing = [...used.entries()].filter(([name]) => !defined.has(name));
if (missing.length) {
  console.log("  classes used in components but absent from app/globals.css:");
  for (const [name, file] of missing) console.log("    ." + name + "  (" + file + ")");
  console.log("");
  console.log("  These render unstyled. Add a rule, or drop the class.");
  process.exitCode = 1;
} else {
  console.log("  all " + used.size + " hand-written classes have rules");
}
'

echo "── output weight ──────────────────────────────"
node -e '
const fs = require("fs");
const path = require("path");

// Turbopack writes the client manifest under a build-id directory.
function findManifest(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!fs.statSync(full).isDirectory()) continue;
    const hit = path.join(full, "app-build-manifest.json");
    if (fs.existsSync(hit)) return hit;
  }
  return null;
}

const manifestPath = findManifest(".next");
if (!manifestPath) {
  console.log("  (no app-build-manifest.json found — skipping per-route sizes)");
} else {
  const mf = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const base = path.dirname(manifestPath);
  const seen = new Set();
  for (const [route, files] of Object.entries(mf.pages || {})) {
    const key = route.split("?")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    const size = files.reduce((sum, f) => {
      try { return sum + fs.statSync(path.join(base, f)).size; } catch { return sum; }
    }, 0);
    console.log("  " + String(route).padEnd(32) + (size / 1024).toFixed(1) + " kB");
  }
}

// The number that actually matters: what a first-time visitor downloads for
// the home screen. Reported gzipped, because the chunks on disk are
// uncompressed and the raw figure overstates the cost by roughly 3x.
const zlib = require("zlib");
const html = fs.readFileSync(".next/server/app/index.html", "utf8");
const refs = [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]))];

const buckets = { fonts: 0, js: 0, css: 0, other: 0 };
let totalRaw = Buffer.byteLength(html);
let totalGz = zlib.gzipSync(html).length;

for (const ref of refs) {
  let buf;
  try { buf = fs.readFileSync(".next" + ref.replace("/_next", "")); } catch { continue; }
  const gz = zlib.gzipSync(buf).length;
  totalRaw += buf.length;
  totalGz += gz;
  if (ref.endsWith(".woff2") || ref.endsWith(".woff")) buckets.fonts += gz;
  else if (ref.endsWith(".js")) buckets.js += gz;
  else if (ref.endsWith(".css")) buckets.css += gz;
  else buckets.other += gz;
}

const kb = (n) => (n / 1024).toFixed(1) + " kB";
console.log("  home HTML              " + kb(zlib.gzipSync(html).length));
console.log("  home CSS               " + kb(buckets.css));
console.log("  home client JS         " + kb(buckets.js));
console.log("  home fonts             " + kb(buckets.fonts) + (buckets.other ? "  (+" + kb(buckets.other) + " other)" : ""));
console.log("  ─────────────────────────────────────────");
console.log("  home total, gzipped    " + kb(totalGz) + "   (raw on disk " + kb(totalRaw) + ")");
'
