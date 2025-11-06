"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItemProps = { href: string; children: React.ReactNode; onClick?: () => void };
function NavItem({ href, children, onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-md px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 inline-flex items-center gap-2"
    >
      {children}
    </a>
  );
}

function Icon({ name, className = "w-4 h-4" }: { name: "sparkles" | "rocket" | "users" | "book" | "grid" | "github"; className?: string }) {
  switch (name) {
    case "sparkles":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 3l1.5 3L10 7.5 6.5 9 5 12 3.5 9 0 7.5 3.5 6 5 3z" transform="translate(7 4)" />
          <path d="M2 2l.8 1.6L4 4l-1.2.4L2 6 1.6 4.4 0 4l1.6-.4L2 2z" transform="translate(3 15)" />
          <path d="M2 2l.7 1.3L4 4l-1.3.7L2 6 1.3 4.7 0 4l1.3-.7L2 2z" transform="translate(16 16)" />
        </svg>
      );
    case "rocket":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 19c1.5-3.5 4-6 7.5-7.5C15 9 17.5 6.5 21 5c-.5 3.5-2 6-6.5 8.5C11 16 8.5 18.5 5 19z" />
          <path d="M15 9l-3 3" />
          <path d="M6 22s0-3 3-3 3 3 3 3H6z" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" />
        </svg>
      );
    case "grid":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.23.75-.52 0-.26-.01-1.11-.02-2.01-3.06.67-3.7-1.3-3.7-1.3-.5-1.27-1.22-1.6-1.22-1.6-.99-.67.08-.66.08-.66 1.1.08 1.68 1.12 1.68 1.12.98 1.68 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.12-2.95-.11-.27-.49-1.36.1-2.84 0 0 .92-.29 3.02 1.13.88-.25 1.83-.37 2.77-.37.94 0 1.89.13 2.78.37 2.1-1.42 3.02-1.13 3.02-1.13.59 1.48.21 2.57.1 2.84.7.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.14-5.02 5.41.39.34.72.99.72 2 0 1.44-.01 2.6-.01 2.95 0 .29.2.63.76.52 4.36-1.45 7.51-5.56 7.51-10.41C23.02 5.24 18.27.5 12 .5z" />
        </svg>
      );
  }
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
      className={`fixed inset-x-0 top-0 z-40 transition-[box-shadow,backdrop-filter] ${
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
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 sm:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <NavItem href="#features" onClick={() => setOpen(false)}>
            <Icon name="sparkles" />
            <span>Vlastnosti</span>
          </NavItem>
          <NavItem href="#start" onClick={() => setOpen(false)}>
            <Icon name="rocket" />
            <span>Quickstart</span>
          </NavItem>
          <NavItem href="#community" onClick={() => setOpen(false)}>
            <Icon name="users" />
            <span>Komunita</span>
          </NavItem>
          <Link
            href="/docs"
            className={`rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-[0.95rem] font-semibold transition-colors inline-flex items-center gap-2 ${
              pathname?.startsWith("/docs")
                ? "text-white bg-white/10"
                : "text-white/85 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon name="book" />
            <span>Docs</span>
          </Link>
          <Link
            href="/dashboard"
            className={`rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-[0.95rem] font-semibold transition-colors inline-flex items-center gap-2 ${
              pathname === "/dashboard" ? "text-white bg-white/10" : "text-white/85 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon name="grid" />
            <span>dApp</span>
          </Link>
          <a
            href="https://github.com/Zion-TerraNova/Zion-TestNet2.8.5"
            target="_blank"
            className="rounded-full bg-(--matrix-green) px-4 py-3 text-[0.95rem] font-bold text-black shadow-(--glow-green) hover:-translate-y-0.5 transition-transform inline-flex items-center gap-2"
          >
            <span className="inline-flex items-center justify-center rounded-sm bg-black/10 p-0.5 text-black">
              <Icon name="github" className="w-4 h-4" />
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden">
          <div className="mx-4 mb-4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-md">
            <div className="flex flex-col">
              <NavItem href="#features" onClick={() => setOpen(false)}><Icon name="sparkles" /><span>Vlastnosti</span></NavItem>
              <NavItem href="#start" onClick={() => setOpen(false)}><Icon name="rocket" /><span>Quickstart</span></NavItem>
              <NavItem href="#community" onClick={() => setOpen(false)}><Icon name="users" /><span>Komunita</span></NavItem>
              <Link href="/docs" className="rounded-md px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 inline-flex items-center gap-2" onClick={() => setOpen(false)}><Icon name="book" /><span>Docs</span></Link>
              <Link href="/dashboard" className="rounded-md px-4 py-3 text-[0.95rem] font-semibold text-white/85 transition-colors hover:text-white hover:bg-white/5 inline-flex items-center gap-2" onClick={() => setOpen(false)}><Icon name="grid" /><span>dApp</span></Link>
              <a
                href="https://github.com/Zion-TerraNova/Zion-TestNet2.8.5"
                target="_blank"
                className="mt-2 rounded-md bg-(--matrix-green) px-4 py-3 text-[0.95rem] font-bold text-black shadow-(--glow-green) inline-flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center rounded-sm bg-black/10 p-0.5 text-black"><Icon name="github" className="w-4 h-4" /></span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
