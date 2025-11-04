"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItemProps = { href: string; children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode };
function NavItem({ href, children, onClick, icon }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {icon ? <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>{icon}</span> : null}
      <span className="relative">
        {children}
        <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-white/70 transition-transform duration-200 group-hover:scale-x-100" />
      </span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/5 transition-[box-shadow,backdrop-filter] ${
        elevated ? "backdrop-blur-md shadow-[0_2px_24px_rgba(0,255,65,0.08)]" : "backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Z.gif"
            alt="ZION logo"
            width={56}
            height={56}
            className="h-10 w-10 md:h-14 md:w-14 rounded overflow-hidden shadow-(--glow-green) object-cover"
            priority
          />
          <div>
            <div className="text-base md:text-lg font-extrabold tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>
              ZION
            </div>
            <div className="text-xs md:text-sm text-white/70">TestNet 2.8.5</div>
          </div>
        </Link>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <NavItem
            href="#features"
            onClick={() => setOpen(false)}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l2.39 7.34H22l-6.19 4.5 2.36 7.16L12 16.9 5.83 21l2.36-7.16L2 9.34h7.61L12 2z" />
              </svg>
            }
          >
            Vlastnosti
          </NavItem>
          <NavItem
            href="#start"
            onClick={() => setOpen(false)}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            }
          >
            Quickstart
          </NavItem>
          <NavItem
            href="#community"
            onClick={() => setOpen(false)}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          >
            Komunita
          </NavItem>

          <span className="mx-1 hidden h-5 w-px bg-white/10 md:block" aria-hidden />

          <Link
            href="/docs"
            aria-current={pathname?.startsWith("/docs") ? "page" : undefined}
            className={`group inline-flex items-center gap-2 rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-[0.95rem] font-semibold transition-colors ${
              pathname?.startsWith("/docs") ? "text-white bg-white/10" : "text-white/85 hover:text-white hover:bg-white/5"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
                <path d="M20 2H6.5C5.12 2 4 3.12 4 4.5V19.5" />
                <path d="M8 6h9" />
                <path d="M8 10h9" />
              </svg>
            </span>
            <span className="relative">
              Docs
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-white/70 transition-transform duration-200 group-hover:scale-x-100" />
            </span>
          </Link>
          <Link
            href="/dapp"
            aria-current={pathname === "/dapp" ? "page" : undefined}
            className={`group inline-flex items-center gap-2 rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-[0.95rem] font-semibold transition-colors ${
              pathname === "/dapp" ? "text-white bg-white/10" : "text-white/85 hover:text-white hover:bg-white/5"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <span className="relative">
              dApp
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-white/70 transition-transform duration-200 group-hover:scale-x-100" />
            </span>
          </Link>
          <Link
            href="/dashboard"
            aria-current={pathname === "/dashboard" ? "page" : undefined}
            className={`group inline-flex items-center gap-2 rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-[0.95rem] font-semibold transition-colors ${
              pathname === "/dashboard" ? "text-white bg-white/10" : "text-white/85 hover:text-white hover:bg-white/5"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 13h8V3H3z" />
                <path d="M13 21h8V11h-8z" />
              </svg>
            </span>
            <span className="relative">
              Dashboard
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-white/70 transition-transform duration-200 group-hover:scale-x-100" />
            </span>
          </Link>
          <a
            href="https://github.com/Zion-TerraNova/Zion-TestNet2.8.5"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open GitHub repository"
            className="inline-flex items-center gap-2 rounded-full bg-(--matrix-green) px-4 py-3 text-[0.95rem] font-bold text-black shadow-(--glow-green) transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.84 3.14 8.94 7.5 10.39.55.11.75-.24.75-.54 0-.27-.01-1.16-.01-2.11-3.05.66-3.69-1.3-3.69-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.58 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.41.1-2.94 0 0 .92-.3 3.02 1.12.88-.24 1.83-.36 2.77-.36.94 0 1.89.12 2.77.36 2.1-1.41 3.02-1.12 3.02-1.12.59 1.53.22 2.66.11 2.94.69.77 1.11 1.75 1.11 2.95 0 4.22-2.58 5.15-5.03 5.42.4.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .3.2.66.76.54 4.35-1.46 7.49-5.55 7.49-10.39C23.02 5.24 18.27.5 12 .5Z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden">
          <div className="mx-4 mb-4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-md shadow-lg">
            <div className="flex flex-col">
              <NavItem
                href="#features"
                onClick={() => setOpen(false)}
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.39 7.34H22l-6.19 4.5 2.36 7.16L12 16.9 5.83 21l2.36-7.16L2 9.34h7.61L12 2z"/></svg>}
              >
                Vlastnosti
              </NavItem>
              <NavItem
                href="#start"
                onClick={() => setOpen(false)}
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>}
              >
                Quickstart
              </NavItem>
              <NavItem
                href="#community"
                onClick={() => setOpen(false)}
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
              >
                Komunita
              </NavItem>
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"/><path d="M20 2H6.5C5.12 2 4 3.12 4 4.5V19.5"/><path d="M8 6h9"/><path d="M8 10h9"/></svg>
                </span>
                <span className="relative">Docs</span>
              </Link>
              <Link
                href="/dapp"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                </span>
                <span className="relative">dApp</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="opacity-75 transition-opacity group-hover:opacity-100" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13h8V3H3z"/><path d="M13 21h8V11h-8z"/></svg>
                </span>
                <span className="relative">Dashboard</span>
              </Link>
              <a
                href="https://github.com/Zion-TerraNova/Zion-TestNet2.8.5"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open GitHub repository"
                className="mt-2 inline-flex items-center gap-2 rounded-md bg-(--matrix-green) px-4 py-3 text-[0.95rem] font-bold text-black shadow-(--glow-green) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.84 3.14 8.94 7.5 10.39.55.11.75-.24.75-.54 0-.27-.01-1.16-.01-2.11-3.05.66-3.69-1.3-3.69-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.58 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.41.1-2.94 0 0 .92-.3 3.02 1.12.88-.24 1.83-.36 2.77-.36.94 0 1.89.12 2.77.36 2.1-1.41 3.02-1.12 3.02-1.12.59 1.53.22 2.66.11 2.94.69.77 1.11 1.75 1.11 2.95 0 4.22-2.58 5.15-5.03 5.42.4.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .3.2.66.76.54 4.35-1.46 7.49-5.55 7.49-10.39C23.02 5.24 18.27.5 12 .5Z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
