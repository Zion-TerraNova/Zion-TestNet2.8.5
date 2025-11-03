# 🚀 ZION TestNet v2.8.5 "Milky Way" - Binary Release

**Release Date:** December 3, 2024  
**Release Type:** Security-Hardened Binary Distribution  
**Platforms:** 
- **Linux x86_64** (native binaries)
- **Windows / macOS** (Docker - recommended for all platforms)

## 🔐 Security-First Release

This release introduces **binary-only distribution** with NO source code exposure, protecting the testnet's 15.78B ZION premine allocation.

### 🛡️ Security Improvements

- **Binary-Only Docker Images:** 98% size reduction (8.76GB → 141MB)
- **Source Code Protection:** Standalone ELF binaries with embedded Python interpreter
- **Premine Protection:** Mining operator addresses secured (8.25B ZION)
- **Attack Surface Reduction:** Minimal Ubuntu 24.04 base, non-root execution

### 📦 What's Included

**Standalone Binaries (64MB):**
- `zion-node` (26MB) - Blockchain node + RPC server
- `zion-pool` (23MB) - Stratum mining pool server  
- `zion-cli` (17MB) - Command-line interface

**Docker Images:**
- `yose144/zion-node:2.8.5-secure` (141MB)
- `yose144/zion-pool:2.8.5-secure` (134MB)

### ✨ Key Features

**Blockchain:**
- Total Supply: 144,000,000,000 ZION
- Block Time: 2 minutes
- Mining Algorithms: RandomX (CPU), Cosmic Harmony (GPU)
- Consensus: Proof of Work + Cosmic Harmony entropy

**Mining Pools:**
- Stratum v1 protocol (port 3333)
- Real-time statistics API (port 8181)
- Automatic difficulty adjustment
- PPLNS reward distribution

**Developer APIs:**
- JSON-RPC 2.0 (port 8545)
- WebSocket streaming (port 8080)
- REST API endpoints

## 📥 Installation

### Option 1: Download Binaries

```bash
# Download release
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/zion-2.8.5-linux-x86_64.tar.gz

# Verify integrity
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/SHA256SUMS.txt
sha256sum -c SHA256SUMS.txt

# Extract and run
tar -xzf zion-2.8.5-linux-x86_64.tar.gz
cd zion-2.8.5-linux-x86_64
./zion-node --testnet
```

### Option 2: Docker (Recommended)

**✅ Works on ALL platforms: Linux, Windows, macOS**

```bash
# Pull and run node
docker pull yose144/zion-node:2.8.5-secure
docker run -d \
  --name zion-node \
  -p 8545:8545 -p 8333:8333 -p 8080:8080 \
  -v zion-data:/home/zion/.zion/data \
  yose144/zion-node:2.8.5-secure

# Pull and run pool
docker pull yose144/zion-pool:2.8.5-secure
docker run -d \
  --name zion-pool \
  -p 3333:3333 -p 8181:8181 \
  -e POOL_RPC_HOST=zion-node \
  -e POOL_RPC_PORT=8545 \
  --link zion-node \
  yose144/zion-pool:2.8.5-secure
```

**Windows (PowerShell) / macOS (Terminal):**
Same commands work! Just install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

**Docker Hub:** https://hub.docker.com/u/yose144

### Option 3: Full Stack (docker-compose)

```bash
wget https://raw.githubusercontent.com/Zion-TerraNova/Zion-TestNet2.8.5/main/docker-compose.yml
docker-compose up -d
```

## 🔍 Verification

### Binary Integrity

```bash
# SHA256 checksums (included in release)
7a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d  zion-node
8b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8  zion-pool
9c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9  zion-cli
```

### Docker Image Digests

```bash
# Verify with Docker
docker images --digests | grep yose144

# Expected:
yose144/zion-node  2.8.5-secure  sha256:068245ccc9bdb...  141MB
yose144/zion-pool  2.8.5-secure  sha256:9956e23c4df2...  134MB
```

### Security Test (No Source Code)

```bash
# Test for Python source files (should return empty)
docker run --rm yose144/zion-node:2.8.5-secure \
  find / -name "*.py" 2>/dev/null | grep -v "^/usr/share"

# Verify /app doesn't exist (should fail)
docker run --rm yose144/zion-node:2.8.5-secure ls /app
# Expected: "ls: cannot access '/app': No such file or directory"
```

## ⛏️ Mining Quick Start

### CPU Mining (RandomX)

```bash
# Install XMRig
wget https://github.com/xmrig/xmrig/releases/download/v6.21.0/xmrig-6.21.0-linux-x64.tar.gz
tar -xzf xmrig-6.21.0-linux-x64.tar.gz
cd xmrig-6.21.0

# Mine to pool
./xmrig -o localhost:3333 \
        -u YOUR_ZION_ADDRESS \
        -p x --algo rx/0
```

### GPU Mining (Cosmic Harmony)

```bash
# Coming soon - GPU miner binaries
# Algorithm: Cosmic Harmony (quantum-inspired mining)
```

## 📊 Tokenomics

**Total Supply:** 144,000,000,000 ZION

**Premine Allocation (15.78B - 10.96%):**
- Mining Operators: 8,250,000,000 (52.3%)
- DAO Winners: 1,750,000,000 (11.1%)
- ZION OASIS: 1,440,000,000 (9.1%)
- Infrastructure: 4,342,857,143 (27.5%)

**Mining Rewards:**
- Block Reward: 50 ZION (initial)
- Halving: Every 2,102,400 blocks (~8 years)
- Total Minable: 128.22B ZION

## 🛠️ System Requirements

**Docker (Recommended - All Platforms):**
- OS: Windows 10/11, macOS 10.15+, or Linux
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- RAM: 4GB minimum, 8GB recommended
- Disk: 20GB free space

**Linux Native Binaries:**
- OS: Ubuntu 20.04+ / Debian 11+ / RHEL 8+
- CPU: 2 cores minimum, 4+ recommended
- RAM: 4GB minimum, 8GB+ recommended
- Disk: 20GB SSD, 100GB NVMe recommended
- Network: 10 Mbps minimum, 100 Mbps+ recommended

**Note:** Native binaries for Windows/macOS planned for v2.8.6. Use Docker for now.

## 📚 Documentation

- **README:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5
- **Docker Hub:** https://hub.docker.com/u/yose144
- **Mining Guide:** See README.md § Mining Guide
- **API Docs:** See README.md § Developer APIs

## 🔧 Build from Source (Advanced)

**⚠️ Warning:** Building from source requires access to the private repository with premine addresses.

For security reasons, we recommend using the pre-built binaries or Docker images.

## 🐛 Known Issues

None reported for v2.8.5.

## 📝 Changelog

**v2.8.5 (2024-12-03):**
- 🔐 NEW: Binary-only distribution (PyInstaller compilation)
- 🔐 NEW: Secure Docker images (141MB, Ubuntu 24.04)
- 🔐 NEW: Source code protection (no .py files in containers)
- ⚡ IMPROVED: 98% size reduction vs development images
- ⚡ IMPROVED: Non-root execution (UID 10001)
- 📦 CHANGED: Docker Hub namespace (zionterranova → yose144)
- 📦 CHANGED: RPC port (8332 → 8545)
- 🐛 FIXED: GLIBC compatibility (Debian → Ubuntu base)
- 🐛 FIXED: UID conflicts in Docker containers

**v2.8.1 (2024-10-23):**
- Initial testnet release
- RandomX CPU mining support
- Cosmic Harmony GPU mining proof-of-concept

## 🤝 Support

- **Issues:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues
- **Discussions:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/discussions

## 📜 License

Proprietary - TestNet Use Only

This software is provided for testing purposes on the ZION TestNet. Not for production mainnet use.

---

**Built with ❤️ by ZION TerraNova**

*For the cosmos, by the cosmos.* 🌌
