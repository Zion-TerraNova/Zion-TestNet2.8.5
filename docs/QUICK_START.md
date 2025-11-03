# 🚀 Quick Start – ZION Testnet v2.8.5

Tento návod vás během 5 minut rozběhne na veřejném testnetu 2.8.5.

## Varianta A: Binárky (nejrychlejší)

1) Stáhnout z Releases
- Navštivte: https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases
- Stáhněte binárku pro vaši platformu (Linux/macOS/Windows)

2) Spustit node
```bash
chmod +x zion-node
./zion-node --testnet
```

3) Vytvořit peněženku (CLI)
```bash
./zion-cli wallet create
```

4) Ověřit stav
```bash
curl http://localhost:8545/api/status
```

## Varianta B: Docker (doporučeno)

```bash
docker pull zionterranova/zion-node:2.8.5
docker run -d -p 8545:8545 -p 8333:8333 zionterranova/zion-node:2.8.5
```

Mining (XMRig): viz [MINING_GUIDE.md](./MINING_GUIDE.md)

---

Poznámka: Testnet mince nemají žádnou hodnotu. Parametry jsou zjednodušené pro testování.