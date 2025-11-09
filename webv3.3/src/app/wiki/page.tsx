"use client";

import Link from "next/link";
import { BookOpen, Globe2, Rocket, ExternalLink } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import BubbleOverlay from "@/components/BubbleOverlay";

const FEATURE_LINKS = [
  {
    title: "Dokumentace ZION",
    description: "Aktuální průvodci pro TestNet 2.8.5 – instalace, těžba, governance i roadmapy.",
    href: "/docs",
    icon: BookOpen,
  },
  {
    title: "Mission Control Dashboard",
    description: "Reálné metriky testnetu, sprinty 2.8.6 → 2.9.0 a mosty do dalších sítí.",
    href: "/dashboard",
    icon: Rocket,
  },
  {
    title: "Legacy Wiki (Archiv)",
    description: "Kompletní původní wiki včetně kosmické mapy, humanitárních fondů a historických plánů.",
    href: "/legacy/wiki/index.html",
    icon: Globe2,
  },
];

export default function WikiPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <MatrixRain />
      <BubbleOverlay intensity="gentle" />
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 md:px-10">
        <section className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow-green backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 md:max-w-3xl">
              <span className="text-xs uppercase tracking-[0.45em] text-white/60">ZION Knowledge Base</span>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">
                Archivy, dokumentace a kosmické mapy na jednom místě
              </h1>
              <p className="text-sm text-white/70 md:text-base">
                Tato sekce spojuje novou dokumentaci v Next.js 16, Mission Control dashboard a kompletní archivní wiki z verze V3.
                Legacy wiki zůstává zachována ve své původní podobě, ale získává moderní obal a rychlý přístup z TestNet 2.8.5.
              </p>
            </div>
            <Link
              href="/legacy/wiki/index.html"
              className="inline-flex items-center gap-2 rounded-full border border-matrix-green/50 px-5 py-3 text-sm font-semibold text-matrix-green transition hover:border-matrix-green hover:text-black hover:bg-matrix-green/90"
            >
              Otevřít celou Legacy Wiki
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white md:text-2xl">Kam pokračovat</h2>
          <p className="mt-2 text-sm text-white/60 md:max-w-3xl">
            Vyber si mezi živou dokumentací, operativním dashboardem nebo archivní wiki. Všechny zdroje společně mapují cestu k ZIONu 3.0.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {FEATURE_LINKS.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-black/55 p-6 text-white/80 transition hover:border-matrix-green/70 hover:text-white"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-black/70 text-matrix-green shadow-glow-green transition group-hover:border-matrix-green/70">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm text-white/60">{description}</p>
                </div>
                <span className="mt-auto text-xs uppercase tracking-[0.4em] text-matrix-cyan">Vstoupit →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-black/60 p-6 shadow-glow-cyan">
            <h2 className="text-xl font-semibold text-white md:text-2xl">Rychlé vstupy do archivu</h2>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              Legacy wiki obsahuje stovky stran – zde najdeš přímé odkazy na nejžádanější sekce.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white">ZION Cosmic Map</span>
                <Link href="/legacy/docs/cosmic-map/index.html" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  Otevřít modul →
                </Link>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white">Humanitarian Tithe</span>
                <Link href="/legacy/docs/humanitarian/index.html" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  Otevřít modul →
                </Link>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white">ZION Dashboard V3</span>
                <Link href="/legacy/dashboard.html" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  Historická data →
                </Link>
              </li>
            </ul>
          </article>
          <aside className="rounded-3xl border border-white/10 bg-black/60 p-6 shadow-glow-green">
            <h2 className="text-xl font-semibold text-white md:text-2xl">Ukázka legacy wiki</h2>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              Vložený náhled načítá úvodní stránku archivu přímo z public/legacy.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Legacy wiki preview"
                src="/legacy/wiki/index.html"
                loading="lazy"
                className="h-[420px] w-full"
              />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
