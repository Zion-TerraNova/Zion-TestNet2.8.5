# ⛏️ Mining Guide – ZION Testnet v2.8.5

Tento dokument popisuje těžbu na veřejném poolu a lokálně.

## CPU Mining (XMRig)

```bash
xmrig -o pool.zionterranova.com:3333 \
      -u ZION_wallet_adresa \
      -p x --coin monero
```

Tipy:
- Ujistěte se, že používáte správnou ZION adresu.
- Firewall nesmí blokovat port 3333.

## GPU Mining (Cosmic Harmony)

```bash
# SRBMiner (příklad, multi-algo)
./srbminer-multi --algorithm cosmic_harmony \
                 --pool pool.zionterranova.com:3334 \
                 --wallet ZION_wallet_adresa
```

## ZION Miner (binárka)

```bash
./zion-miner \
  --pool pool.zionterranova.com:3333 \
  --wallet ZION_wallet_adresa \
  --threads 4
```

## Ověření
- Pool statistiky: http://pool.zionterranova.com:8080/stats
- RPC status: `curl http://localhost:8545/api/status`