import MDXLayout from "@/components/MDXLayout";

type Props = { params: { page: string } };

const allowed = new Set([
  "getting-started",
  "mining-guide",
]);

export default async function MDXDocPage({ params }: Props) {
  const { page } = await params;
  const ok = allowed.has(page);

  if (!ok) {
    return (
      <MDXLayout>
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Stránka nenalezena</h1>
            <p className="text-white/60">Tato MDX stránka zatím není k dispozici.</p>
          </div>
        </div>
      </MDXLayout>
    );
  }

  return (
    <MDXLayout>
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-4 text-sm text-white/60">
          MDX Docs → {page.replace("-", " ")}
        </div>
        {/* MDX content will be rendered here by Next.js */}
      </div>
    </MDXLayout>
  );
}