import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading components with anchor links
    h1: ({ children, ...props }) => (
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold" {...props}>
        {children}
      </h4>
    ),
    
    // Paragraphs
    p: ({ children, ...props }) => (
      <p className="mb-4 text-white/80 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    
    // Links
    a: ({ href, children, ...props }) => {
      // Internal links use Next.js Link
      if (href?.startsWith('/')) {
        return (
          <Link 
            href={href} 
            className="text-(--matrix-green) hover:underline"
            {...props}
          >
            {children}
          </Link>
        )
      }
      // External links open in new tab
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-(--matrix-green) hover:underline"
          {...props}
        >
          {children}
        </a>
      )
    },
    
    // Lists
    ul: ({ children, ...props }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-white/80" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-white/80" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    
    // Code blocks
    code: ({ children, ...props }) => (
      <code 
        className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-(--matrix-green)" 
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre 
        className="mb-4 overflow-x-auto rounded-lg border border-white/10 bg-black/70 p-4" 
        {...props}
      >
        {children}
      </pre>
    ),
    
    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="mb-4 border-l-4 border-(--matrix-green) bg-black/30 p-4 italic text-white/70"
        {...props}
      >
        {children}
      </blockquote>
    ),
    
    // Tables
    table: ({ children, ...props }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th 
        className="border border-white/20 bg-white/5 px-4 py-2 text-left font-semibold" 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-white/20 px-4 py-2" {...props}>
        {children}
      </td>
    ),
    
    // Horizontal rule
    hr: (props) => (
      <hr className="my-8 border-t border-white/10" {...props} />
    ),
    
    // Images
    img: ({ alt, ...props }) => (
      <img 
        alt={alt} 
        className="my-4 rounded-lg" 
        {...props} 
      />
    ),
    
    // Allow custom components
    ...components,
  }
}
