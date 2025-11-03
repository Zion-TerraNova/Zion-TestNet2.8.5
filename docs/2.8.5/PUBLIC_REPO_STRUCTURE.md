# 🌍 ZION v2.8.5 – Public Repository Structure

**Repository:** `https://github.com/Zion-TerraNova/Zion-TestNet-2.8.5`  
**Type:** PUBLIC (open-source)  
**Security:** NO source code, binaries only  
**Launch:** 15. listopadu 2025

---

## 📁 Directory Structure

```
Zion-TestNet-2.8.5/
├── bin/                                # Compiled binaries
│   ├── linux/
│   │   ├── x64/
│   │   │   ├── zion-node              # Node binary
│   │   │   ├── zion-miner             # Miner binary
│   │   │   └── zion-cli               # CLI tools
│   │   └── arm64/
│   │       └── zion-node              # ARM binary (Raspberry Pi)
│   ├── windows/
│   │   └── x64/
│   │       ├── zion-node.exe
│   │       ├── zion-miner.exe
│   │       └── zion-cli.exe
│   └── macos/
│       ├── x64/
│       │   └── zion-node              # Intel Mac
│       └── arm64/
│           └── zion-node              # Apple Silicon
│
├── docker/                             # Docker deployment
│   ├── Dockerfile.node                # Node container
│   ├── Dockerfile.miner               # Miner container
│   ├── Dockerfile.pool                # Pool container
│   ├── docker-compose.yml             # Full stack
│   ├── docker-compose.node-only.yml   # Node only
│   └── docker-compose.miner-only.yml  # Miner only
│
├── sdk/                                # Developer SDKs
│   ├── python/
│   │   ├── zion_sdk/
│   │   │   ├── __init__.py
│   │   │   ├── client.py              # RPC client
│   │   │   ├── wallet.py              # Wallet operations
│   │   │   ├── miner.py               # Mining client
│   │   │   └── utils.py               # Utilities
│   │   ├── examples/
│   │   │   ├── get_balance.py
│   │   │   ├── send_transaction.py
│   │   │   └── start_mining.py
│   │   ├── tests/
│   │   │   └── test_client.py
│   │   ├── setup.py
│   │   ├── requirements.txt
│   │   └── README.md
│   ├── javascript/
│   │   ├── src/
│   │   │   ├── client.js              # RPC client
│   │   │   ├── wallet.js              # Wallet operations
│   │   │   └── index.js
│   │   ├── examples/
│   │   │   ├── get_balance.js
│   │   │   └── send_transaction.js
│   │   ├── tests/
│   │   │   └── client.test.js
│   │   ├── package.json
│   │   └── README.md
│   └── rust/                           # Coming in 2.9.0
│       └── README.md
│
├── config/                             # Configuration examples
│   ├── node.conf.example              # Node configuration
│   ├── miner.conf.example             # Miner configuration
│   ├── pool.conf.example              # Pool configuration
│   └── README.md
│
├── scripts/                            # Utility scripts
│   ├── install.sh                     # Auto-installer (Linux/macOS)
│   ├── install.ps1                    # Auto-installer (Windows)
│   ├── start_node.sh                  # Start node
│   ├── start_mining.sh                # Start mining
│   ├── create_wallet.sh               # Create new wallet
│   └── check_status.sh                # Health check
│
├── docs/                               # Documentation
│   ├── QUICK_START.md                 # 5-minute guide
│   ├── MINING_GUIDE.md                # Complete mining tutorial
│   ├── RPC_API.md                     # Full API reference
│   ├── DOCKER_GUIDE.md                # Docker deployment
│   ├── SDK_PYTHON.md                  # Python SDK docs
│   ├── SDK_JAVASCRIPT.md              # JavaScript SDK docs
│   ├── ARCHITECTURE.md                # System overview
│   ├── SECURITY.md                    # Security best practices
│   ├── FAQ.md                         # Common questions
│   ├── TROUBLESHOOTING.md             # Problem solving
│   ├── CONTRIBUTING.md                # How to contribute
│   ├── CHANGELOG.md                   # Version history
│   └── RELEASE_NOTES_v2.8.5.md        # This release
│
├── tests/                              # Integration tests
│   ├── test_rpc_connection.py
│   ├── test_mining.py
│   ├── test_wallet.py
│   └── README.md
│
├── tools/                              # Additional utilities
│   ├── block_explorer_cli.py          # CLI block explorer
│   ├── wallet_generator.py            # Offline wallet gen
│   ├── benchmark.py                   # Performance test
│   └── README.md
│
├── .github/                            # GitHub specific
│   ├── workflows/
│   │   ├── ci.yml                     # CI/CD pipeline
│   │   └── release.yml                # Release automation
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── README.md                           # Main documentation
├── LICENSE                             # MIT License
├── SECURITY.md                         # Security policy
├── CODE_OF_CONDUCT.md                 # Community guidelines
└── .gitignore                          # Git ignore rules
```

---

## 📄 Key Files Content

### README.md (Public Repo)

```markdown
# 🌌 ZION Testnet v2.8.5 "Milky Way"

**First Public Release** | **CPU/GPU Mining** | **Dual-Repository Security**

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.8.5-blue.svg)](CHANGELOG.md)
[![Testnet](https://img.shields.io/badge/testnet-LIVE-brightgreen.svg)](https://zionterranova.com)

ZION is a humanitarian blockchain with GPU mining and 10-25% reward redistribution to verified charities.

## ⚡ Quick Start (5 Minutes)

### Option 1: Binary (Fastest)
```bash
# Download binary
wget https://github.com/Zion-TerraNova/Zion-TestNet-2.8.5/releases/download/v2.8.5/zion-node-2.8.5-linux-x64.tar.gz
tar -xzf zion-node-2.8.5-linux-x64.tar.gz
cd zion-node-2.8.5

# Start node
./bin/zion-node --testnet

# Create wallet
./bin/zion-cli wallet create

# Start mining
xmrig -o pool.zionterranova.com:3333 -u YOUR_WALLET -p x --algo=rx/0
```

### Option 2: Docker (Recommended)
```bash
docker pull zionterranova/zion-node:2.8.5
docker run -p 8545:8545 -p 8333:8333 zionterranova/zion-node:2.8.5
```

📖 **Full Guide:** [docs/QUICK_START.md](docs/QUICK_START.md)

---

## 🎯 What's ZION?

- ✅ **RandomX (rx/0)** – CPU-friendly ASIC-resistant mining
- ✅ **Cosmic Harmony** – GPU mining (coming soon)
- ✅ **10-25% Humanitarian** – Mining rewards → charities
- ✅ **Multi-Chain Bridges** – Solana, Stellar, Cardano, Tron (planned 2026)
- ✅ **Fair Launch** – No pre-sale, no ICO

**Testnet tokens have NO value** – for testing only!

---

## 📊 Tokenomics (Mainnet v3.0)

```yaml
Total Supply:     144,000,000,000 ZION (144 billion)
Premine:          15,780,000,000 ZION (~15.78B = 11%)
Mining Supply:    128,220,000,000 ZION (~128.22B = 89%)

Premine Breakdown:
  - Mining Operators: 8.25B (consciousness rewards)
  - DAO Winners: 1.75B (Golden Egg + XP leaderboard)
  - ZION OASIS: 1.44B (AAA game fund)
  - Infrastructure: 4.34B (dev, servers, charity)

Block Time:       150 seconds (~2.5 min)
Block Reward:     Dynamic (halving schedule)
Algorithms:       cosmic_harmony, randomx, yescrypt, autolykos_v2
Mainnet Launch:   Q1 2027 (planned)
```

**NOTE:** Testnet 2.8.5 uses simplified parameters for testing.

---

## ⛏️ Mining

### CPU Mining (XMRig)
```bash
xmrig -o pool.zionterranova.com:3333 \
      -u ZION_wallet_address \
      -p x \
      --algo=rx/0 \
      --donate-level=0
```

### GPU Mining (Coming Soon)
```bash
./bin/zion-miner --pool pool.zionterranova.com:3333 \
                 --wallet ZION_wallet_address \
                 --algo cosmic_harmony
```

📖 **Mining Guide:** [docs/MINING_GUIDE.md](docs/MINING_GUIDE.md)

---

## 🌐 Network Info

- **Website:** https://zionterranova.com
- **RPC API:** https://api.zionterranova.com
- **Block Explorer:** https://explorer.zionterranova.com
- **Mining Pool:** pool.zionterranova.com:3333
- **Pool Stats:** http://pool.zionterranova.com:8181/stats

---

## 🔐 Security Note

**Why binaries instead of source code?**

This is a **dual-repository project**:
- **Core Repo** (private) – Contains genesis logic and premine protection
- **Public Repo** (this one) – Binaries, Docker, SDK, documentation

We use binary distribution to protect:
- 15.78 billion ZION premine addresses (including 1.44B OASIS fund)
- Genesis block creation logic
- Private keys and sensitive data

All binaries are:
- ✅ Verified with SHA256 checksums
- ✅ GPG signed by release team
- ✅ MIT licensed (usage freedom)

📖 **Security Policy:** [SECURITY.md](SECURITY.md)

---

## 🛠️ Development

### Python SDK
```python
from zion_sdk import ZionClient

client = ZionClient("https://api.zionterranova.com")
info = client.get_info()
print(f"Block height: {info['height']}")
```

### JavaScript SDK
```javascript
import { ZionClient } from 'zion-sdk';

const client = new ZionClient('https://api.zionterranova.com');
const balance = await client.getBalance('ZION_wallet_address');
console.log(`Balance: ${balance} ZION`);
```

📖 **SDK Documentation:**
- Python: [docs/SDK_PYTHON.md](docs/SDK_PYTHON.md)
- JavaScript: [docs/SDK_JAVASCRIPT.md](docs/SDK_JAVASCRIPT.md)

---

## 📚 Documentation

- [Quick Start Guide](docs/QUICK_START.md) – Get running in 5 minutes
- [Mining Guide](docs/MINING_GUIDE.md) – Complete mining tutorial
- [RPC API Reference](docs/RPC_API.md) – Full API documentation
- [Docker Guide](docs/DOCKER_GUIDE.md) – Container deployment
- [FAQ](docs/FAQ.md) – Frequently asked questions
- [Troubleshooting](docs/TROUBLESHOOTING.md) – Common issues

---

## 🤝 Contributing

We welcome contributions!

- 🐛 **Bug Reports:** [Open an issue](https://github.com/Zion-TerraNova/Zion-TestNet-2.8.5/issues)
- 💡 **Feature Requests:** [Open an issue](https://github.com/Zion-TerraNova/Zion-TestNet-2.8.5/issues)
- 📖 **Documentation:** Improve our docs via PR
- 🌍 **Translation:** Help translate to other languages

📖 **Contribution Guide:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📞 Support

- 📧 **Email:** admin@zionterranova.com
- 🔐 **Security:** security@zionterranova.com
- 💬 **Discord:** Coming soon
- 🐦 **Twitter:** @zionterranova (coming soon)

---

## 🗺️ Roadmap

- **v2.8.5** (Nov 2025) – Public testnet launch (current)
- **v2.9.0** (Q1 2026) – Mobile wallets, Solana/Stellar bridges, DAO
- **v3.0** (Q1 2027) – Mainnet launch, real value, CEX listings

---

## ⚠️ Disclaimer

**Testnet Notice:**
- Testnet ZION tokens have **NO REAL VALUE**
- Network may be **RESET** without notice during testing
- This is for **TESTING ONLY**

**Mainnet Launch:** Q1 2027 (planned)

---

## 📜 License

MIT License – See [LICENSE](LICENSE)

---

**Built with ❤️ for a better world through blockchain technology.**

**JAI RAM SITA HANUMAN - ON THE STAR!** ⭐
```

---

## 🔨 Build Commands (Core Repo → Public Repo)

### 1. Build Binaries

```bash
# On core repo (private)
cd /path/to/Zion-2.8-Core

# Linux x64
pyinstaller \
    --onefile \
    --strip \
    --name zion-node \
    --hidden-import=seednodes \
    --hidden-import=crypto_utils \
    src/core/new_zion_blockchain.py

# Windows x64
pyinstaller \
    --onefile \
    --strip \
    --noconsole \
    --name zion-node \
    --hidden-import=seednodes \
    --hidden-import=crypto_utils \
    src/core/new_zion_blockchain.py

# macOS Universal
pyinstaller \
    --onefile \
    --strip \
    --name zion-node \
    --target-arch universal2 \
    --hidden-import=seednodes \
    --hidden-import=crypto_utils \
    src/core/new_zion_blockchain.py

# Move to public repo
cp dist/zion-node ../Zion-TestNet-2.8.5/bin/linux/x64/
```

---

### 2. Build Docker Images

```bash
# Node image
docker build -f docker/Dockerfile.node -t zionterranova/zion-node:2.8.5 .
docker tag zionterranova/zion-node:2.8.5 zionterranova/zion-node:latest
docker push zionterranova/zion-node:2.8.5
docker push zionterranova/zion-node:latest

# Miner image
docker build -f docker/Dockerfile.miner -t zionterranova/zion-miner:2.8.5 .
docker push zionterranova/zion-miner:2.8.5

# Pool image
docker build -f docker/Dockerfile.pool -t zionterranova/zion-pool:2.8.5 .
docker push zionterranova/zion-pool:2.8.5
```

---

### 3. Generate Checksums

```bash
cd Zion-TestNet-2.8.5/bin

# SHA256
find . -type f -exec sha256sum {} \; > ../SHA256SUMS.txt

# GPG signature
gpg --detach-sign --armor --output ../SHA256SUMS.txt.asc ../SHA256SUMS.txt
```

---

### 4. Package SDKs

```bash
# Python SDK
cd sdk/python
python setup.py sdist bdist_wheel
# Uploads to PyPI (optional)

# JavaScript SDK
cd sdk/javascript
npm pack
# Uploads to npm (optional)
```

---

### 5. Create GitHub Release

```bash
# Tag version
git tag -a v2.8.5 -m "ZION v2.8.5 'Milky Way' - First public testnet release"
git push origin v2.8.5

# Create release on GitHub
gh release create v2.8.5 \
    --title "ZION v2.8.5 'Milky Way'" \
    --notes-file docs/RELEASE_NOTES_v2.8.5.md \
    bin/linux/x64/zion-node-2.8.5-linux-x64.tar.gz \
    bin/windows/x64/zion-node-2.8.5-windows-x64.zip \
    bin/macos/x64/zion-node-2.8.5-macos-x64.tar.gz \
    SHA256SUMS.txt \
    SHA256SUMS.txt.asc
```

---

## ✅ Pre-Launch Checklist

### Binaries
- [ ] Linux x64 compiled and tested
- [ ] Linux ARM64 compiled and tested
- [ ] Windows x64 compiled and tested
- [ ] macOS Intel compiled and tested
- [ ] macOS ARM64 compiled and tested
- [ ] All binaries stripped and optimized
- [ ] SHA256 checksums generated
- [ ] GPG signatures created

### Docker
- [ ] Node image built and tested
- [ ] Miner image built and tested
- [ ] Pool image built and tested
- [ ] Images pushed to Docker Hub
- [ ] docker-compose.yml tested
- [ ] Healthchecks working

### SDK
- [ ] Python SDK complete and tested
- [ ] JavaScript SDK complete and tested
- [ ] Examples working
- [ ] Published to PyPI/npm (optional)

### Documentation
- [ ] README.md complete
- [ ] QUICK_START.md ready
- [ ] MINING_GUIDE.md ready
- [ ] RPC_API.md complete
- [ ] All docs reviewed and tested
- [ ] RELEASE_NOTES_v2.8.5.md finalized

### Infrastructure
- [ ] pool.zionterranova.com:3333 running 24h+
- [ ] api.zionterranova.com responding
- [ ] explorer.zionterranova.com online
- [ ] SSL certificates valid
- [ ] Monitoring active

### Security
- [ ] No .py files in public repo
- [ ] No premine addresses exposed
- [ ] No private keys in history
- [ ] Binaries reverse-engineering tested
- [ ] Security scan passed

### Legal
- [ ] LICENSE file added
- [ ] CODE_OF_CONDUCT.md added
- [ ] SECURITY.md policy defined
- [ ] Disclaimer in README.md

---

## 🚀 Launch Day (15. listopadu 2025)

### Timeline

**00:00 UTC** – Final checks
- Verify all infrastructure
- Test download links
- Smoke test binaries

**12:00 UTC** – Public announcement
1. Publish GitHub release
2. Announce on zionterranova.com
3. Social media posts (Twitter, Reddit)
4. Email early supporters
5. Discord announcement

**12:00-24:00 UTC** – Monitor
- Watch for bug reports
- Support early adopters
- Track miners joining
- Monitor pool stats

**Next 7 days** – Post-launch
- Daily check-ins
- Community support
- Hotfix releases if needed
- Metrics collection

---

**Document Version:** 1.0  
**Created:** 3. listopadu 2025  
**Status:** Planning  
**Next Update:** After binary compilation
