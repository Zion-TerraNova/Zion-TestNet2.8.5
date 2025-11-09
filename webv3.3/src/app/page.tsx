"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import ThemePanel, { type BackgroundMode } from "@/components/ThemePanel";
import NasaBackground from "@/components/NasaBackground";
import AladinBackground from "@/components/AladinBackground";
const MeteorShower = dynamic(() => import("@/components/MeteorShower"), { ssr: false });
const BubbleOverlay = dynamic(() => import("@/components/BubbleOverlay"), { ssr: false });

const Starfield = dynamic(() => import("@/components/ThreeStarfield"), { ssr: false });

export default function Home() {
  const [mode, setMode] = useState<BackgroundMode>("starfield");
  const [meteorsOn, setMeteorsOn] = useState(false);
  const [bubblesOn, setBubblesOn] = useState(false);
  const [nasaSrc, setNasaSrc] = useState<string | undefined>(undefined);
  const [aladinSurvey, setAladinSurvey] = useState("P/AllWISE/color");
  const [aladinTarget, setAladinTarget] = useState("0 0");
  const [aladinFov, setAladinFov] = useState(120);

  return (
    <div className="relative min-h-screen overflow-hidden">
  <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(13,240,255,0.12),rgba(2,6,23,0.92))]" />
      {mode === "starfield" && <Starfield />}
      {mode === "nasa" && <NasaBackground src={nasaSrc} />}
      {mode === "observatory" && (
        <AladinBackground
          survey={aladinSurvey}
          target={aladinTarget}
          fov={aladinFov}
          opacity={0.5}
        />
      )}
      {mode === "void" && (
  <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.15),rgba(2,6,23,0.95))]" />
      )}

  {meteorsOn && <MeteorShower quality="auto" />}
  {bubblesOn && <BubbleOverlay intensity="gentle" />}

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-24 md:px-10 md:pt-32">
        <section className="flex min-h-[60vh] flex-col items-center text-center md:flex-row md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.45em] text-white/60">
              <span>Force Awaken</span>
              <span className="h-1 w-1 rounded-full bg-matrix-green" />
              <span>TestNet 2.8.5</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              <span className="gradient-matrix neon block font-brand">ZION </span>
              <span className="mt-3 block text-white/80">Multichain Dharma Economy</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/70">
              Těž, buduj a spravuj duchovně zaměřený ekosystém. Využij multiplikátor vědomí až 10×, prověřenou bezpečnost RandomX PoW a komunitní governance s humanitárním přesahem.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/docs/getting-started"
                className="rounded-full bg-matrix-green px-6 py-3 text-sm font-semibold text-black shadow-glow-green transition hover:-translate-y-0.5"
              >
                Začni minovat
              </Link>
              <Link
                href="/docs/whitepaper"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-matrix-cyan/80 hover:text-white"
              >
                Přečti si whitepaper
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-matrix-green/40 px-6 py-3 text-sm font-semibold text-matrix-green transition hover:border-matrix-green hover:text-black hover:bg-matrix-green/90"
              >
                Mission Control
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-12 flex-1 md:mt-0 md:pl-16"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-6 shadow-glow-cyan">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(13,240,255,0.25),transparent_65%)]" />
              <div className="grid grid-cols-2 gap-4 text-left text-sm text-white/70">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Supply</p>
                  <p className="mt-2 text-xl font-semibold text-matrix-green">144&nbsp;mld. ZION</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Algoritmus</p>
                  <p className="mt-2 text-xl font-semibold text-matrix-green">RandomX Dharma</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Multiplikátor</p>
                  <p className="mt-2 text-xl font-semibold text-matrix-green">1× – 10× Vědomí</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Governance</p>
                  <p className="mt-2 text-xl font-semibold text-matrix-green">DAO 2045</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="start" className="mt-32">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold text-white">
              Tři kroky k aktivaci
            </h2>
            <p className="max-w-2xl text-base text-white/60">
              Připoj se k síti, nastav miner a odemkni vyšší úrovně vědomí pro bonusové odměny.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Získej klienta",
                description: "Stáhni poslední TestNet release pro svůj operační systém.",
                cta: "Releases",
              },
              {
                step: 2,
                title: "Synchronizuj uzel",
                description: "Spusť node, vytvoř peněženku a připoj se ke komunitě.",
                cta: "Setup",
              },
              {
                step: 3,
                title: "Aktivuj těžbu",
                description: "Vyber algoritmus a sleduj úroveň vědomí v dashboardu.",
                cta: "Mining Guide",
              },
            ].map(({ step, title, description, cta }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: step * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6"
              >
                <div className="matrix-sheen" />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-matrix-green/30 bg-black/80 text-sm font-semibold text-matrix-green">
                  {step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/60">{description}</p>
                <Link
                  href="/docs"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-matrix-cyan"
                >
                  {cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="wiki" className="mt-32">
          <div className="grid gap-8 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Ekosystém vědomé ekonomiky</h2>
              <p className="mt-4 text-base text-white/65">
                ZION spojuje těžbu, humanitární fond a duchovní rozvoj. 10&nbsp;% všech odměn proudí do dětské charity, 1&nbsp;% posiluje vývojové týmy a zbytek motivuje komunitu.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
                <Link href="/docs/mining-guide" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-matrix-green/70">
                  Mining Guide
                </Link>
                <Link href="/docs/humanitarian-tithe" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-matrix-green/70">
                  Humanitarian Tithe
                </Link>
                <Link href="/docs/roadmap" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:border-matrix-green/70">
                  Roadmap
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 text-sm text-white/70 shadow-glow-green">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Nejbližší milníky</p>
              <ul className="mt-4 space-y-3">
                <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                  <p className="text-white">Q4 2025 — Consciousness Mining Lite</p>
                  <p className="text-xs text-white/60">Základní ověřování úrovní vědomí skrze komunitní rituály.</p>
                </li>
                <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                  <p className="text-white">Q1 2026 — Bridge 2.0</p>
                  <p className="text-xs text-white/60">Integrace multichain mostů a audit bezpečnosti.</p>
                </li>
                <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                  <p className="text-white">Q2 2026 — DAO Transition Kickoff</p>
                  <p className="text-xs text-white/60">Delegace rozhodování na komunitní výbory a ZIP proces.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <ThemePanel
        mode={mode}
        setMode={setMode}
        meteorsOn={meteorsOn}
        setMeteorsOn={setMeteorsOn}
        bubblesOn={bubblesOn}
        setBubblesOn={setBubblesOn}
        nasaSrc={nasaSrc}
        setNasaSrc={setNasaSrc}
        aladinSurvey={aladinSurvey}
        setAladinSurvey={setAladinSurvey}
        aladinTarget={aladinTarget}
        setAladinTarget={setAladinTarget}
        aladinFov={aladinFov}
        setAladinFov={setAladinFov}
      />
    </div>
  );
}
