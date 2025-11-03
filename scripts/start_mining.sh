#!/usr/bin/env bash
set -euo pipefail

WALLET=${1:-ZION_wallet_adresa}
THREADS=${2:-2}

xmrig -o pool.zionterranova.com:3333 -u "$WALLET" -p x --coin monero --threads "$THREADS"
