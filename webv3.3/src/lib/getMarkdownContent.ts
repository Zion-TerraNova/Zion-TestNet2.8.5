import fs from "fs";
import path from "path";

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");
const WHITEPAPER_ROOT = path.join(process.cwd(), "content", "whitepaper");

const ALIASES: Record<string, string> = {
  "whitepaper/full": path.join(WHITEPAPER_ROOT, "ZION_Whitepaper_v2.8.5.md"),
  "whitepaper/core": path.join(WHITEPAPER_ROOT, "CORE_2.8.5.md"),
  "whitepaper/cosmic-map": path.join(WHITEPAPER_ROOT, "COSMIC_MAP_2.8.5_COMPLETE.md"),
  "whitepaper/humanitarian-tithe": path.join(WHITEPAPER_ROOT, "HUMANITARIAN_TITHE_2.8.5.md"),
  "whitepaper/sacred-knowledge": path.join(WHITEPAPER_ROOT, "SACRED_KNOWLEDGE_2.8.5.md"),
  "whitepaper/zion-oasis": path.join(WHITEPAPER_ROOT, "ZION_OASIS_2.8.5.md"),
  "whitepaper/victory-2025": path.join(WHITEPAPER_ROOT, "ZION_VICTORY_2025.md"),
  "legacy/core-2-8-5": path.join(WHITEPAPER_ROOT, "CORE_2.8.5.md"),
  "legacy/whitepaper-2-8-5": path.join(WHITEPAPER_ROOT, "ZION_Whitepaper_v2.8.5.md"),
  "legacy/humanitarian-tithe-2-8-5": path.join(WHITEPAPER_ROOT, "HUMANITARIAN_TITHE_2.8.5.md"),
  "legacy/sacred-knowledge-2-8-5": path.join(WHITEPAPER_ROOT, "SACRED_KNOWLEDGE_2.8.5.md"),
  "legacy/zion-oasis-2-8-5": path.join(WHITEPAPER_ROOT, "ZION_OASIS_2.8.5.md"),
  "legacy/victory-2025": path.join(WHITEPAPER_ROOT, "ZION_VICTORY_2025.md"),
  "legacy/cosmic-map-public": path.join(WHITEPAPER_ROOT, "COSMIC_MAP_2.8.5_PUBLIC_EDITION.md"),
};

function resolveDocPath(segments: string[]): string | undefined {
  const slugPath = segments.join("/");

  const aliasPath = ALIASES[slugPath];
  if (aliasPath && fs.existsSync(aliasPath)) {
    return aliasPath;
  }

  const joined = path.join(DOCS_ROOT, ...segments);

  if (fs.existsSync(joined)) {
    const stat = fs.statSync(joined);
    if (stat.isFile()) {
      return joined;
    }
    if (stat.isDirectory()) {
      const indexCandidates = [
        path.join(joined, "index.md"),
        path.join(joined, "README.md"),
        path.join(joined, "readme.md"),
      ];
      for (const candidate of indexCandidates) {
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
    }
  }

  const withMdExtension = `${joined}.md`;
  if (fs.existsSync(withMdExtension)) {
    return withMdExtension;
  }

  return undefined;
}

export function hasMarkdownContent(...segments: string[]): boolean {
  return Boolean(resolveDocPath(segments));
}

export function getMarkdownContent(...segments: string[]): string {
  const targetPath = resolveDocPath(segments);

  if (!targetPath) {
    throw new Error(`Document not found for path: ${segments.join("/")}`);
  }

  return fs.readFileSync(targetPath, "utf8");
}
