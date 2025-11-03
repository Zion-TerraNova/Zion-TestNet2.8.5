# ZION Docker Images - v2.8.5

Official Docker images for ZION Blockchain v2.8.5 "Milky Way" public testnet.

## 🐳 Available Images

| Image | Docker Hub | Size | Purpose |
|-------|-----------|------|---------|
| **zion-node** | `zionterranova/zion-node:2.8.5` | ~200MB | Full blockchain node with RPC API |
| **zion-pool** | `zionterranova/zion-pool:2.8.5` | ~220MB | Mining pool server (Stratum) |
| **zion-miner** | `zionterranova/zion-miner:2.8.5` | ~180MB | Mining client (CPU/GPU) |

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/Zion-TerraNova/Zion-TestNet2.8.5.git
cd Zion-TestNet2.8.5/docker

# Set environment variables
export ZION_POOL_WALLET="your_wallet_address"
export ZION_MINER_WALLET="your_wallet_address"
export ZION_MINER_THREADS="4"

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Run (Individual Containers)

#### Run ZION Node

```bash
docker run -d \
  --name zion-node \
  -p 8332:8332 \
  -p 9333:9333 \
  -v zion-node-data:/data \
  zionterranova/zion-node:2.8.5
```

#### Run ZION Pool

```bash
docker run -d \
  --name zion-pool \
  -p 3333:3333 \
  -p 8080:8080 \
  -v zion-pool-data:/data \
  -e ZION_POOL_WALLET="your_wallet_address" \
  -e ZION_BLOCKCHAIN_RPC="http://zion-node:8332" \
  --link zion-node \
  zionterranova/zion-pool:2.8.5
```

#### Run ZION Miner

```bash
docker run -d \
  --name zion-miner \
  -e ZION_WALLET="your_wallet_address" \
  -e ZION_POOL="pool.zionterranova.com:3333" \
  -e ZION_THREADS="4" \
  zionterranova/zion-miner:2.8.5
```

## 📋 Configuration

### Environment Variables

#### ZION Node

| Variable | Default | Description |
|----------|---------|-------------|
| `ZION_NETWORK` | `testnet` | Network type (testnet/mainnet) |
| `ZION_LOG_LEVEL` | `info` | Log level (debug/info/warning/error) |
| `ZION_HOME` | `/data` | Data directory path |

#### ZION Pool

| Variable | Default | Description |
|----------|---------|-------------|
| `ZION_POOL_WALLET` | *required* | Pool operator wallet address |
| `ZION_POOL_FEE` | `1.0` | Pool fee percentage (0.0-5.0) |
| `ZION_BLOCKCHAIN_RPC` | `http://zion-node:8332` | Blockchain RPC endpoint |

#### ZION Miner

| Variable | Default | Description |
|----------|---------|-------------|
| `ZION_WALLET` | *required* | Your wallet address for payouts |
| `ZION_POOL` | `pool.zionterranova.com:3333` | Pool address:port |
| `ZION_THREADS` | `auto` | Number of mining threads (auto/1-64) |

### Ports

#### ZION Node
- `8332`: RPC API (HTTP)
- `8545`: WebSocket API
- `9333`: P2P network

#### ZION Pool
- `3333`: Stratum protocol (primary)
- `3334`: Stratum protocol (yescrypt)
- `8080`: Pool dashboard (HTTP)
- `9090`: Prometheus metrics

## 🔧 Building Images

```bash
# Build all images
cd docker
chmod +x build_and_push.sh
./build_and_push.sh
```

## 📊 Monitoring

```bash
# Check health
docker ps

# View logs
docker-compose logs -f zion-node

# Metrics (Prometheus)
curl http://localhost:9090/metrics
```

## 📞 Support

- **Issues:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues
- **Email:** admin@zionterranova.com

---

**Version:** 2.8.5 "Milky Way"  
**JAI RAM SITA HANUMAN - ON THE STAR!** ⭐
