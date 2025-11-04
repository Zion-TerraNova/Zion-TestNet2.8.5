"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Starfield = dynamic(() => import("@/components/ThreeStarfield"), {
  ssr: false,
});
const MeteorShower = dynamic(() => import("@/components/MeteorShower"), { ssr: false });
const NasaBackground = dynamic(() => import("@/components/NasaBackground"), { ssr: false });
const AladinBackground = dynamic(() => import("@/components/AladinBackground"), { ssr: false });
const BubbleOverlay = dynamic(() => import("@/components/BubbleOverlay"), { ssr: false });
const ThemePanel = dynamic(() => import("@/components/ThemePanel"), { ssr: false });

export default function Home() {
  // Unified background and effects state to work with ThemePanel
  const [mode, setMode] = React.useState<"starfield" | "nasa" | "observatory" | "zoom">("starfield");
  const [nasaSrc, setNasaSrc] = React.useState<string | undefined>(undefined);
  const [tileSource, setTileSource] = React.useState<string>("https://openseadragon.github.io/example-images/highsmith/highsmith.dzi");
  const [aladinSurvey, setAladinSurvey] = React.useState<string>("P/AllWISE/color");
  const [aladinTarget, setAladinTarget] = React.useState<string>("0 0");
  const [aladinFov, setAladinFov] = React.useState<number>(120);
  const [meteorsOn, setMeteorsOn] = React.useState(true);
  const [bubblesOn, setBubblesOn] = React.useState(true);
  return (
    <div id="top" className="relative min-h-screen overflow-hidden font-sans">
      {/* Cinematic background */}
      {mode === "nasa" && <NasaBackground src={nasaSrc} />}
  {mode === "observatory" && <AladinBackground survey={aladinSurvey} fov={aladinFov} target={aladinTarget} opacity={0.45} />}
      {mode === "zoom" && (
        // Keep homepage simple: we won't render OSD here; use /zoom for deep zoom.
        // Optionally render a placeholder gradient to indicate selection.
        <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(1000px 700px at 50% 40%, rgba(0,255,65,0.06), rgba(0,0,0,0.9))" }} />
      )}
      {mode === "starfield" && <Starfield />}
      {meteorsOn && <MeteorShower />}
      {bubblesOn && <BubbleOverlay />}

      {/* Content */}
  <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex min-h-[60vh] flex-col items-center justify-center text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
            <span className="gradient-matrix neon" style={{ fontFamily: "var(--font-brand)" }}>
              ZION: Consciousness-Based Blockchain
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-zinc-300">
            Matrix × Cyberpunk × Galaktický nádech. Spiritual mining, DAO governance a humanitární mise.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#start"
              className="rounded-full bg-(--matrix-green) px-6 py-3 font-semibold text-black shadow-(--glow-green) transition-transform hover:-translate-y-0.5"
            >
              Začít těžit
            </a>
            <a
              href="#docs"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white/90 backdrop-blur-sm transition-colors hover:border-(--matrix-green)"
            >
              Dokumentace
            </a>
          </div>
        </motion.div>

        {/* Features */}
        <section id="features" className="mt-24 scroll-mt-24">
          <h2 className="text-center text-3xl font-bold tracking-wide">
            <span className="gradient-matrix" style={{ fontFamily: "var(--font-brand)" }}>Revoluční Vlastnosti</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300">Postaveno pro spirituální evoluci a komunitní správu</p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Consciousness Mining","DAO Governance","Humanitarian Focus"].map((title, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-md hover:border-(--matrix-green)"
              >
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {i===0 && "Získejte 1x až 15x odměny podle úrovně vědomí. 9 úrovní od Physical po ON_THE_STAR."}
                  {i===1 && "20letý přechod od spirituálního vedení k plně komunitní správě. Hlasování o změnách protokolu."}
                  {i===2 && "10 % všech blokových odměn jde na vzdělání dětí, zdravotní péči a globální dobro."}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quickstart */}
        <section id="start" className="mt-28 scroll-mt-24">
          <h2 className="text-center text-3xl font-bold tracking-wide">
            <span className="gradient-matrix" style={{ fontFamily: "var(--font-brand)" }}>Začněte do 5 minut</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {n:1,t:"Stáhnout klienta",d:"Zvolte platformu a stáhněte poslední verzi.",c:"Releases"},
              {n:2,t:"Nastavit node",d:"Vytvořte peněženku a připojte se na TestNet.",c:"Průvodce"},
              {n:3,t:"Spustit mining",d:"Vyberte algoritmus a začněte těžit.",c:"Mining guide"},
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-md"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--matrix-green) font-bold text-black shadow-(--glow-green)">{s.n}</div>
                <h3 className="text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.d}</p>
                <div className="mt-3 text-sm">
                  <a href="#" className="text-white/90 underline decoration-white/20 underline-offset-4 hover:text-white">{s.c} →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section id="community" className="mt-28 scroll-mt-24">
          <h2 className="text-center text-3xl font-bold tracking-wide">
            <span className="gradient-matrix" style={{ fontFamily: "var(--font-brand)" }}>Připojte se ke Komunitě</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="https://github.com/Zion-TerraNova" target="_blank" className="rounded-full bg-(--matrix-green) px-5 py-3 font-semibold text-black shadow-(--glow-green) hover:-translate-y-0.5 transition-transform">GitHub</a>
            <a href="#" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white/90 hover:border-(--matrix-green)">Discord</a>
            <a href="#" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white/90 hover:border-(--matrix-green)">Telegram</a>
            <a href="#" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white/90 hover:border-(--matrix-green)">Wiki</a>
          </div>
        </section>
      </main>

      {/* Unified THEME panel */}
      <ThemePanel
        mode={mode}
        setMode={setMode}
        meteorsOn={meteorsOn}
        setMeteorsOn={setMeteorsOn}
        bubblesOn={bubblesOn}
        setBubblesOn={setBubblesOn}
        nasaSrc={nasaSrc}
        setNasaSrc={setNasaSrc}
        tileSource={tileSource}
        setTileSource={setTileSource}
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
