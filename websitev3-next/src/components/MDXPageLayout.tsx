import MDXLayout from "@/components/MDXLayout";

export default function MDXPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <MDXLayout content="">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <article className="prose prose-invert prose-cyan max-w-none">
          {children}
        </article>
      </div>
    </MDXLayout>
  );
}