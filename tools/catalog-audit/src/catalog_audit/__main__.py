"""Allow `python -m catalog_audit`."""

from catalog_audit.cli import main

if __name__ == "__main__":
    raise SystemExit(main())
