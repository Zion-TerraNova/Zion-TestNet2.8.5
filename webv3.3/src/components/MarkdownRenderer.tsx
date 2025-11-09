import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  type CodeBlockProps = React.HTMLAttributes<HTMLElement> & {
    inline?: boolean;
    className?: string;
  };

  const renderCode = ({ inline, className: codeClassName, children, ...props }: CodeBlockProps) => {
    const isInline = Boolean(inline);
    const finalClassName = isInline
      ? "text-matrix-green/90 font-mono"
      : `bg-transparent border-0 p-0 text-sm font-mono leading-relaxed ${codeClassName ?? ""}`;

    if (isInline) {
      return (
        <code className={finalClassName} {...props}>
          {children}
        </code>
      );
    }

    return (
      <pre className="my-5 overflow-x-auto bg-transparent p-0">
        <code className={finalClassName} {...props}>
          {children}
        </code>
      </pre>
    );
  };

  const markdownComponents: Components = {
    code: renderCode,
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={
        className ?? [
          "prose",
          "prose-invert",
          "prose-lg", // větší základní typografie
          "max-w-none",
          "leading-8",
          // větší a čitelnější nadpisy
          "[&_h1]:font-extrabold [&_h1]:text-[2.5rem] sm:[&_h1]:text-[3rem]",
          "[&_h2]:font-bold [&_h2]:text-[2rem] sm:[&_h2]:text-[2.5rem]",
          "[&_h3]:text-[1.375rem] sm:[&_h3]:text-[1.75rem]",
          // odstupy mezi nadpisy a odstavci
          "[&_h1]:mt-9 [&_h1]:mb-3.5",
          "[&_h2]:mt-7 [&_h2]:mb-3",
          "[&_h3]:mt-6 [&_h3]:mb-2",
          "prose-p:my-4",
          "prose-ul:my-3 prose-ol:my-3",
          "prose-li:my-1.5",
          "prose-hr:my-8",
          // blokový kód bez rámečků/pozadí
          "prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0",
          // tabulky a citace subtilněji
          "prose-blockquote:border-l-matrix-green/30",
        ].join(" ")
      }
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
