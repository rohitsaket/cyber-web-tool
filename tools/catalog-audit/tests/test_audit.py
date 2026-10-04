"""Unit tests for the catalog structural audit (fixture-based) + one integration
test that runs against the real PHASES.md (skipped when the file is absent)."""

from pathlib import Path

import pytest

from catalog_audit.audit import (
    audit_catalog,
    check_phase_catalog_lines,
    expected_domains,
    id_coverage,
    parse_catalog_rows,
)
from catalog_audit.cli import main

REPO_ROOT = Path(__file__).resolve().parents[3]
PHASES_PATH = REPO_ROOT / "PHASES.md"


def doc(rows: list[str], phase_sections: list[str] | None = None) -> str:
    """Assemble a minimal PHASES-shaped document: §70 table + phase sections."""
    table = "\n".join(
        ["## 70. Catalog-to-Phase Matrix", "| Domain | IDs | Name | Primary |", *rows]
    )
    sections = "\n\n".join(phase_sections or [])
    return f"{table}\n\n## 71. Next Section\n{sections}\n"


class TestParsing:
    def test_parses_rows_with_en_dash_and_hyphen(self) -> None:
        rows = parse_catalog_rows(
            doc(
                [
                    "| A | 1–6 | Core Runtime | P01 (foundation) / P02 (policy) |",
                    "| B | 7-9 | Other | P03 |",
                ]
            )
        )
        assert [r.domain for r in rows] == ["A", "B"]
        assert rows[0].start == 1 and rows[0].end == 6
        assert rows[1].start == 7 and rows[1].end == 9
        assert "P01" in rows[0].primary
        assert rows[0].name == "Core Runtime"

    def test_ignores_non_table_lines(self) -> None:
        assert parse_catalog_rows("no table here") == []


class TestIdCoverage:
    def test_exact_cover_no_issues(self) -> None:
        rows = parse_catalog_rows(doc(["| A | 1–1 | a | P01 |"]))
        missing, overlaps = id_coverage(rows)
        assert overlaps == []
        assert missing  # 2..1235 are 'missing' for this tiny fixture
        assert missing[0] == 2

    def test_overlap_detected(self) -> None:
        rows = parse_catalog_rows(doc(["| A | 1–2 | a | P01 |", "| B | 2–3 | b | P02 |"]))
        missing, overlaps = id_coverage(rows)
        assert any("OVERLAP at 2" in o for o in overlaps)
        assert 2 not in missing[:3]  # id 2 is covered (twice)

    def test_inverted_range_reported(self) -> None:
        rows = parse_catalog_rows(doc(["| A | 9–1 | bad | P01 |"]))
        _, overlaps = id_coverage(rows)
        assert any("inverted range" in o for o in overlaps)


class TestDomains:
    def test_universe_has_104_domains(self) -> None:
        assert len(expected_domains()) == 104

    def test_real_phases_passes_full_audit(self) -> None:
        if not PHASES_PATH.exists():
            pytest.skip("real PHASES.md not present in this checkout")
        outcome = audit_catalog(PHASES_PATH.read_text(encoding="utf-8"))
        assert outcome.issues == []
        assert outcome.ok
        assert outcome.stats["domains"] == 104
        assert outcome.stats["missing"] == 0
        assert outcome.stats["overlaps"] == 0
        assert outcome.stats["phase_violations"] == 0


class TestPhaseLineCrossCheck:
    ROWS = parse_catalog_rows(
        doc(
            [
                "| A | 1–6 | Core | P01 (foundation rows) / P02 (auth/scope rows) |",
                "| CT | 10–12 | Events | P04 |",
            ]
        )
    )

    def test_matching_reference_is_clean(self) -> None:
        text = doc([]) + "## 20. WTT-P01 — X\n\n- **Catalog:** A 1–6 things. Type: NATIVE.\n"
        assert check_phase_catalog_lines(self.ROWS, text) == []

    def test_unowned_phase_reference_detected(self) -> None:
        text = doc([]) + "## 22. WTT-P03 — Y\n\n- **Catalog:** A 1–6\n"
        issues = check_phase_catalog_lines(self.ROWS, text)
        assert len(issues) == 1
        assert "not assigned to P03" in issues[0]

    def test_unknown_range_detected(self) -> None:
        text = doc([]) + "## 23. WTT-P04 — Z\n\n- **Catalog:** CT 90–99\n"
        issues = check_phase_catalog_lines(self.ROWS, text)
        assert len(issues) == 1
        assert "no §70 row covers" in issues[0]

    def test_sections_without_catalog_line_skipped(self) -> None:
        text = (
            doc([]) + "## 19. WTT-P00 — None\n\n- **Catalog:** none introduced — P00 registers.\n"
        )
        assert check_phase_catalog_lines(self.ROWS, text) == []


class TestAuditCatalog:
    def test_reports_gaps_and_missing_domains(self) -> None:
        outcome = audit_catalog(doc(["| A | 1–3 | a | P01 |"]))
        assert not outcome.ok
        assert any(line.startswith("GAPS") for line in outcome.issues)
        assert any(line.startswith("MISSING DOMAINS") for line in outcome.issues)
        assert outcome.stats["covered"] == 3

    def test_empty_matrix_short_circuits(self) -> None:
        outcome = audit_catalog("## 70. Catalog-to-Phase Matrix\nnothing\n## 71.")
        assert not outcome.ok
        assert outcome.issues[0].startswith("no §70")


class TestCli:
    def test_exit_1_on_violations(self, tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
        bad = tmp_path / "PHASES.md"
        bad.write_text(doc(["| A | 1–3 | a | P01 |"]), encoding="utf-8")
        assert main(["--phases", str(bad)]) == 1
        assert "FAIL" in capsys.readouterr().out

    def test_exit_2_on_missing_file(self, tmp_path: Path) -> None:
        assert main(["--phases", str(tmp_path / "nope.md")]) == 2

    def test_json_output_ok_field(self, tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
        bad = tmp_path / "PHASES.md"
        bad.write_text(doc(["| A | 1–3 | a | P01 |"]), encoding="utf-8")
        assert main(["--phases", str(bad), "--json"]) == 1
        import json

        payload = json.loads(capsys.readouterr().out)
        assert payload["ok"] is False

    @pytest.mark.skipif(not PHASES_PATH.exists(), reason="real PHASES.md absent")
    def test_real_repo_passes(self) -> None:
        assert main(["--phases", str(PHASES_PATH)]) == 0
