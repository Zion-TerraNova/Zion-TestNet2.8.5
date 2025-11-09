"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const NAV_STRUCTURE = [
  {
    title: "Začínáme",
    items: [
      { slug: "getting-started", label: "Getting Started" },
      { slug: "setup", label: "Setup Guide" },
      { slug: "faq", label: "FAQ" },
    ],
  },
  {
    title: "Integrace",
    items: [{ slug: "integration-web33", label: "Web3.3 Integrace" }],
  },
  {
    title: "Těžba",
    items: [
      { slug: "mining-guide", label: "Mining Guide" },
      { slug: "pool-setup", label: "Pool Setup" },
      { slug: "consciousness-levels", label: "Consciousness Levels" },
    ],
  },
  {
    title: "Tutoriály",
    items: [{ slug: "tutorials/first-dapp", label: "First dApp Tutorial" }],
  },
  {
    title: "Whitepaper",
    items: [
      { slug: "whitepaper", label: "Whitepaper Hub" },
      { slug: "whitepaper/full", label: "Plná verze" },
      { slug: "whitepaper/core", label: "Core Architecture" },
      { slug: "whitepaper/cosmic-map", label: "Cosmic Map" },
      { slug: "whitepaper/humanitarian-tithe", label: "Humanitarian Tithe" },
      { slug: "whitepaper/sacred-knowledge", label: "Sacred Knowledge" },
      { slug: "whitepaper/zion-oasis", label: "ZION OASIS" },
      { slug: "whitepaper/victory-2025", label: "Victory 2025" },
      { slug: "whitepaper-lite", label: "Lite verze" },
      { slug: "whitepaper/governance", label: "Governance" },
      { slug: "whitepaper/security", label: "Security" },
      { slug: "whitepaper/roadmap", label: "Roadmap" },
    ],
  },
  {
    title: "Legacy",
    items: [
      { slug: "legacy", label: "Legacy Index" },
      { slug: "legacy/core-2-8-5", label: "CORE 2.8.5" },
      { slug: "legacy/whitepaper-2-8-5", label: "Whitepaper 2.8.5" },
      { slug: "legacy/humanitarian-tithe-2-8-5", label: "Humanitarian Tithe 2.8.5" },
      { slug: "legacy/sacred-knowledge-2-8-5", label: "Sacred Knowledge 2.8.5" },
      { slug: "legacy/zion-oasis-2-8-5", label: "ZION OASIS 2.8.5" },
      { slug: "legacy/victory-2025", label: "Victory 2025" },
      { slug: "legacy/cosmic-map-public", label: "Cosmic Map Public" },
    ],
  },
];

interface MDXLayoutProps {
  children: React.ReactNode;
}

export default function MDXLayout({ children }: MDXLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="matrix-scrollbar flex h-full flex-col gap-8 overflow-y-auto px-4 py-6">
      <div>
        <p className="text-xs uppercase tracking-[0.45em] text-white/50">Dokumentace</p>
        <p className="mt-2 text-sm text-white/60">ZION TestNet 2.8.5</p>
      </div>
      <div className="space-y-6">
        {NAV_STRUCTURE.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-2 text-[0.7rem] uppercase tracking-[0.35em] text-white/40">{section.title}</p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const href = `/docs/${item.slug}`;
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                        active
                          ? "bg-matrix-green text-black shadow-glow-green"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl gap-10 px-4 pb-24 pt-10 md:px-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed left-4 top-24 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white md:hidden"
      >
        <span className="text-xl">☰</span>
      </button>
      <aside className="hidden w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur md:block">
        {sidebar}
      </aside>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/80 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-y-0 left-0 w-72 overflow-hidden border-r border-white/10 bg-black/95">
            {sidebar}
          </div>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div id="start" className="rounded-3xl border border-white/10 bg-black/60 px-6 py-10 shadow-glow-cyan md:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
