# Scripts – ZION Testnet v2.8.5

Pomocné skripty pro rychlý start a běžné operace.

## install.sh
Jednoduchý instalátor (viz releases pro binárky).

## start_node.sh
Spustí ZION node s testnet konfigurací.

## start_mining.sh
Spustí XMRig mining client.
```bash
ZION_WALLET=your_address ./start_mining.sh
# nebo
./start_mining.sh ZION_wallet_address 4
```

## create_wallet.sh
Vytvoří novou peněženku pomocí CLI.

## check_status.sh
Zkontroluje stav běžícího nodu.

---

Poznámka: Všechny skripty vyžadují, aby byly binárky (`zion-node`, `zion-cli`, `xmrig`) dostupné v PATH nebo aktuálním adresáři.
