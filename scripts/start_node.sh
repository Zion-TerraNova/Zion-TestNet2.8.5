#!/usr/bin/env bash
set -euo pipefail

# Spustí ZION node s testnet parametry
exec ./zion-node --testnet --config ./config/node.conf
