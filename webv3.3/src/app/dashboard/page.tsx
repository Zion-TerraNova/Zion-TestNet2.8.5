"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ThemePanel, { type BackgroundMode } from "@/components/ThemePanel";
import NasaBackground from "@/components/NasaBackground";
import AladinBackground from "@/components/AladinBackground";
const MeteorShower = dynamic(() => import("@/components/MeteorShower"), { ssr: false });
const BubbleOverlay = dynamic(() => import("@/components/BubbleOverlay"), { ssr: false });

const Starfield = dynamic(() => import("@/components/ThreeStarfield"), { ssr: false });

const NETWORK_KPIS = [
  {
    label: "Aktuální blok",
    value: "#1,482,211",
    delta: "+512 bloků / 24 h",
  },
  {
    label: "Průměrná propagace",
    value: "0.62 s",
    delta: "cílový limit 0.50 s (v2.8.7)",
  },
  {
    label: "Hashrate (testnet)",
    value: "128 GH/s",
    delta: "+18 % týdně",
  },
  {
    label: "Aktivní uzly",
    value: "86",
    delta: "cílový stav 100+ (Q4 2025)",
  },
];

const BRIDGE_OBJECTIVES = [
  {
    chain: "Solana",
    window: "Q1 2026",
    status: "Blueprint hotový, Anchor prototyp ve vývoji",
    link: "/docs/whitepaper/roadmap",
  },
  {
    chain: "Stellar",
    window: "Q2 2026",
    status: "Humanitarian bridge – API návrh schválen",
    link: "/docs/integration-web33",
  },
  {
    chain: "Cardano",
    window: "Q3 2026",
    status: "Plutus proof-of-concept naplánovaný",
    link: "/docs/legacy",
  },
];

const PIPELINE = [
  {
    version: "2.8.6",
    codename: "Stability",
    focus: "Docker stack, health checks, logging",
    status: "Probíhá QA",
  },
  {
    version: "2.8.7",
    codename: "Performance",
    focus: "RPC cache, DB optimalizace, P2P relay",
    status: "Příprava sprintu",
  },
  {
    version: "2.8.8",
    codename: "Features",
    focus: "WebSocket API, miner analytics, Swagger",
    status: "Backlog připraven",
  },
  {
    version: "2.8.9",
    codename: "Polish",
    focus: "Test coverage 90 %, audit checklist",
    status: "Plánované",
  },
];

export default function DashboardPage() {
  const [mode, setMode] = useState<BackgroundMode>("starfield");
    const [meteorsOn, setMeteorsOn] = useState(false);
    const [bubblesOn, setBubblesOn] = useState(false);
  const [nasaSrc, setNasaSrc] = useState<string | undefined>();
  const [aladinSurvey, setAladinSurvey] = useState("P/AllWISE/color");
  const [aladinTarget, setAladinTarget] = useState("0 0");
  const [aladinFov, setAladinFov] = useState(80);

  const backgroundLayer = useMemo(() => {
    if (mode === "starfield") {
      return <Starfield />;
    }

    if (mode === "nasa") {
      return <NasaBackground src={nasaSrc} />;
    }

    if (mode === "observatory") {
      return (
        <AladinBackground
          survey={aladinSurvey}
          target={aladinTarget}
          fov={aladinFov}
          opacity={0.45}
        />
      );
    }

    return (
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(61,255,173,0.18),rgba(2,6,23,0.95))]" />
    );
  }, [mode, nasaSrc, aladinSurvey, aladinTarget, aladinFov]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(13,240,255,0.12),rgba(2,6,23,0.92))]" />
      {backgroundLayer}
  {meteorsOn && <MeteorShower quality="low" />}
  {bubblesOn && <BubbleOverlay intensity="gentle" />}

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-24 md:px-10 md:pt-28">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">ZION TerraNova • Operations</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Mission Control Dashboard</h1>
            <p className="mt-4 max-w-2xl text-sm text-white/65">
              Sjednocený pohled na roadmapy v2.8.6 → v2.9.0, stav mostů a metriky TestNet 2.8.5.
              Data jsou nyní statická, během v2.8.8 se napojí na živé API a WebSocket streamy.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-matrix-green" /> Build status: `npm run build` ✅
            </span>
            <Link
              href="/docs/integration-web33"
              className="text-xs uppercase tracking-[0.45em] text-matrix-cyan"
            >
              Dokumentace integrace →
            </Link>
          </div>
        </header>

        <section className="mt-16">
          <h2 className="text-lg uppercase tracking-[0.4em] text-white/50">Síťové KPI</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {NETWORK_KPIS.map(({ label, value, delta }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-glow-cyan"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">{label}</p>
                <p className="mt-3 text-2xl font-semibold text-matrix-green">{value}</p>
                <p className="mt-2 text-xs text-white/60">{delta}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow-green">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Roadmap Pipeline 2.8.6 → 2.8.9</h3>
              <Link href="/docs/integration-web33" className="text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                Detailní plán
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {PIPELINE.map(({ version, codename, focus, status }) => (
                <div key={version} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span className="font-semibold text-white">v{version} “{codename}”</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-matrix-green/40 px-3 py-1 text-xs uppercase tracking-[0.35em] text-matrix-green">
                      {status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">{focus}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow-cyan">
            <h3 className="text-xl font-semibold text-white">Cross-Chain mosty</h3>
            <p className="mt-2 text-xs text-white/60">Stavy synchronizované s hlavní roadmapou 2025-2030.</p>
            <ul className="mt-6 space-y-4">
              {BRIDGE_OBJECTIVES.map(({ chain, window, status, link }) => (
                <li key={chain} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-white">
                    <span>{chain}</span>
                    <span className="text-xs uppercase tracking-[0.35em] text-white/50">{window}</span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">{status}</p>
                  <Link href={link} className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                    Více →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow-cyan">
            <h3 className="text-xl font-semibold text-white">Komunitní metriky</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Aktivní těžaři</span>
                <span className="text-matrix-green">312 / 1000 cílových (Q4 2026)</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>DAO hlasování</span>
                <span className="text-matrix-green">7 návrhů v testnetu</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Humanitární fond</span>
                <span className="text-matrix-green">12.4M ZION rezervováno</span>
              </li>
            </ul>
            <Link
              href="/docs/community"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-matrix-cyan"
            >
              Komunitní plán →
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow-green">
            <h3 className="text-xl font-semibold text-white">Sprint Acceleration</h3>
            <p className="mt-2 text-xs text-white/60">
              Shrnutí úkolů, které potřebují souběžnou podporu frontendu, backendu a DevOps během aktuálních sprintů.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Frontend</p>
                <p className="mt-2 text-sm text-white/70">Dokončit real-time komponenty pro WebSocket API (v2.8.8).</p>
                <Link href="/docs/tutorials/first-dapp" className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  Integrace SDK →
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Backend</p>
                <p className="mt-2 text-sm text-white/70">Redis cache &amp; RPC optimalizace – připojit telemetry endpoints.</p>
                <Link href="/docs/api" className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  API roadmapa →
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Security</p>
                <p className="mt-2 text-sm text-white/70">Připravit audit checklist a bug bounty (v2.8.9).</p>
                <Link href="/docs/integration-web33" className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  Audit kroky →
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Community</p>
                <p className="mt-2 text-sm text-white/70">Dokončit onboarding kit a aktualizovat roadmap materiály.</p>
                <Link href="/docs/community" className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-matrix-cyan">
                  Komunitní cíle →
                </Link>
              </div>
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
