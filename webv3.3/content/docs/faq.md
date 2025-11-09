# FAQ

Nejčastější dotazy od operátorů TestNetu 2.8.5. Pokud nenajdeš odpověď, přidej otázku do GitHub Discussions (`#docs-faq`) nebo napiš na Discordu do kanálu `#testnet-support`.

## Co je cílem verze 2.8.5?

Release 2.8.5 přináší konsenzusový modul **Aurora**, reputační multiplikátory vědomí a on-chain governance návrhy (ZIP). TestNet stabilizujeme před MainNetem v Q3 2026.

## Kde získám testnet tokeny?

- Požádej faucet přes REST API (`/api/request`) nebo v kanálu `#testnet-faucet`.
- Jedna adresa získá maximálně 500 ZTN za 24 hodin. Potřebuješ-li víc, otevři issue s popisem testu.

## Jak poznám, že uzel je synchronizovaný?

`curl http://127.0.0.1:7922/status | jq .syncStatus` musí vracet `"ready"`. Sleduj metriku `zion_head_lag_blocks` – hodnota ≤ 5 znamená, že uzel drží tempo. Při větších odchylkách využij snapshoty popsané v [Setup Guide](/docs/setup).

## Co znamenají multiplikátory vědomí?

Na TestNetu fungují jako reputační skóre. Základní multiplikátor je `1.0`. Po bezpečnostním auditu, prokázaném uptime a komunitní angažovanosti může vzrůst až na `1.5`. Vyšší multiplikátor zvyšuje váhu hlasů v DAO i odměny z těžby.

## Jaké algoritmy můžu těžit?

Aktivní profily: `randomx-balanced` (CPU) a `argon2-gpu` (GPU). Konfiguruj přes `zion-node mining profile set randomx-balanced`. GPU profil potřebuje min. 8 GB VRAM a OpenCL 2.1.

## Uzel se zasekl na "connecting to peers". Jak pokračovat?

1. Zkontroluj firewall (port `7921/tcp`).
2. Ověř DNS `node1.testnet.zion.earth` a `node2.testnet.zion.earth`.
3. Pokud jsi za NATem, nastav `external_address` v `node.toml`.
4. Prologuj přes `journalctl -u zion-node -o cat | grep peer_id`.

## Jak přispět do dokumentace?

Vytvoř větev z `main`, uprav Markdown v `content/docs`, přidej materiály do `public/docs/` a otevři PR s popisem testovacího scénáře. Recenze trvá obvykle 48 hodin.

## Kam hlásit bezpečnostní incidenty?

Piš na `security@zion.earth` šifrovaně PGP klíčem `0x3A1C 56E1 9F42 8B75`. Kritické incidenty (remote exploit, únik klíčů) mají bounty dle programu [ZION Responsible Disclosure](https://zion.earth/security), min. 5000 USDC.

## Kdy se plánuje přechod na MainNet?

Po třech stabilních epochách (cca 6 týdnů) bez kritických incidentů. O přesném datu rozhodne hlasování ZIP-42. Sleduj `https://status.zion.earth` pro aktuální timeline.
