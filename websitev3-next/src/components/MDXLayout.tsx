"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navSections = [
  {
    title: "Getting Started",
    items: [
      { slug: "getting-started", title: "Getting Started" },
      { slug: "setup", title: "Setup Guide" },
    ],
  },
  {
    title: "Mining",
    items: [
      { slug: "mining-guide", title: "Mining Guide" },
      { slug: "pool-setup", title: "Pool Setup" },
      { slug: "consciousness-levels", title: "Consciousness Levels" },
    ],
  },
  {
    title: "Reference",
    items: [
      { slug: "api-reference", title: "API Reference" },
      { slug: "technical-specs", title: "Technical Specs" },
      { slug: "testnet-info", title: "TestNet Info" },
      { slug: "version-history", title: "Version History" },
    ],
  },
  {
    title: "Whitepaper",
    items: [
      { slug: "whitepaper-lite", title: "Whitepaper Lite" },
      { slug: "whitepaper-lite-cz", title: "Whitepaper Lite (CZ)" },
      { slug: "whitepaper", title: "Whitepaper (Full)" },
      { slug: "whitepaper/architecture", title: "Architecture" },
      { slug: "whitepaper/bridge", title: "Rainbow Bridge" },
      { slug: "whitepaper/economics", title: "Economics" },
      { slug: "whitepaper/governance", title: "Governance" },
      { slug: "whitepaper/security", title: "Security" },
      { slug: "whitepaper/roadmap", title: "Roadmap" },
      { slug: "cosmic-map", title: "Cosmic Map" },
      { slug: "sacred-knowledge", title: "Sacred Knowledge" },
      { slug: "humanitarian-tithe", title: "Humanitarian Tithe" },
      { slug: "core", title: "ZION Core" },
      { slug: "victory-2025", title: "Victory 2025" },
    ],
  },
  {
    title: "Legacy (v2.8.5)",
    items: [
      { slug: "legacy", title: "Legacy Index" },
      { slug: "legacy/core-2.8.5", title: "CORE 2.8.5" },
  { slug: "legacy/whitepaper-2.8.5", title: "Whitepaper 2.8.5" },
      { slug: "legacy/zion-oasis-2.8.5", title: "OASIS 2.8.5" },
      { slug: "legacy/sacred-knowledge-2.8.5", title: "Sacred Knowledge 2.8.5" },
      { slug: "legacy/humanitarian-tithe-2.8.5", title: "Humanitarian Tithe 2.8.5" },
      { slug: "legacy/zion-victory-2025", title: "Victory 2025 (Legacy)" },
    ],
  },
  {
    title: "Community",
    items: [
      { slug: "oasis", title: "ZION OASIS" },
      { slug: "roadmap", title: "Roadmap" },
      { slug: "faq", title: "FAQ" },
    ],
  },
];

interface MDXLayoutProps {
  children: React.ReactNode;
  // content?: string; // Not needed when TOC is hidden to match V2 layout
}

export default function MDXLayout({ children }: MDXLayoutProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "";
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const SidebarContent = (
    <nav className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Dokumentace</h2>
        <p className="text-sm text-white/60">ZION TestNet 2.8.5</p>
      </div>

      {/* Search placeholder */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Hledat v dokumentaci..."
          className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-(--matrix-green) focus:outline-none"
          disabled
        />
        <p className="mt-1 text-xs text-white/40">Vyhledávání brzy dostupné</p>
      </div>

      <div className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-white/50">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = item.slug === currentSlug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`rounded-md px-3 py-2 text-sm transition-colors inline-flex items-center gap-2 ${
                        isActive
                          ? "bg-(--matrix-green) text-black font-medium"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {/* small bullet icon */}
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="relative z-10 flex min-h-screen pt-16">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-20 z-30 rounded-md bg-black/80 p-2 text-white/80 backdrop-blur-md md:hidden"
        aria-label="Toggle docs navigation"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop sidebar (sticky, no inner scroll) */}
      <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black/40 backdrop-blur md:block">
        <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-visible">
          {SidebarContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r border-white/10 bg-black/90 backdrop-blur-md md:hidden">
            {SidebarContent}
          </div>
        </>
      )}

      {/* Main content (no right TOC to match V2 behavior) */}
      <main className="ml-0 flex-1">
        {/* Anchor for skip link and reliable scroll target under fixed navbar */}
        <div id="start" />
        <div className="mx-auto w-full max-w-4xl px-4 py-8 pb-24 md:px-8 md:pb-28">
          {children}
        </div>
      </main>
    </div>
  );
}