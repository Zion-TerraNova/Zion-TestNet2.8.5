"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/docs", "/dashboard", "/wiki"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (hidden) {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 py-12 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:text-left">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40">ZION TerraNova</p>
          <h2 className="font-orbitron text-lg text-white/90">
            Consciousness-Based Blockchain for the New Era
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/70">
          <Link href="/docs" className="rounded-full border border-white/15 px-4 py-2 transition hover:border-matrix-green/70 hover:text-white">
            Dokumentace
          </Link>
          <Link href="/docs/whitepaper" className="rounded-full border border-white/15 px-4 py-2 transition hover:border-matrix-green/70 hover:text-white">
            Whitepaper
          </Link>
          <a href="https://discord.gg/zion" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 transition hover:border-matrix-green/70 hover:text-white">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
