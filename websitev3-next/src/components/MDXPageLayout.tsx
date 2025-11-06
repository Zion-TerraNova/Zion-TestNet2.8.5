export default function MDXPageLayout({ children }: { children: React.ReactNode }) {
  // Note: The docs route is already wrapped by MDXLayout via src/app/docs/layout.tsx
  // This component now only provides article styling without adding another sidebar.
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <article className="prose prose-invert prose-cyan max-w-none">
        {children}
      </article>
    </div>
  );
}