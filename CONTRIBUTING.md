# Contributing to ZION Public Testnet v2.8.5

Thanks for your interest in contributing! This repository hosts the public testnet assets: documentation, SDKs, and Docker compose for prebuilt images. Core node/pool/miner source code is not included here.

## Ways to Contribute

- Docs: fixes, clarifications, translations (CZ/EN)
- SDKs: bug fixes and small features in `sdk/python` and `sdk/javascript`
- Issues: file bugs, suggest improvements, and share testnet results
- Docker: compose improvements that use prebuilt images (no local Dockerfiles)

## Development

- Python SDK: standard Poetry/PEP 517 packaging (`sdk/python`)
- JS/TS SDK: TypeScript + npm (`sdk/javascript`)
- Please include tests where reasonable and run formatters/linters

## Pull Request Checklist

- Keep changes scoped and focused
- No secrets, keys, or environment files
- No database files or build artefacts
- CI passes (where applicable)

## Security

If you discover a vulnerability, please email security@zionterranova.com. Do not open a public issue.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
