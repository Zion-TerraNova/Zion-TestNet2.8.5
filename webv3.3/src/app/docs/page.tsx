import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getMarkdownContent } from "@/lib/getMarkdownContent";

export default function DocsIndexPage() {
  const content = getMarkdownContent("index");

  return <MarkdownRenderer content={content} />;
}
