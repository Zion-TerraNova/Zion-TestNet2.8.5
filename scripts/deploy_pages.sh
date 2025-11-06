#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/Zion-TerraNova/Zion-TestNet2.8.5.git"
ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
SITE_DIR="$ROOT_DIR/websiteV2"
TMP_DIR="${ROOT_DIR}/.deploy-tmp-ghpages"
DOMAIN="testnet.zionterranova.com"

echo "Deploying WebsiteV2 to gh-pages..."

if [ ! -d "$SITE_DIR" ]; then
  echo "ERROR: $SITE_DIR not found" >&2
  exit 1
fi

rm -rf "$TMP_DIR"
 git clone "$REPO_URL" "$TMP_DIR"
cd "$TMP_DIR"

if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
else
  git checkout --orphan gh-pages
fi

# Ensure we're up to date with remote gh-pages to avoid non-fast-forward
git fetch origin gh-pages || true
if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
  git reset --hard origin/gh-pages || true
fi

# Clean working tree except .git
find . -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +

# Copy website content
rsync -av --exclude ".git" "$SITE_DIR/" "$TMP_DIR/"

# Ensure logo favicon exists on gh-pages
mkdir -p assets/icons
if [ -f "/Users/yeshuae/Desktop/ZION/Zion-2.8-main/Logo/Z.gif" ]; then
  cp "/Users/yeshuae/Desktop/ZION/Zion-2.8-main/Logo/Z.gif" assets/icons/zion.gif
elif [ -f "/Users/yeshuae/Desktop/ZION/V3/wiki/assets/Z.gif" ]; then
  cp "/Users/yeshuae/Desktop/ZION/V3/wiki/assets/Z.gif" assets/icons/zion.gif
fi

# Add CNAME for custom domain
echo "$DOMAIN" > CNAME

git add -A
if git diff --cached --quiet; then
  echo "No changes to publish."
else
  git commit -m "Publish WebsiteV2 to GitHub Pages (gh-pages)"
  # Force-with-lease to handle history rewrites safely
  git push --force-with-lease -u origin gh-pages
  echo "Published to gh-pages."
fi

echo "Done."
