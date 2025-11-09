# Mining Guide

_Podrobný manuál bude synchronizován ze souboru `docs/MINING_GUIDE.md`. Tato verze slouží jako pracovní osnova._

## Algoritmy

| Algoritmus | Typ | Poznámka |
| --- | --- | --- |
| RandomX Dharma | CPU | Optimalizován pro AVX2 |
| Argon2 Nebula | GPU | Spouštěj přes SRBMiner |

## Solo vs Pool

- **Solo**: výkon > 8 kH/s, latency < 50 ms.
- **Pool**: doporučený endpoint `pool.zion.earth:3912`.

```bash
./zion-miner --algo randomx --threads 8 --url stratum+tcp://pool.zion.earth:3912 --user WALLET
```

## Optimalizace

1. Povolit hugepages: `vm.nr_hugepages=128`.
2. NUMA pinning dle socketu.
3. TDP limit okolo 80 % pro stabilitu.

## Monitoring výkonu

- Grafana dashboard `deployment/monitoring`.
- Alert: propad hashrate o 30 % během 10 minut.
