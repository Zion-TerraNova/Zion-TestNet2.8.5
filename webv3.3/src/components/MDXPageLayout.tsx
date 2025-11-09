export default function MDXPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-invert prose-headings:font-orbitron prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-white/70 prose-a:text-matrix-cyan hover:prose-a:text-matrix-green max-w-none">
      {children}
    </article>
  );
}
