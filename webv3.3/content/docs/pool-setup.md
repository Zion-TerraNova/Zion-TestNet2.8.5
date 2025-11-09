# Pool Setup

_Tento návod vychází ze souboru `config/pool.conf.example`. Potvrzené parametry zveřejní QA tým._

## Instalace

```bash
git clone https://github.com/Zion-TerraNova/pool.git
cd pool
npm install
```

## Konfigurace

```json
{
  "stratum": {
    "host": "0.0.0.0",
    "port": 3912,
    "ssl": false
  },
  "pool": {
    "wallet": "ZIONxxxx",
    "fee": 0.01,
    "payout_threshold": 12
  }
}
```

## Bezpečnost

- Omez přístup přes fail2ban.
- Přidej reverzní proxy (Nginx) s rate-limitem.
- Sleduj orphan rate a pravidelně validuj sítě.
