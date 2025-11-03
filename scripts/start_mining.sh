#!/usr/bin/env bash
set -euo pipefail

# ZION Mining starter (XMRig)

WALLET="${ZION_WALLET:-${1:-}}"
POOL="${ZION_POOL:-pool.zionterranova.com:3333}"
THREADS="${ZION_THREADS:-${2:-4}}"

if [ -z "$WALLET" ]; then
  echo "Error: Wallet address required."
  echo "Usage: ZION_WALLET=your_address ./start_mining.sh"
  echo "   or: ./start_mining.sh ZION_wallet_address [threads]"
  exit 1
fi

echo "Starting XMRig..."
echo "Pool: $POOL | Wallet: $WALLET | Threads: $THREADS"

xmrig -o "$POOL" \
      -u "$WALLET" \
      -p x \
      --coin monero \
      --threads "$THREADS" \
      --donate-level=0
