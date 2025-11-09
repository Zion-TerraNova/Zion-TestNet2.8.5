# API Reference

Comprehensive documentation for ZION TerraNova's REST, WebSocket a SDK integrace.

## REST API

### Base URL
```
https://api.zion-terranova.org/v1
```

### Authentication

Každý dotaz používá `Authorization: Bearer <API_KEY>`.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.zion-terranova.org/v1/account/balance
```

### Rate limits

| Tier | Limity |
| --- | --- |
| Free | 100 req/h |
| Basic | 1 000 req/h |
| Pro | 10 000 req/h |
| Enterprise | Podle smlouvy |

## Core endpoints

### Account

```http
GET /account/balance/{address}
```
```json
{
  "address": "zion1abc...xyz",
  "balance": "123.456789",
  "pending": "0.001234",
  "last_updated": "2025-01-07T12:00:00Z"
}
```

```http
GET /account/transactions/{address}?limit=50&offset=0
```

### Transaction

```http
POST /transaction/send
```
```json
{
  "from": "zion1abc...xyz",
  "to": "zion1recipient...",
  "amount": "10.0",
  "fee": "0.001",
  "memo": "Optional message",
  "signature": "hex-encoded-signature"
}
```

```http
GET /transaction/{hash}
```

### Network

```http
GET /network/stats
```
```json
{
  "block_height": 123456,
  "hashrate": "500000000",
  "difficulty": "1234567890",
  "active_miners": 1234,
  "tps": 42.5,
  "market_price": 45.67
}
```

```http
GET /block/{height}
```

## WebSocket API

```javascript
const ws = new WebSocket('wss://api.zion-terranova.org/v1/ws');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('New block:', data);
};
```

```json
{ "type": "subscribe", "channel": "blocks" }
{ "type": "subscribe", "channel": "address", "address": "zion1..." }
{ "type": "subscribe", "channel": "stats" }
```

## SDK knihovny

### JavaScript

```bash
npm install @zion-terranova/sdk
```
```javascript
import { ZionSDK } from '@zion-terranova/sdk';

const zion = new ZionSDK({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

const balance = await zion.getBalance('zion1abc...');
const tx = await zion.sendTransaction({ to: 'zion1recipient...', amount: '10.0' });
```

### Python

```bash
pip install zion-sdk
```
```python
from zion_sdk import ZionClient

client = ZionClient(api_key='your-api-key')
balance = client.get_balance('zion1abc...')
```

### Go

```go
client := zion.NewClient("your-api-key")
balance, err := client.GetBalance("zion1abc...")
```

## Smart Contract API

```http
POST /contract/deploy
```
```json
{
  "bytecode": "0x608060...",
  "abi": [],
  "constructor_args": ["arg1"],
  "gas_limit": 3000000
}
```

```http
POST /contract/call
```

## Error handling

| Kód | Popis |
| --- | --- |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Rate limit |
| 500 | Server error |

```json
{"error":{"code":400,"message":"Invalid address format"}}
```

### Rate limit headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Webhooky

```http
POST /webhooks
```
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["transaction.confirmed", "block.new"],
  "secret": "your-webhook-secret"
}
```

## Testnet resources

- **Endpoint**: `https://api-testnet.zion-terranova.org/v1`
- **Faucet**: `https://faucet-testnet.zion-terranova.org`
- **Status**: `https://status.zion-terranova.org`

---

*Build powerful applications on ZION TerraNova* 🚀
