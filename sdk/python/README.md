# ZION Python SDK

Official Python client library for ZION Blockchain v2.8.5 "Milky Way"

## 🚀 Installation

```bash
pip install zion-sdk
```

## 📖 Quick Start

### Basic Usage

```python
from zion_sdk import ZionClient

# Connect to node
client = ZionClient(host="localhost", port=8332)

# Get blockchain info
info = client.get_info()
print(f"Block height: {info['height']}")
print(f"Difficulty: {info['difficulty']}")

# Check balance
balance = client.get_balance("ZION_ADDRESS_HERE")
print(f"Balance: {balance} ZION")
```

### Wallet Management

```python
from zion_sdk import ZionWallet

# Generate new wallet
wallet = ZionWallet()
print(f"Address: {wallet.address}")
print(f"Private key: {wallet.private_key}")

# Import existing wallet
wallet = ZionWallet(private_key="YOUR_PRIVATE_KEY_HEX")
print(f"Loaded wallet: {wallet.address}")
```

### Sacred Library

```python
from zion_sdk import SacredLibrary

# Initialize Sacred Library client
library = SacredLibrary()

# Get daily wisdom
wisdom = library.daily_wisdom()
print(wisdom['quote'])
print(f"Source: {wisdom['source']}")

# Search sacred texts
results = library.search("consciousness evolution", limit=5)
for result in results:
    print(f"{result['text']}: {result['excerpt']}")

# Read specific text
omnity = library.get_text("omnity_one_love")
print(f"Title: {omnity['title']}")
print(f"Lines: {omnity['metadata']['lines']}")
```

### Transactions

```python
# Create transaction
from zion_sdk import ZionClient, ZionWallet

client = ZionClient()
wallet = ZionWallet(private_key="YOUR_PRIVATE_KEY")

# Send ZION
tx_hash = client.create_transaction(
    from_address=wallet.address,
    to_address="RECIPIENT_ADDRESS",
    amount=100.0,  # 100 ZION
    private_key=wallet.private_key,
    fee=0.001
)
print(f"Transaction sent: {tx_hash}")
```

### Mining & Consciousness

```python
# Get consciousness level
from zion_sdk import ZionClient

client = ZionClient()

# Check your consciousness level (CL 1-9)
cl = client.get_consciousness_level("YOUR_MINING_ADDRESS")
print(f"Consciousness Level: CL {cl}")

# Get detailed mining stats
stats = client.get_mining_stats("YOUR_MINING_ADDRESS")
print(f"Blocks mined: {stats['blocks_found']}")
print(f"Total hashrate: {stats['hashrate']}")
print(f"Reward multiplier: {stats['multiplier']}×")
```

## 📚 API Reference

### ZionClient

Main client for blockchain interaction.

#### Methods

- `get_info()` - Get blockchain info
- `get_block_count()` - Get current block height
- `get_block(block_hash)` - Get block by hash
- `get_block_by_height(height)` - Get block by height
- `get_transaction(tx_hash)` - Get transaction by hash
- `get_balance(address)` - Get wallet balance
- `create_transaction(...)` - Create and sign transaction
- `get_mining_info()` - Get mining statistics
- `get_consciousness_level(address)` - Get CL level (1-9)
- `get_peer_info()` - Get connected peers
- `validate_address(address)` - Validate address format

### ZionWallet

Wallet management and cryptography.

#### Methods

- `generate_private_key()` - Generate new private key
- `private_to_public(private_key)` - Derive public key
- `public_to_address(public_key)` - Generate address
- `validate_address(address)` - Validate address
- `sign_message(message)` - Sign message
- `to_dict()` - Export wallet data
- `from_dict(data)` - Import wallet data

### SacredLibrary

Sacred Library API client.

#### Methods

- `get_text(text_id)` - Get complete text
- `search(query, limit)` - Search all texts
- `daily_wisdom(seed, length)` - Get daily quote
- `get_metadata(text_id)` - Get text metadata
- `get_table_of_contents(text_id)` - Get TOC
- `get_excerpt(text_id, start, end)` - Get excerpt
- `list_texts()` - List available texts

#### Available Texts

- `cosmic_egg` - Cosmic Egg (2,500 lines)
- `omnity_one_love` - Omnity One Love (12,518 lines)
- `secrets_of_amenti` - Secrets of Amenti (8,200 lines)
- `dohrman_prophecy` - Dohrman Prophecy (6,318 lines)
- `via_lucis` - Via Lucis (4,800 lines)
- `sacred_trinity` - Sacred Trinity (5,256 lines)

## 🔧 Advanced Usage

### Context Manager

```python
with ZionClient() as client:
    info = client.get_info()
    print(info)
# Connection automatically closed
```

### Custom Node Connection

```python
# Connect to remote node
client = ZionClient(
    host="node.zionterranova.com",
    port=8332,
    protocol="https",
    timeout=60
)
```

### Error Handling

```python
from zion_sdk import ZionClient
from zion_sdk.exceptions import RPCError, ConnectionError

try:
    client = ZionClient()
    balance = client.get_balance("INVALID_ADDRESS")
except ConnectionError as e:
    print(f"Connection failed: {e}")
except RPCError as e:
    print(f"RPC error (code {e.code}): {e.message}")
```

## 🧪 Testing

```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run tests
pytest

# With coverage
pytest --cov=zion_sdk
```

## 📞 Support

- **Documentation:** https://docs.zionterranova.com
- **GitHub:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5
- **Issues:** https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues
- **Email:** admin@zionterranova.com

## 📜 License

MIT License - See LICENSE file for details

---

**Version:** 2.8.5 "Milky Way"  
**JAI RAM SITA HANUMAN - ON THE STAR!** ⭐
