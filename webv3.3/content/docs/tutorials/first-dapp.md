# Your First ZION dApp

Postupný průvodce, jak vytvořit jednoduchou decentralizovanou aplikaci na síti ZION.

## Předpoklady

- Node.js 18+
- Peněženka s testnet tokeny
- Základní znalost TypeScriptu

## Projektový setup

```bash
mkdir zion-hello-world
cd zion-hello-world
npm init -y
npm install @zion-terranova/sdk ethers express
npm install -D typescript @types/node @types/express
npx tsc --init
```

### Struktura projektu

```
zion-hello-world/
├── src/
│   ├── app.ts
│   ├── contract.ts
│   └── utils.ts
├── contracts/
│   └── HelloZion.sol
├── scripts/
│   └── deploy.js
└── package.json
```

## Smart kontrakt

`contracts/HelloZion.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloZion {
    string public message;
    address public owner;

    event MessageUpdated(string newMessage, address updater);

    constructor(string memory _initialMessage) {
        message = _initialMessage;
        owner = msg.sender;
    }

    function updateMessage(string memory _newMessage) external {
        message = _newMessage;
        emit MessageUpdated(_newMessage, msg.sender);
    }
}
```

## Backend API

`src/app.ts`

```typescript
import express from "express";
import { ZionSDK } from "@zion-terranova/sdk";
import { helloContract } from "./contract";

const app = express();
const port = 3000;

const zion = new ZionSDK({
  network: "testnet",
  privateKey: process.env.PRIVATE_KEY,
});

app.use(express.json());

app.get("/api/message", async (_req, res) => {
  const message = await helloContract.getMessage();
  res.json({ message });
});

app.post("/api/message", async (req, res) => {
  const { newMessage } = req.body;
  const tx = await helloContract.updateMessage(newMessage);
  await tx.wait();
  res.json({ hash: tx.hash, newMessage });
});

app.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
});
```

## Nasazení kontraktu

`scripts/deploy.js`

```javascript
const { ZionSDK } = require("@zion-terranova/sdk");

async function main() {
  const zion = new ZionSDK({
    network: "testnet",
    privateKey: process.env.PRIVATE_KEY,
  });

  console.log("🚀 Deploying HelloZion...");
  const contract = await zion.deployContract({
    artifactPath: "./artifacts/contracts/HelloZion.sol/HelloZion.json",
    constructorArgs: ["Hello, ZION!"],
  });

  console.log("✅ Contract address:", contract.address);
}

main().catch(console.error);
```

## Frontend (rychlé MVP)

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ZION Hello World</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <h1>🄉 Hello ZION dApp</h1>
    <section>
      <h2>Aktuální zpráva</h2>
      <pre id="message">Načítám...</pre>
      <input id="newMessage" placeholder="Nová zpráva" />
      <button id="update">Aktualizovat</button>
    </section>
    <script type="module" src="/app.js"></script>
  </body>
</html>
```

## Spuštění

```bash
# 1. Kompilace kontraktu
npx hardhat compile

# 2. Deploy na testnet
PRIVATE_KEY=... node scripts/deploy.js

# 3. API server
tsx src/app.ts

# 4. Frontend
npm run dev
```

## Další kroky

1. Integruj wallet connect (ZION Wallet / MetaMask kompatibilní)
2. Přidej WebSocket pro real-time updaty
3. Automatizuj testy přes `vitest` nebo `hardhat test`
4. Deployni na Vercel + serverless backend

---

*Gratulujeme! Máš první dApp běžící na ZION.*
