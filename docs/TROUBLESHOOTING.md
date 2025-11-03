# 🧰 Troubleshooting – ZION Testnet v2.8.5

### "Permission denied" při spouštění binárky
Udělte práva:
```bash
chmod +x zion-node
```

### XMRig se nepřipojí
- Zkontrolujte adresu/port `pool.zionterranova.com:3333`
- Použijte `--coin monero`
- Zkontrolujte firewall

### Docker image nenalezen
```bash
docker pull zionterranova/zion-node:2.8.5
```

### Wallet se nenačte
- Ověřte soubor `~/.zion/wallet.dat`
- Opravte práva: `chmod 600 ~/.zion/wallet.dat`