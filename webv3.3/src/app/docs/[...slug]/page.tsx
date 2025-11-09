import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getMarkdownContent, hasMarkdownContent } from "@/lib/getMarkdownContent";
import fs from "fs";
import path from "path";

interface DocsPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // Add aliases from getMarkdownContent.ts
  const ALIASES = [
    "whitepaper/full",
    "whitepaper/core", 
    "whitepaper/cosmic-map",
    "whitepaper/humanitarian-tithe",
    "whitepaper/sacred-knowledge",
    "whitepaper/zion-oasis",
    "whitepaper/victory-2025",
    "legacy/core-2-8-5",
    "legacy/whitepaper-2-8-5",
    "legacy/humanitarian-tithe-2-8-5",
    "legacy/sacred-knowledge-2-8-5",
    "legacy/zion-oasis-2-8-5",
    "legacy/victory-2025",
    "legacy/cosmic-map-public",
  ];

  for (const alias of ALIASES) {
    params.push({ slug: alias.split("/") });
  }

  // Recursively find all markdown files in content/docs
  function findMarkdownFiles(dir: string, basePath: string[] = []): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        findMarkdownFiles(path.join(dir, entry.name), [...basePath, entry.name]);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const slug = [...basePath, entry.name.replace('.md', '')];
        params.push({ slug });
      }
    }
  }

  const docsRoot = path.join(process.cwd(), "content", "docs");
  if (fs.existsSync(docsRoot)) {
    findMarkdownFiles(docsRoot);
  }

  return params;
}

export default async function DocsCatchAllPage({ params }: DocsPageProps) {
  const resolvedParams = await params;
  const safeSlug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [];

  if (!safeSlug.length) {
    return notFound();
  }

  if (!hasMarkdownContent(...safeSlug)) {
    return notFound();
  }

  const content = getMarkdownContent(...safeSlug);

  return <MarkdownRenderer content={content} />;
}
