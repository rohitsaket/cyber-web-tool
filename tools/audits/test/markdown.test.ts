import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  FsDocReader,
  normalizeNewlines,
  parseTableRow,
  tableRowsUnder,
} from "../src/lib/markdown.js";

describe("normalizeNewlines", () => {
  it("converts CRLF and lone CR to LF", () => {
    expect(normalizeNewlines("a\r\nb\rc")).toBe("a\nb\nc");
  });
});

describe("parseTableRow", () => {
  it("splits pipe rows and skips separators", () => {
    expect(parseTableRow("| A | 1–6 | name | P01 |")).toEqual(["A", "1–6", "name", "P01"]);
    expect(parseTableRow("|---|---|")).toBeNull();
    expect(parseTableRow("not a table")).toBeNull();
  });
});

describe("tableRowsUnder", () => {
  it("collects rows under a heading until the next same-level heading", () => {
    const md = [
      "# Doc",
      "### Appendix B — Glossary (normative terms)",
      "",
      "| Term | Meaning |",
      "|---|---|",
      "| Project | Container. |",
      "| Test / Scenario / Step | Executable check. |",
      "",
      "### Appendix C — Other",
      "| Ignored |",
    ].join("\n");
    const { rows } = tableRowsUnder(md, "Appendix B — Glossary");
    expect(rows).toEqual([
      ["Project", "Container."],
      ["Test / Scenario / Step", "Executable check."],
    ]);
  });
});

describe("FsDocReader path safety", () => {
  const testRoot = join(realpathSync(tmpdir()), `wtt-audit-test-${Date.now()}`);
  mkdirSync(testRoot, { recursive: true });
  const root = realpathSync(testRoot);
  writeFileSync(join(root, "ok.md"), "hello");
  mkdirSync(join(root, "docs"), { recursive: true });
  writeFileSync(join(root, "docs", "nested.md"), "nested");

  it("rejects traversal and absolute paths", () => {
    const reader = new FsDocReader(root);
    expect(() => reader.readText("../outside.md")).toThrow(/escapes/);
    expect(() => reader.readText("/etc/passwd")).toThrow(/escapes/);
    expect(() => reader.exists("a/../../b")).toThrow(/escapes/);
  });

  it("rejects symlinks that escape the root", () => {
    const outsidePath = join(realpathSync(tmpdir()), `wtt-audit-outside-${Date.now()}`);
    mkdirSync(outsidePath, { recursive: true });
    const outside = realpathSync(outsidePath);
    writeFileSync(join(outside, "secret.md"), "leak");
    symlinkSync(join(outside, "secret.md"), join(root, "escape.md"));
    const reader = new FsDocReader(root);
    expect(() => reader.readText("escape.md")).toThrow(/escapes/);
  });

  it("reads contained files and lists markdown under root + docs/", () => {
    const reader = new FsDocReader(root);
    expect(reader.readText("ok.md")).toBe("hello");
    expect(reader.listDir("docs")).toEqual(["nested.md"]);
    expect(reader.listMarkdownFiles()).toContain("ok.md");
    expect(reader.listMarkdownFiles()).toContain("docs/nested.md");
  });
});
