import type { DocReader } from "../src/lib/markdown.js";

/** In-memory DocReader for unit tests (no fixture files on disk needed). */
export class MemoryReader implements DocReader {
  constructor(private readonly files: Map<string, string>) {}

  exists(relPath: string): boolean {
    const key = relPath.replace(/^\.\//, "");
    if (this.files.has(key)) return true;
    const prefix = key.endsWith("/") ? key : `${key}/`;
    for (const path of this.files.keys()) {
      if (path.startsWith(prefix)) return true;
    }
    return false;
  }

  readText(relPath: string): string {
    const key = relPath.replace(/^\.\//, "");
    const text = this.files.get(key);
    if (text === undefined) throw new Error(`File not found: ${key}`);
    return text;
  }

  listDir(relDir: string): string[] {
    const prefix = relDir === "." ? "" : `${relDir.replace(/\/$/, "")}/`;
    const out = new Set<string>();
    for (const path of this.files.keys()) {
      if (!path.startsWith(prefix)) continue;
      const rest = path.slice(prefix.length);
      if (rest.length === 0) continue;
      out.add(rest.split("/")[0] as string);
    }
    return [...out].sort();
  }

  listMarkdownFiles(): string[] {
    return [...this.files.keys()].filter((p) => p.endsWith(".md")).sort();
  }
}

export function memTree(
  entries: Readonly<Record<string, string>> | Map<string, string>,
): MemoryReader {
  const map = entries instanceof Map ? entries : new Map(Object.entries(entries));
  return new MemoryReader(map);
}
