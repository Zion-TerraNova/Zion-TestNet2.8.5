# 🌌 ZION Blockchain - Public Testnet v2.8.5 "Milky Way"

Official public testnet release of ZION Blockchain - The world's first consciousness-mining dharma ecosystem.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.8.5-green.svg)](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey.svg)](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases)

## 🎯 What is ZION?

**ZION** is a multi-chain dharma ecosystem combining blockchain technology with spiritual evolution and humanitarian impact.

### 🌟 Key Features (v2.8.5)

- 🎮 **ZION OASIS** - AAA MMORPG with $10B Golden Egg treasure (1B ZION)
- 🌌 **COSMIC MAP** - 15-dimensional consciousness framework (3024 mastery levels)
- 📚 **Sacred Library** - 39,036 lines of Vedic wisdom on-chain
- 🌉 **Multi-Chain Bridges** - Solana, Stellar, Cardano, Tron integration
- ⛏️ **Consciousness Mining** - Mining = spiritual evolution (9 CL levels)

### 📊 Tokenomics (Mainnet v3.0)

```yaml
Total Supply:     144,000,000,000 ZION (144 billion)
Premine:          15,780,000,000 ZION (15.78B = 11%)
Mining Supply:    128,220,000,000 ZION (128.22B = 89%)

Premine Breakdown:
  - Mining Operators: 8.25B (consciousness rewards 2025-2035)
  - DAO Winners: 1.75B (Golden Egg + XP leaderboard)
  - ZION OASIS: 1.44B (AAA game fund 2025-2030)
  - Infrastructure: 4.34B (development + humanitarian)

Block Time:       150 seconds (~2.5 minutes)
Algorithms:       cosmic_harmony, randomx, yescrypt, autolykos_v2
Humanitarian:     10-25% pool redistribution → charity (mainnet only)
```

**⚠️ IMPORTANT:** v2.8.5 is TESTNET (public testing), not mainnet. Testnet coins have NO value. Mainnet v3.0 launches Q1 2027.

## 🚀 Quick Start

### Option 1: Pre-Built Binaries (Recommended)

Download binaries for your platform from [Releases](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases):

```bash
# Linux x64
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/zion-2.8.5-linux-x86_64.tar.gz
tar -xzf zion-2.8.5-linux-x86_64.tar.gz
cd zion-2.8.5-linux-x86_64/bin
./zion-node

# macOS (Intel)
# Download from releases page, extract, and run

# Windows
# Download ZIP from releases page, extract, and run zion-node.exe
```

### Option 2: Docker (Easiest) 🔒 SECURE BINARY-ONLY IMAGES

**✅ Security:** These images contain ONLY compiled binaries, NO source code. Your testnet coins are protected.

```bash
# Pull and run node (blockchain + RPC server)
docker pull yose144/zion-node:2.8.5-secure
docker run -d \
  --name zion-node \
  -p 8545:8545 \
  -p 8333:8333 \
  -p 8080:8080 \
  -v zion-data:/home/zion/.zion/data \
  yose144/zion-node:2.8.5-secure

# Pull and run mining pool (Stratum server)
docker pull yose144/zion-pool:2.8.5-secure
docker run -d \
  --name zion-pool \
  -p 3333:3333 \
  -p 8181:8181 \
  -e POOL_RPC_HOST=zion-node \
  -e POOL_RPC_PORT=8545 \
  --link zion-node \
  yose144/zion-pool:2.8.5-secure

# Check node status
curl http://localhost:8545/

# Check pool stats
curl http://localhost:8181/api/stats

# Mine with XMRig (CPU mining)
xmrig -o localhost:3333 -u YOUR_ZION_ADDRESS -p x --algo rx/0
```

**Docker Compose (Full Stack):**
```bash
wget https://raw.githubusercontent.com/Zion-TerraNova/Zion-TestNet2.8.5/main/docker-compose.yml
docker-compose up -d
```

**🔐 Docker Image Security Verification:**

Our images are binary-only for maximum security. Verify integrity:

```bash
# Verify SHA256 digests (Docker Hub)
docker images --digests | grep yose144

# Expected output:
# yose144/zion-node   2.8.5-secure   sha256:068245ccc9bdb...   141MB
# yose144/zion-pool   2.8.5-secure   sha256:9956e23c4df2...   134MB

# Test for source code leakage (should return empty)
docker run --rm yose144/zion-node:2.8.5-secure find / -name "*.py" 2>/dev/null | grep -v "^/usr/share"

# Verify no /app directory (should fail)
docker run --rm yose144/zion-node:2.8.5-secure ls /app 2>&1 | grep "No such file"
```

**📦 Docker Hub Links:**
- Node Image: https://hub.docker.com/r/yose144/zion-node
- Pool Image: https://hub.docker.com/r/yose144/zion-pool

**Image Details:**
- Base: Ubuntu 24.04 LTS
- Size: Node 141MB, Pool 134MB (98% smaller than development images)
- Architecture: Binary-only, no source code included
- User: Non-root (UID 10001)

### Option 3: SDK Integration

#### Python

```bash
pip install zion-sdk
```

```python
from zion_sdk import ZionClient

client = ZionClient(host="node.zionterranova.com")
info = client.get_info()
print(f"Block height: {info['height']}")
```

#### JavaScript/TypeScript

```bash
npm install @zion/sdk
```

```typescript
import { ZionClient } from '@zion/sdk';

const client = new ZionClient({ host: 'node.zionterranova.com' });
const info = await client.getInfo();
console.log(`Block height: ${info.height}`);
```

## ⛏️ Mining Guide

### CPU Mining (RandomX)

```bash
# XMRig (recommended)
./xmrig -o pool.zionterranova.com:3333 \
        -u YOUR_ZION_WALLET \
        -p x --coin monero
```

### GPU Mining (Cosmic Harmony)

```bash
# SRBMiner (multi-algo support)
./srbminer-multi --algorithm cosmic_harmony \
                 --pool pool.zionterranova.com:3334 \
                 --wallet YOUR_ZION_WALLET
```

### Using ZION Miner Binary

```bash
./zion-miner \
  --pool pool.zionterranova.com:3333 \
  --wallet YOUR_ZION_WALLET \
  --threads 4
```

📖 **Full Mining Guide:** [docs/MINING_GUIDE.md](docs/MINING_GUIDE.md)

## 📚 Documentation

- Quick start: [docs/QUICK_START.md](docs/QUICK_START.md)
- Mining: [docs/MINING_GUIDE.md](docs/MINING_GUIDE.md)
- RPC API: [docs/RPC_API.md](docs/RPC_API.md)
- Docker: [docs/DOCKER_GUIDE.md](docs/DOCKER_GUIDE.md)
- SDK Python: [docs/SDK_PYTHON.md](docs/SDK_PYTHON.md)
- SDK JavaScript: [docs/SDK_JAVASCRIPT.md](docs/SDK_JAVASCRIPT.md)
- FAQ: [docs/FAQ.md](docs/FAQ.md) · Troubleshooting: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- Security policy: [docs/SECURITY.md](docs/SECURITY.md)
- Changelog: [docs/CHANGELOG.md](docs/CHANGELOG.md)

2.8.5 specifické dokumenty najdete v `docs/2.8.5/`.

## 🔧 Building from Source

**⚠️ Note:** Source code is NOT included in this repository for security (protects 15.78B ZION premine addresses). Binaries are pre-built from private core repository.

If you want to inspect implementation details:
1. Review our [Documentation](docs/)
2. Use our [SDKs](sdk/) to interact with the blockchain
3. Contact us for security audit collaboration

## 🌐 Public Infrastructure

### Testn et Nodes

- **Primary:** `node.zionterranova.com:8332` (RPC)
- **Explorer:** https://explorer.zionterranova.com
- **Seed Nodes:** Configured automatically in binaries

### Mining Pools

- **Primary:** `pool.zionterranova.com:3333` (RandomX, Cosmic Harmony)
- **Secondary:** `pool.zionterranova.com:3334` (Yescrypt)
- **Pool Stats:** http://pool.zionterranova.com:8080/stats

### Sacred Library

- **RPC Endpoint:** http://api.zionterranova.com/sacred_library
- **IPFS Gateway:** https://ipfs.zionterranova.com

## 🎮 ZION OASIS - Golden Egg Hunt

**Largest treasure hunt in crypto history:**

- 💰 **Prize:** 1,000,000,000 ZION (~$10 billion USD at projected $10/ZION)
- 📜 **Clues:** 108 clues (sacred number in Hinduism)
- 🔑 **Keys:** 3 Master Keys (Ramayana, Mahabharata, Unity)
- ⏱️ **Duration:** 2-4 years real-time puzzle solving
- 🎯 **Launch:** Q2 2028 (AAA MMORPG on Unreal Engine 5)

**Ultimate Choice:**
- **KEEP:** Take 1B ZION (~$10B), become richest crypto player
- **DONATE:** Give to Humanita Fund, receive 10% OASIS revenue forever + eternal glory

📖 **Full Details:** [docs/ZION_OASIS_INTEGRATION.md](docs/ZION_OASIS_INTEGRATION.md)

## 🗓️ Roadmap

- **Q4 2025** - Testnet 2.8.5 Launch ✅ YOU ARE HERE
- **Q1-Q2 2026** - Multi-chain bridges (Solana, Stellar, Cardano, Tron)
- **Q3-Q4 2026** - Infrastructure expansion + OASIS development begins
- **Q1 2027** - **MAINNET v3.0 LAUNCH** 🎉
- **Q2 2028** - ZION OASIS AAA MMORPG release + Golden Egg hunt starts
- **2029-2030** - VR expansion + 144,000 Grid activation

## 🔐 Security

This repository contains **ONLY**:
- ✅ Pre-compiled binaries (PyInstaller)
- ✅ Docker images
- ✅ SDK libraries
- ✅ Documentation
- ✅ Configuration examples

This repository does **NOT** contain:
- ❌ Python source code (.py files)
- ❌ Private keys or wallet files
- ❌ Premine address database
- ❌ Development tools

**Why?** The core repository (private) contains 15.78B ZION premine addresses that must remain secure until mainnet launch.

### Verification

```bash
# Verify SHA256 checksums
cd bin/
sha256sum -c SHA256SUMS.txt

# Check for source code leaks (should return nothing)
unzip -l zion-node | grep "\.py$"
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- 🐛 Report bugs via [Issues](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues)
- 📖 Improve documentation
- 🌐 Translate docs to other languages
- 🧪 Test on different platforms
- 💡 Suggest features via [Discussions](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/discussions)

**Code of Conduct:** [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## 📞 Support & Community

- **Website:** https://www.zionterranova.com
- **Documentation:** https://docs.zionterranova.com
- **Explorer:** https://explorer.zionterranova.com
- **Email:** admin@zionterranova.com
- **GitHub Issues:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues
- **Discord:** Coming soon
- **Telegram:** Coming soon

## ⚠️ Disclaimer

**TESTNET NOTICE:**
- v2.8.5 is a **PUBLIC TESTNET** for testing and development
- Testnet coins have **NO MONETARY VALUE**
- Testnet blockchain **WILL BE RESET** before mainnet launch
- Use tesnet for **TESTING ONLY**, not production
- **Mainnet v3.0** launches Q1 2027 with real economic value

**Legal:**
- ZION is experimental software provided "as is"
- No guarantees of mainnet launch or token value
- Cryptocurrency regulations vary by jurisdiction
- Consult legal/financial advisors before participating
- Not financial advice

## 📜 License

- **Binaries & Docker Images:** Proprietary (distributed under ZION Public License)
- **SDK Libraries:** MIT License
- **Documentation:** Creative Commons BY-NC-SA 4.0

See [LICENSE](LICENSE) for full details.

---

**Version:** 2.8.5 "Milky Way"  
**Release Date:** November 3, 2025  
**Mainnet Launch:** Q1 2027 (planned)  

**JAI RAM SITA HANUMAN - ON THE STAR!** ⭐

> *"The treasure is not hidden from you. YOU are hidden from the treasure. Evolve your consciousness and it will appear."*
