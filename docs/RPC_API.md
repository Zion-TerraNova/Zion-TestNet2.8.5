# 📡 RPC API – ZION Testnet v2.8.5

Základní veřejné endpointy a příklady.

## Základní endpointy
- REST: `http://localhost:8545/api/*`
- JSON-RPC (pro mining): `http://localhost:18081/json_rpc`

## REST příklady
```bash
# Stav nodu
curl http://localhost:8545/api/status

# Informace o blockchainu
curl http://localhost:8545/api/getblockchaininfo
```

## JSON-RPC příklad (getblocktemplate)
```bash
curl -X POST http://localhost:18081/json_rpc \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"getblocktemplate",
    "params":{}
  }'
```

Poznámka: Testnet používá Monero-kompatibilní hashing blob a 8-byte LE target.