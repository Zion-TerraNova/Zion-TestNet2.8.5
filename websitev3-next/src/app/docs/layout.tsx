import MDXLayout from "@/components/MDXLayout";

export const dynamic = 'force-dynamic';

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXLayout>{children}</MDXLayout>;
}
