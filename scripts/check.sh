#!/usr/bin/env bash
# Assess step for the revamp: type-check, build, then report weight.
set -uo pipefail
cd "$(dirname "$0")/.."

echo "── typecheck ──────────────────────────────────"
npx tsc --noEmit -p tsconfig.json || exit 1

echo "── build ──────────────────────────────────────"
npm run build 2>&1 | tail -18

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
// the home screen.
const html = fs.readFileSync(".next/server/app/index.html", "utf8");
const scripts = [...new Set([...html.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]))];
let clientJs = 0;
for (const src of scripts) {
  try { clientJs += fs.statSync(".next" + src.replace("/_next", "")).size; } catch {}
}
const css = [...html.matchAll(/href="(\/_next\/static\/[^"]+\.css)"/g)].map((m) => m[1]);
let cssSize = 0;
for (const href of new Set(css)) {
  try { cssSize += fs.statSync(".next" + href.replace("/_next", "")).size; } catch {}
}

const kb = (n) => (n / 1024).toFixed(1) + " kB";
console.log("  home HTML              " + kb(fs.statSync(".next/server/app/index.html").size));
console.log("  home client JS         " + kb(clientJs) + "  (" + scripts.length + " chunks)");
console.log("  home CSS               " + kb(cssSize));
console.log("  home total             " + kb(fs.statSync(".next/server/app/index.html").size + clientJs + cssSize));
'
