"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Github, BookOpen, Rocket } from "lucide-react";
import clsx from "clsx";
import { useThemeLang } from "@/context/ThemeLangContext";
import { DICT } from "@/lib/i18n";

const baseLinks = [
  { key: "docs" as const, href: "/docs", icon: BookOpen },
  { key: "dashboard" as const, href: "/dashboard", icon: Rocket },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang } = useThemeLang();
  const labels = DICT[lang];

  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="relative flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/70 shadow-glow-green">
            <img src="/Z.gif" alt="ZION Logo" width={44} height={44} className="object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60">ZION</span>
            <span className="font-orbitron text-lg font-semibold text-matrix-green">TestNet 2.8.5</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {baseLinks.map(({ href, key, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-white/10 text-matrix-green shadow-glow-green"
                    : "text-white/80 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{labels[key]}</span>
              </Link>
            );
          })}
          <a
            href="https://github.com/Zion-TerraNova"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-matrix-green/80 hover:text-white"
          >
            <Github className="h-4 w-4" />
            {labels.github}
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-matrix-green/80 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/80 backdrop-blur md:hidden">
          <nav className="space-y-1 px-6 py-4">
            {baseLinks.map(({ href, key, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition",
                    active
                      ? "bg-white/10 text-matrix-green"
                      : "text-white/80 hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{labels[key]}</span>
                </Link>
              );
            })}
            <a
              href="https://github.com/Zion-TerraNova"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/80 transition hover:bg-white/5"
            >
              <Github className="h-4 w-4" />
              {labels.github}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
