# ZION JavaScript SDK

Official JavaScript/TypeScript client library for ZION Blockchain v2.8.5 "Milky Way"

## 🚀 Installation

```bash
npm install @zion/sdk
# or
yarn add @zion/sdk
```

## 📖 Quick Start

### JavaScript

```javascript
const { ZionClient, ZionWallet, SacredLibrary } = require('@zion/sdk');

// Connect to node
const client = new ZionClient({ host: 'localhost', port: 8332 });

// Get blockchain info
client.getInfo().then(info => {
  console.log(`Block height: ${info.height}`);
  console.log(`Difficulty: ${info.difficulty}`);
});

// Check balance
client.getBalance('ZION_ADDRESS_HERE').then(balance => {
  console.log(`Balance: ${balance} ZION`);
});
```

### TypeScript

```typescript
import { ZionClient, ZionWallet, SacredLibrary } from '@zion/sdk';

// Connect to node
const client = new ZionClient({ host: 'localhost', port: 8332 });

// Get blockchain info
const info = await client.getInfo();
console.log(`Block height: ${info.height}`);

// Check balance
const balance = await client.getBalance('ZION_ADDRESS_HERE');
console.log(`Balance: ${balance} ZION`);
```

### Wallet Management

```typescript
import { ZionWallet } from '@zion/sdk';

// Generate new wallet
const wallet = new ZionWallet();
console.log(`Address: ${wallet.address}`);
console.log(`Private key: ${wallet.privateKey}`);

// Import existing wallet
const wallet2 = new ZionWallet('YOUR_PRIVATE_KEY_HEX');
console.log(`Loaded wallet: ${wallet2.address}`);

// Validate address
const isValid = ZionWallet.validateAddress('ZION_ADDRESS');
console.log(`Valid: ${isValid}`);
```

### Sacred Library

```typescript
import { SacredLibrary } from '@zion/sdk';

// Initialize Sacred Library client
const library = new SacredLibrary();

// Get daily wisdom
const wisdom = await library.dailyWisdom();
console.log(wisdom.quote);
console.log(`Source: ${wisdom.source}`);

// Search sacred texts
const results = await library.search('consciousness evolution', 5);
results.forEach(result => {
  console.log(`${result.text}: ${result.excerpt}`);
});

// Read specific text
const omnity = await library.getText('omnity_one_love');
console.log(`Title: ${omnity.title}`);
console.log(`Lines: ${omnity.metadata.lines}`);
```

### Transactions

```typescript
import { ZionClient, ZionWallet } from '@zion/sdk';

const client = new ZionClient();
const wallet = new ZionWallet('YOUR_PRIVATE_KEY');

// Send ZION
const txHash = await client.createTransaction({
  from: wallet.address,
  to: 'RECIPIENT_ADDRESS',
  amount: 100.0, // 100 ZION
  privateKey: wallet.privateKey,
  fee: 0.001,
});
console.log(`Transaction sent: ${txHash}`);
```

## 📚 API Reference

### ZionClient

#### Constructor

```typescript
new ZionClient(options?: {
  host?: string;        // Default: 'localhost'
  port?: number;        // Default: 8332
  protocol?: 'http' | 'https'; // Default: 'http'
  timeout?: number;     // Default: 30000 (ms)
})
```

#### Methods

- `getInfo()` - Get blockchain info
- `getBlockCount()` - Get current block height
- `getBlock(blockHash)` - Get block by hash
- `getBlockByHeight(height)` - Get block by height
- `getTransaction(txHash)` - Get transaction by hash
- `getBalance(address)` - Get wallet balance
- `createTransaction(params)` - Create and sign transaction
- `getMiningInfo()` - Get mining statistics
- `getConsciousnessLevel(address)` - Get CL level (1-9)
- `getPeerInfo()` - Get connected peers
- `validateAddress(address)` - Validate address format

### ZionWallet

#### Constructor

```typescript
new ZionWallet(privateKey?: string)
```

#### Properties

- `address: string` - ZION address
- `publicKey: string` - Public key (hex)
- `privateKey: string` - Private key (hex)

#### Methods

- `signMessage(message)` - Sign message
- `toJSON()` - Export wallet data
- `static fromJSON(data)` - Import wallet data
- `static validateAddress(address)` - Validate address

### SacredLibrary

#### Constructor

```typescript
new SacredLibrary(client?: ZionClient)
```

#### Methods

- `getText(textId)` - Get complete text
- `search(query, limit)` - Search all texts
- `dailyWisdom(seed?, length?)` - Get daily quote
- `listTexts()` - List available texts

#### Available Texts

- `cosmic_egg` - Cosmic Egg (2,500 lines)
- `omnity_one_love` - Omnity One Love (12,518 lines)
- `secrets_of_amenti` - Secrets of Amenti (8,200 lines)
- `dohrman_prophecy` - Dohrman Prophecy (6,318 lines)
- `via_lucis` - Via Lucis (4,800 lines)
- `sacred_trinity` - Sacred Trinity (5,256 lines)

## 🔧 Advanced Usage

### Error Handling

```typescript
import { ZionClient, RPCError, ConnectionError } from '@zion/sdk';

try {
  const client = new ZionClient();
  const balance = await client.getBalance('INVALID_ADDRESS');
} catch (error) {
  if (error instanceof ConnectionError) {
    console.error(`Connection failed: ${error.message}`);
  } else if (error instanceof RPCError) {
    console.error(`RPC error (code ${error.code}): ${error.message}`);
  }
}
```

### Custom Node Connection

```typescript
const client = new ZionClient({
  host: 'node.zionterranova.com',
  port: 8332,
  protocol: 'https',
  timeout: 60000,
});
```

## 🧪 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
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
