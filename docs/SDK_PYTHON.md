# 🐍 Python SDK – ZION Testnet v2.8.5

Instalace:
```bash
pip install zion-sdk
```

Použití:
```python
from zion_sdk import ZionClient

client = ZionClient(host="https://api.zionterranova.com")
info = client.get_info()
print(info)
```

Ukázky:
- Získání balancí, odeslání transakce, odběr nových bloků
- Viz `sdk/python/README.md`