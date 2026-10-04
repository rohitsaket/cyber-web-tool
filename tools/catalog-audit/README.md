# wtt-catalog-audit

Structural audit of the Global Tool Catalog exactly as specified by `PHASES.md` §70/§92
(WTT-P00 governance tooling — Python side of the "establish toolchain" obligation;
never runs in a product session):

1. Capability IDs `1–1235` covered exactly once (zero gaps, zero overlaps).
2. All 104 catalog domains `A–CZ` present.
3. Every phase-section `Catalog:` reference (domains §§19–67) matches its §70 row's
   ID range and primary-phase assignment.

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
wtt-catalog-audit --phases ../../../PHASES.md   # or: python -m catalog_audit
pytest && ruff check src tests && ruff format --check src tests && mypy src
```

Exit codes: `0` pass · `1` catalog violations · `2` usage/IO error.
