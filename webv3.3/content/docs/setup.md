# Setup Guide

Komplexnější nastavení je zásadní pro stabilní výrobu bloků a správu reputačních multiplikátorů. Tento dokument popisuje referenční konfiguraci používanou v komunitní infrastruktuře.

## Hardwarové a síťové parametry

| Komponenta | Minimum | Doporučená konfigurace | Poznámka |
| --- | --- | --- | --- |
| CPU | 4 vCPU (x86_64) | 8 vCPU (Zen 3 / Ice Lake) | AES-NI výrazně zrychluje ověřování podpisů |
| RAM | 8 GB | 16 GB ECC | Při současném běhu exportérů přidej +4 GB |
| Úložiště | 120 GB SSD | 2× NVMe v RAID1 | IOPS > 10k pro rychlý stáh snapshotů |
| Připojení | 20 Mbps sym. | 100 Mbps sym. + veřejná IPv4 | UDP není potřeba, vše běží přes TCP |

- Otevři porty `7921` (P2P) a `7922` (RPC) na firewallu.
- V prostředí s více uzly nakonfiguruj privátní mesh přes WireGuard a vystav pouze jeden edge uzel.

```bash
sudo ufw allow 7921/tcp
sudo ufw allow from 10.42.0.0/16 to any port 7922 proto tcp
```

## Optimalizace OS

### Kernel parametry

Do `/etc/sysctl.d/99-zion.conf` přidej následující:

```conf
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.tcp_tw_reuse = 1
fs.file-max = 1048576
```

Poté aplikuj změny `sudo sysctl --system`.

### Limity pro uživatele

V `/etc/security/limits.d/zion.conf` nastav:

```
zion soft nofile 262144
zion hard nofile 524288
```

## Konečná konfigurace uzlu

1. Vytvoř adresářovou strukturu:

   ```bash
   sudo mkdir -p /etc/zion /var/lib/zion/snapshots
   sudo chown -R zion:zion /var/lib/zion
   ```

2. Nahraj konfigurační soubor `/etc/zion/node.toml`:

   ```toml
   [network]
   chain = "testnet-2.8.5"
   p2p_listen = "0.0.0.0:7921"
   rpc_listen = "127.0.0.1:7922"
   rpc_cors = ["https://web.zion.earth", "http://localhost:3000"]

   [sync]
   snapshot_url = "https://snapshots.testnet.zion.earth/latest.tar.lz4"
   trusted_hash = "0x1346bcad...f2d1"

   [telemetry]
   metrics_listen = "127.0.0.1:9600"
   ```

3. Pokud používáš vzdálenou PostgreSQL pro indexer, přidej sekci:

   ```toml
   [indexer]
   enabled = true
   database_url = "postgresql://zion:secret@10.42.0.10:5432/zion"
   ```

## Automatizace pomocí systemd

```ini
[Unit]
Description=ZION TestNet Node
After=network-online.target
Wants=network-online.target

[Service]
User=zion
Group=zion
ExecStart=/usr/local/bin/zion-node --config /etc/zion/node.toml --data-dir /var/lib/zion
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5
LimitNOFILE=65536
Environment=RUST_LOG=info

[Install]
WantedBy=multi-user.target
```

Po uložení spusť sekvenci:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now zion-node
sudo systemctl status zion-node --no-pager
```

## Zabezpečení a zálohy

- Oddělený uživatel pouze s právy k `/var/lib/zion` a `/etc/zion`.
- Aktivuj audit logy: `sudo auditctl -w /var/lib/zion -p war -k zion-data`.
- Snapshoty zálohuj každých 12 hodin na objektové úložiště a uchovávej minimálně 3 generace.

## Monitoring a alerting

1. Spusť Prometheus exportér:

   ```bash
   docker run -d --name zion-exporter \
     -p 9600:9600 \
     --restart unless-stopped \
     ghcr.io/zion-project/zion-exporter:0.4.1
   ```

2. Přidej pravidla do Promethea:

   ```yaml
   - alert: ZionPeerDown
     expr: max_over_time(zion_peers_total[5m]) < 4
     for: 10m
     labels:
       severity: warning
     annotations:
       description: "Počet peerů na uzlu {{ $labels.instance }} klesl pod doporučené minimum."

   - alert: ZionBlockLag
     expr: zion_head_lag_blocks > 120
     for: 5m
     labels:
       severity: critical
     annotations:
       description: "Uzel zaostává o více než 120 bloků."
   ```

3. V Grafaně importuj dashboard `zion-testnet-overview.json` z repozitáře `zion-observability`.

## Testovací checklist

- [ ] `curl localhost:7922/status` vrací `"syncStatus":"ready"`.
- [ ] `zion-wallet balance` zobrazuje faucet transakci do 3 minut.
- [ ] V logu se každých ~60 sekund objevuje `proposed_block=true`.
- [ ] Alertmanager nedrží kritické alerty po 24 hodinách běhu.

Pokračuj na [Mining Guide](/docs/mining-guide) nebo [FAQ](/docs/faq) podle potřeby.
