# Getting Started with ZION TerraNova

Welcome to ZION TerraNova! This quickstart průvodce tě provede první instalací peněženky, připojením k testnetu a spuštěním těžby.

## Prerequisites

- Moderní webový prohlížeč (Chrome, Firefox, Safari, Edge)
- Základní porozumění konceptům blockchainu
- Dostatečné připojení k internetu (synchronizace peněženky)

## 1. Vytvoř si peněženku

```bash
# Stáhni oficiální peněženku
curl -L https://github.com/Zion-TerraNova/wallet/releases/latest/download/zion-wallet-setup.exe -o zion-wallet.exe

# Spusť instalátor
./zion-wallet.exe
```

Po spuštění peněženka sama synchronizuje hlavní síť. TestNet mód aktivuj příkazem:

```bash
zion-wallet --testnet --config testnet.conf
```

## 2. Připoj se k síti

- **Mainnet**: výchozí konfigurace
- **TestNet**: použij výše uvedený příkaz nebo vlastní `config`

## 3. Získej první ZION

- Nákup na burze (mainnet)
- Těžba (viz sekce níže)
- Faucet (TestNet)

## 4. Těžba

### HW požadavky

- CPU 4 jádra+
- RAM 8 GB
- SSD 50 GB
- Stabilní internet

### Instalace mineru

```bash
git clone https://github.com/Zion-TerraNova/miner.git
cd miner
make && make install
zion-miner --address TVOJE_ADRESA --threads 4
```

## 5. Vývojové prostředí

```bash
npm install @zion-terranova/sdk
npx zion-cli init my-zion-app
cd my-zion-app
npm run dev
```

```javascript
import { ZionSDK } from '@zion-terranova/sdk';

const zion = new ZionSDK({
  network: 'mainnet',
  apiKey: 'tvuj-api-klic',
});

const balance = await zion.getBalance('tvá-adresa');
console.log('Balance:', balance);
```

## Next Steps

1. [Podívej se na architekturu](/docs/architecture/overview)
2. [Přidej se do komunity](/docs/community)
3. [Postav první dAppku](/docs/tutorials/first-dapp)
4. [Přispěj do sítě](/docs/contributing)

---

Hotovo! Jsi připraven stavět budoucnost. 🚀
