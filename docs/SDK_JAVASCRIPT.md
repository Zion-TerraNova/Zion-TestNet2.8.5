# 🟨 JavaScript/TypeScript SDK – ZION Testnet v2.8.5

Instalace:
```bash
npm install @zion/sdk
```

Použití:
```ts
import { ZionClient } from '@zion/sdk';

const client = new ZionClient({ host: 'https://api.zionterranova.com' });
const info = await client.getInfo();
console.log(info);
```

Další příklady najdete v `sdk/javascript/README.md`.