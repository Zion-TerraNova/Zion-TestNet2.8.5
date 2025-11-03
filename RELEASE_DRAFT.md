# 🚀 GitHub Release v2.8.5 – Checklist a instrukce

## Pre-Release Checklist

- [x] Všechny docs přidány (QUICK_START, MINING_GUIDE, atd.)
- [x] SDK (Python/JS) připraveny
- [x] Docker compose + README
- [x] CI workflow funkční
- [x] LICENSE, CODE_OF_CONDUCT, CONTRIBUTING přidány
- [ ] Binárky vybuilděny (node, miner, cli) – Linux/macOS/Windows
- [ ] Docker images nahráno na Docker Hub (zionterranova/zion-node:2.8.5)
- [ ] SHA256SUMS + GPG podpis připraveny

## Release Assets – Co nahrát

### Binárky (z private core build)
```
zion-node-2.8.5-linux-x86_64.tar.gz
zion-node-2.8.5-macos-arm64.tar.gz
zion-node-2.8.5-windows-x64.zip
zion-miner-2.8.5-linux-x86_64.tar.gz
zion-cli-2.8.5-linux-x86_64.tar.gz
```

### Checksums
```
SHA256SUMS.txt
SHA256SUMS.txt.asc (GPG podpis)
```

### SDK (volitelně, nebo publikovat přes PyPI/NPM)
```
zion-sdk-python-2.8.5.tar.gz
zion-sdk-js-2.8.5.tar.gz
```

## Release Notes (draft text)

```markdown
# ZION v2.8.5 "Milky Way" – První veřejný testnet 🌌

**Datum:** 3. listopadu 2025  
**Typ:** Public Testnet (PRVNÍ VEŘEJNÁ RELEASE)

## 🎯 Co je nového

- ✅ První veřejný testnet – otevřeno pro celý svět
- ✅ XMRig mining s plnou RandomX kompatibilitou
- ✅ Docker images na Docker Hub (node/pool/miner)
- ✅ Python a JavaScript SDK pro vývojáře
- ✅ Kompletní dokumentace (CZ/EN)
- ✅ Dual-repository bezpečnostní model

## ⛏️ Mining

```bash
# CPU (XMRig)
xmrig -o pool.zionterranova.com:3333 \
      -u ZION_wallet_address \
      -p x --coin monero
```

## 🐳 Docker

```bash
docker pull zionterranova/zion-node:2.8.5
docker run -d -p 8545:8545 -p 8333:8333 zionterranova/zion-node:2.8.5
```

## 📚 Dokumentace

- [Quick Start](docs/QUICK_START.md)
- [Mining Guide](docs/MINING_GUIDE.md)
- [RPC API](docs/RPC_API.md)
- [Docker Guide](docs/DOCKER_GUIDE.md)

## ⚠️ TESTNET UPOZORNĚNÍ

- Testnet mince **NEMAJÍ HODNOTU**
- Pouze pro testování
- Mainnet v3.0 plánován Q1 2027

## 📊 Tokenomics (Mainnet)

- Total Supply: 144B ZION
- Premine: 15.78B (11%)
- Mining: 128.22B (89%)

## 🔐 Bezpečnost

Binárky ověřte pomocí SHA256:
```bash
sha256sum -c SHA256SUMS.txt
```

---

**JAI RAM SITA HANUMAN - ON THE STAR!** ⭐
```

## Po Release

1. Vytvořit tag:
```bash
git tag -a v2.8.5 -m "Public Testnet v2.8.5 Milky Way"
git push public v2.8.5
```

2. V GitHub UI:
   - Draft Release → Publish
   - Nahrát binárky + checksums
   - Zkopírovat Release Notes

3. Oznámení:
   - Update README odkaz na Latest Release
   - Volitelně: blog post, Twitter, Discord

## Build Commands (pro core team – private repo)

```bash
# Linux x64
pyinstaller --onefile --name zion-node src/core/new_zion_blockchain.py

# Windows
pyinstaller --onefile --name zion-node.exe src/core/new_zion_blockchain.py

# macOS (Intel + ARM universal)
pyinstaller --onefile --name zion-node --target-arch universal2 src/core/new_zion_blockchain.py
```

## Docker Push

```bash
docker build -t zionterranova/zion-node:2.8.5 -f docker/Dockerfile.node .
docker push zionterranova/zion-node:2.8.5
docker tag zionterranova/zion-node:2.8.5 zionterranova/zion-node:latest
docker push zionterranova/zion-node:latest
```

## SDK Publish (volitelné)

```bash
# PyPI
cd sdk/python
python -m build
twine upload dist/*

# NPM
cd sdk/javascript
npm publish --access public
```
