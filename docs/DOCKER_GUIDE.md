# 🐳 Docker Guide – ZION Testnet v2.8.5

## Rychlý start (Compose)

```bash
# stáhnout compose
wget https://raw.githubusercontent.com/Zion-TerraNova/Zion-TestNet2.8.5/main/docker/docker-compose.yml

# spustit stack
docker-compose up -d

# logy
docker-compose logs -f
```

## Ruční spuštění kontejnerů

```bash
# Node
docker run -d \
  --name zion-node \
  -p 8332:8332 -p 8545:8545 -p 9333:9333 \
  zionterranova/zion-node:2.8.5

# Pool
docker run -d \
  --name zion-pool \
  -p 3333:3333 -p 8080:8080 \
  -e ZION_POOL_WALLET="ZION_wallet_adresa" \
  zionterranova/zion-pool:2.8.5

# Miner (test)
docker run -d \
  --name zion-miner \
  -e ZION_WALLET="ZION_wallet_adresa" \
  -e ZION_POOL="pool.zionterranova.com:3333" \
  zionterranova/zion-miner:2.8.5
```