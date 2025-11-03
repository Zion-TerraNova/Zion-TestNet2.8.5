#!/usr/bin/env bash
set -euo pipefail

curl -sS http://localhost:8545/api/status | jq . || curl -sS http://localhost:8545/api/status
