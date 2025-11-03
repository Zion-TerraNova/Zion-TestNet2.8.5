# ZION Public Testnet v2.8.5 – Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────┐
│              Public Testnet v2.8.5                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐      ┌──────────────┐           │
│  │  ZION Node   │◄────►│  Mining Pool │           │
│  │  (binary)    │      │  (binary)    │           │
│  └──────┬───────┘      └──────┬───────┘           │
│         │                      │                    │
│         │ RPC/WebSocket       │ Stratum            │
│         │                      │                    │
│  ┌──────▼───────┐      ┌──────▼───────┐           │
│  │  SDKs        │      │  Miners      │           │
│  │ Python/JS    │      │  XMRig/GPU   │           │
│  └──────────────┘      └──────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Dual-Repository Model

**Private Core Repo:**
- Genesis block creation
- Premine address management (15.78B ZION)
- Core blockchain logic
- Build system → binaries

**Public Testnet Repo (this one):**
- Pre-compiled binaries
- Docker images
- SDKs (Python, JavaScript)
- Documentation
- Configuration examples

## Security Model

- No .py source code in public repo
- Binaries verified via SHA256 + GPG
- Docker images use published binaries only
- RPC endpoints are read-mostly for public nodes

## Network Architecture

- Testnet ID: `milky-way-2.8.5`
- P2P Port: 9333
- RPC Port: 8545/8332
- Stratum Ports: 3333 (RandomX), 3334 (other algos)

## More Details

See `docs/2.8.5/` for complete technical documentation.
