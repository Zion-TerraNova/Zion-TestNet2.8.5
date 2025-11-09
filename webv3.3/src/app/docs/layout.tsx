import MDXLayout from "@/components/MDXLayout";

export const dynamic = "force-static";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <MDXLayout>{children}</MDXLayout>;
}
