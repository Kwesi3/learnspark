#!/bin/sh
# Temporary: copy the built site's top-level files to the repo root, for GitHub Pages set to
# "Deploy from a branch". Not needed once Settings → Pages → Source is "GitHub Actions".
set -e
cd "$(dirname "$0")/.."
python3 tools/build.py --check
for f in index.html sw.js manifest.webmanifest icon.svg icon-192.png icon-512.png; do cp dist/site/$f ./$f; done
echo "root files updated"
