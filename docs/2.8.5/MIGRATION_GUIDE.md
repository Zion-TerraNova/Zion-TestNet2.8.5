# ZION Migration Guide: 2.8.4 → 2.8.5 "Milky Way"

**Version:** 2.8.5  
**Codename:** Milky Way  
**Release Date:** November 15, 2025  
**Migration Type:** Major Update (Binary-Only Distribution)

---

## 📋 Overview

ZION 2.8.5 "Milky Way" is the **first public release** with a fundamentally different distribution model. This guide helps you migrate from 2.8.4 (source-based) to 2.8.5 (binary-only).

### Key Changes

| Aspect | 2.8.4 "Cosmic Harmony" | 2.8.5 "Milky Way" |
|--------|------------------------|-------------------|
| **Distribution** | Python source code | Binary-only (PyInstaller) |
| **Repository** | Private only | Dual-repo (private core + public binaries) |
| **RandomX Mining** | Partially working | ✅ Fully functional (XMRig compatible) |
| **Hashing Blob** | Custom format | 76-byte Monero-compatible |
| **Public Pool** | Not available | ✅ pool.zionterranova.com:3333 |
| **SDK** | Not available | ✅ Python + JavaScript SDKs |
| **Docker** | Development only | Production-ready on Docker Hub |

---

## 🚨 Breaking Changes

### 1. No More Python Source Access

**Before (2.8.4):**
```bash
# Source code was previously available (now PRIVATE)
# Installation from source no longer supported for public users
python new_zion_blockchain.py
```

**After (2.8.5):**
```bash
# Binary download
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/zion-node-2.8.5-linux-x64
chmod +x zion-node-2.8.5-linux-x64
./zion-node-2.8.5-linux-x64
```

**Impact:** Source code modifications are no longer possible for public users. Use SDK for integrations instead.

### 2. Mining Protocol Change

**Before (2.8.4):**
- Custom hashing blob format
- XMRig partially compatible
- Manual target calculation needed

**After (2.8.5):**
- ✅ Standard 76-byte Monero-compatible blob
- ✅ 8-byte little-endian target
- ✅ Full XMRig compatibility out-of-the-box

**Migration:** Update your mining software configuration to use standard XMRig commands (see Mining Migration below).

### 3. RPC Endpoint Changes

**Before (2.8.4):**
```bash
curl http://localhost:8545/api/getblocktemplate
# Returns custom format
```

**After (2.8.5):**
```bash
curl http://localhost:18081/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"getblocktemplate"
}'
# Returns Monero-compatible format with hashing_blob
```

**Impact:** RPC clients need to update to new JSON-RPC 2.0 format for mining templates.

### 4. Docker Image Location

**Before (2.8.4):**
```bash
docker build -t zion-node:2.8.4 .
docker run zion-node:2.8.4
```

**After (2.8.5):**
```bash
# Pull from Docker Hub
docker pull zionterranova/zion-node:2.8.5
docker run -d -p 8545:8545 zionterranova/zion-node:2.8.5
```

**Impact:** Use official Docker Hub images instead of building locally.

---

## 📦 Migration Paths

### Path A: End Users (Miners/Wallet Users)

#### Step 1: Backup Existing Data
```bash
# Backup wallet
cp ~/.zion/wallet.dat ~/zion-wallet-backup-$(date +%Y%m%d).dat

# Backup blockchain data (optional)
cp -r ~/.zion/blocks ~/zion-blocks-backup/
```

#### Step 2: Uninstall 2.8.4
```bash
# Stop running node
pkill -f "python.*zion"

# Remove Python environment
rm -rf .venv/

# Keep blockchain data if syncing from scratch would take too long
# Otherwise: rm -rf ~/.zion/blocks
```

#### Step 3: Install 2.8.5 Binary
```bash
# Download for your platform
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/zion-node-2.8.5-linux-x64

# Make executable
chmod +x zion-node-2.8.5-linux-x64

# Run node
./zion-node-2.8.5-linux-x64
```

#### Step 4: Restore Wallet
```bash
# Copy wallet back
cp ~/zion-wallet-backup-*.dat ~/.zion/wallet.dat

# Verify balance
./zion-cli-2.8.5-linux-x64 wallet --balance
```

#### Step 5: Update Mining Configuration

**Old XMRig Config (2.8.4):**
```json
{
  "pools": [{
    "algo": "rx/0",
    "url": "localhost:18081",
    "user": "YOUR_WALLET",
    "pass": "x"
  }]
}
```

**New XMRig Config (2.8.5):**
```json
{
  "pools": [{
    "algo": "rx/0",
    "coin": "monero",
    "url": "pool.zionterranova.com:3333",
    "user": "YOUR_WALLET",
    "pass": "x"
  }]
}
```

**Or use public pool directly:**
```bash
xmrig -o pool.zionterranova.com:3333 \
      -u YOUR_ZION_WALLET_ADDRESS \
      -p x --coin monero
```

---

### Path B: Developers

#### Step 1: Understand New Architecture

**Before:** Direct Python imports
```python
from new_zion_blockchain import ZionBlockchain
blockchain = ZionBlockchain()
```

**After:** Use SDK
```python
from zion_sdk import ZionClient

client = ZionClient("http://localhost:8545")
info = client.get_blockchain_info()
print(f"Current height: {info['blocks']}")
```

#### Step 2: Install SDK

**Python:**
```bash
pip install zion-sdk
```

**JavaScript:**
```bash
npm install @zion/sdk
```

#### Step 3: Migrate Code

**Old Direct RPC Calls:**
```python
import requests

response = requests.get("http://localhost:8545/api/getblockchaininfo")
data = response.json()
```

**New SDK Usage:**
```python
from zion_sdk import ZionClient

client = ZionClient("http://localhost:8545")
data = client.get_blockchain_info()
```

**JavaScript Example:**
```javascript
const { ZionClient } = require('@zion/sdk');

const client = new ZionClient('http://localhost:8545');
const info = await client.getBlockchainInfo();
console.log(`Height: ${info.blocks}`);
```

#### Step 4: Update Docker Compose

**Old (2.8.4):**
```yaml
version: '3.8'
services:
  zion-node:
    build: .
    ports:
      - "8545:8545"
```

**New (2.8.5):**
```yaml
version: '3.8'
services:
  zion-node:
    image: zionterranova/zion-node:2.8.5
    ports:
      - "8545:8545"
      - "8333:8333"
    volumes:
      - zion-data:/root/.zion
    environment:
      - ZION_DEFAULT_ALGO=randomx
      
volumes:
  zion-data:
```

---

### Path C: Pool Operators

#### Step 1: Backup Pool Database
```bash
# Backup shares and payouts
cp ~/.zion-pool/pool.db ~/pool-backup-$(date +%Y%m%d).db

# Backup configuration
cp ~/.zion-pool/pool-config.json ~/pool-config-backup.json
```

#### Step 2: Deploy New Pool

**Docker Deployment (Recommended):**
```bash
docker pull zionterranova/zion-pool:2.8.5
docker run -d \
  --name zion-pool \
  -p 3333:3333 \
  -v zion-pool-data:/data \
  -e POOL_FEE_PERCENT=1.0 \
  -e PAYOUT_THRESHOLD=10.0 \
  zionterranova/zion-pool:2.8.5
```

**Binary Deployment:**
```bash
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/zion-pool-2.8.5-linux-x64
chmod +x zion-pool-2.8.5-linux-x64
./zion-pool-2.8.5-linux-x64 --config pool-config.json
```

#### Step 3: Update Stratum Configuration

**New pool-config.json:**
```json
{
  "pool_name": "Your ZION Pool",
  "pool_address": "POOL_WALLET_ADDRESS",
  "pool_fee_percent": 1.0,
  "payout_threshold": 10.0,
  "stratum": {
    "enabled": true,
    "port": 3333,
    "difficulty": 5000,
    "max_connections": 1000
  },
  "rpc": {
    "host": "localhost",
    "port": 18081,
    "monero_compatibility": true
  }
}
```

#### Step 4: Announce Pool Update

**Notify miners:**
- New Stratum endpoint (if changed)
- XMRig compatibility improvements
- Updated payment schedule (if changed)

---

## 🔧 Configuration Changes

### Environment Variables

**New in 2.8.5:**
```bash
# Node configuration
export ZION_DATA_DIR=~/.zion
export ZION_DEFAULT_ALGO=randomx
export ZION_RPC_PORT=8545
export ZION_P2P_PORT=8333

# Mining pool
export POOL_FEE_PERCENT=1.0
export PAYOUT_THRESHOLD=10.0

# API server
export ZION_API_HOST=0.0.0.0
export ZION_API_PORT=8545
```

### Config File Location

**Before (2.8.4):**
- Configuration: `.env` file or hardcoded
- Data: `./data/`

**After (2.8.5):**
- Configuration: `~/.zion/zion.conf`
- Data: `~/.zion/blocks/`, `~/.zion/wallets/`

**Example ~/.zion/zion.conf:**
```ini
[node]
rpc_port=8545
p2p_port=8333
default_algorithm=randomx

[network]
testnet=1
network_id=milky-way-2.8.5

[mining]
enable_mining=false
mining_address=

[api]
enable_api=true
api_host=127.0.0.1
api_port=8545
```

---

## 🧪 Testing Your Migration

### Test 1: Node Connectivity
```bash
# Check node is running
curl http://localhost:8545/api/status

# Expected output:
# {"status":"running","version":"2.8.5-Milky-Way",...}
```

### Test 2: Wallet Access
```bash
# List wallets
./zion-cli-2.8.5 wallet --list

# Check balance
./zion-cli-2.8.5 wallet --balance YOUR_ADDRESS
```

### Test 3: Mining Compatibility
```bash
# Test XMRig connection
xmrig --dry-run \
      -o pool.zionterranova.com:3333 \
      -u YOUR_WALLET \
      -p x --coin monero

# Should show: "Connection established"
```

### Test 4: RPC Endpoints
```bash
# Test JSON-RPC
curl -X POST http://localhost:18081/json_rpc \
  -H 'Content-Type: application/json' \
  -d '{
    "jsonrpc":"2.0",
    "id":"0",
    "method":"get_info"
  }'

# Test REST API
curl http://localhost:8545/api/getblockchaininfo
```

---

## ❓ Troubleshooting

### Issue 1: "Binary won't run - Permission denied"

**Solution:**
```bash
chmod +x zion-node-2.8.5-linux-x64
```

### Issue 2: "XMRig can't connect to pool"

**Check:**
1. Pool address correct: `pool.zionterranova.com:3333`
2. Wallet address valid (starts with `ZION_`)
3. Firewall not blocking port 3333
4. Use `--coin monero` flag

**Test connectivity:**
```bash
telnet pool.zionterranova.com 3333
```

### Issue 3: "Old wallet not loading"

**Solution:**
Wallet format unchanged, but verify:
```bash
# Check wallet file exists
ls -la ~/.zion/wallet.dat

# Verify permissions
chmod 600 ~/.zion/wallet.dat

# Restore from backup if needed
cp ~/zion-wallet-backup-*.dat ~/.zion/wallet.dat
```

### Issue 4: "Can't find Python modules"

**This is expected!** 2.8.5 is binary-only. Use SDK instead:
```bash
pip install zion-sdk
```

### Issue 5: "Docker image not found"

**Solution:**
```bash
# Pull from correct repository
docker pull zionterranova/zion-node:2.8.5

# Verify image
docker images | grep zion
```

---

## 📚 Additional Resources

### Documentation
- **Release Notes:** [RELEASE_NOTES_v2.8.5.md](./RELEASE_NOTES_v2.8.5.md)
- **Public Repo Structure:** [PUBLIC_REPO_STRUCTURE.md](./PUBLIC_REPO_STRUCTURE.md)
- **Mining Guide:** [MINING_GUIDE.md](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/blob/main/docs/MINING_GUIDE.md)
- **SDK Documentation:** [SDK_PYTHON.md](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/blob/main/docs/SDK_PYTHON.md)

### Support
- **GitHub Issues:** [github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues)
- **Email:** admin@zionterranova.com
- **Discord:** Coming Soon

---

## 🔐 Security Considerations

### Why Binary-Only?

**Reasons:**
1. **Premine Protection:** Distribution logic hidden from public
2. **Genesis Security:** Block #0 creation protected
3. **Network Integrity:** Prevents unauthorized forks
4. **Professional Distribution:** Standard practice for production blockchains

### Verifying Binary Integrity

**Check SHA256 checksums:**
```bash
# Download checksum file
wget https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/releases/download/v2.8.5/SHA256SUMS

# Verify binary
sha256sum -c SHA256SUMS --ignore-missing
```

**Expected output:**
```
zion-node-2.8.5-linux-x64: OK
```

### GPG Signature Verification

```bash
# Import public key
gpg --keyserver keys.openpgp.org --recv-keys ZION_RELEASE_KEY

# Verify signature
gpg --verify zion-node-2.8.5-linux-x64.asc zion-node-2.8.5-linux-x64
```

---

## 📅 Migration Timeline

### Recommended Schedule

**Week 1 (Nov 1-7, 2025):**
- Read documentation
- Test binaries in development environment
- Update tooling and scripts

**Week 2 (Nov 8-14, 2025):**
- Backup all data
- Deploy to staging environment
- Test mining and RPC integrations

**Week 3 (Nov 15+, 2025):**
- Public release
- Production deployment
- Monitor for issues

### Deprecation Schedule

| Version | Status | Support Until |
|---------|--------|---------------|
| 2.8.4 | Deprecated | December 15, 2025 |
| 2.8.5 | Current | Active development |
| 2.9.x | Planned | Q1 2026 |

---

## ✅ Migration Checklist

### Pre-Migration
- [ ] Read this guide completely
- [ ] Backup wallet.dat
- [ ] Backup pool database (if pool operator)
- [ ] Note current blockchain height
- [ ] Document custom configurations
- [ ] Test binaries in dev environment

### During Migration
- [ ] Stop all 2.8.4 services
- [ ] Download 2.8.5 binaries
- [ ] Verify checksums
- [ ] Deploy new binaries/Docker images
- [ ] Restore wallet
- [ ] Update mining configurations
- [ ] Update RPC integrations

### Post-Migration
- [ ] Verify node connectivity
- [ ] Test wallet access
- [ ] Confirm mining working
- [ ] Monitor logs for errors
- [ ] Update documentation
- [ ] Notify users of changes

---

## 🎯 Success Criteria

Your migration is successful when:

✅ Node running and syncing blocks  
✅ Wallet accessible with correct balance  
✅ XMRig connects and submits shares  
✅ RPC API responding correctly  
✅ No errors in logs  

---

**Need Help?**

If you encounter issues during migration:
1. Check [Troubleshooting](#-troubleshooting) section above
2. Search [GitHub Issues](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues)
3. Create new issue with details
4. Email support: admin@zionterranova.com

---

*ZION 2.8.5 "Milky Way" Migration Guide*  
*Last Updated: November 3, 2025*  
*First Public Release: November 15, 2025*
