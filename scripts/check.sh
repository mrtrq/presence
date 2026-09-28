#!/usr/bin/env bash
# Assess step: fast feedback loop for the revamp.
# Type-checks, builds every route, and reports bundle weight.
set -uo pipefail
cd "$(dirname "$0")/.."

echo "── typecheck ─────────────────────────────"
npx tsc --noEmit -p tsconfig.json || exit 1

echo "── build ─────────────────────────────────"
npm run build 2>&1 | tail -25

echo "── first-load JS per route ──────────────"
node -e '
const fs=require("fs");
const mf=JSON.parse(fs.readFileSync(".next/app-build-manifest.json","utf8"));
const seen=new Set();
for(const [p,files] of Object.entries(mf.pages||{})){
  const k=p.split("?")[0];
  if(seen.has(k))continue; seen.add(k);
  const size=files.reduce((a,f)=>{try{return a+fs.statSync(".next/"+f).size}catch{return a}},0);
  console.log(String(p).padEnd(34), (size/1024).toFixed(1)+" kB");
}'
