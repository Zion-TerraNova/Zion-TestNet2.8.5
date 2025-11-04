"use client";

import React from "react";
import dynamic from "next/dynamic";

const NasaGallery = dynamic(() => import("@/components/NasaGallery"), { ssr: false });

export type BackgroundMode = "starfield" | "nasa" | "observatory" | "zoom";

type Props = {
  mode: BackgroundMode;
  setMode: (m: BackgroundMode) => void;
  meteorsOn: boolean;
  setMeteorsOn: (v: boolean) => void;
  bubblesOn: boolean;
  setBubblesOn: (v: boolean) => void;
  nasaSrc?: string;
  setNasaSrc: (url?: string) => void;
  tileSource?: string;
  setTileSource: (url: string) => void;
  aladinSurvey: string;
  setAladinSurvey: (s: string) => void;
  aladinTarget: string;
  setAladinTarget: (t: string) => void;
  aladinFov: number;
  setAladinFov: (n: number) => void;
};

const PRESETS = ["Matrix", "Cyberpunk", "Galaxy", "NASA Hero", "Zoom Demo"] as const;
type PresetName = typeof PRESETS[number];

export default function ThemePanel({ mode, setMode, meteorsOn, setMeteorsOn, bubblesOn, setBubblesOn, nasaSrc, setNasaSrc, tileSource = "", setTileSource, aladinSurvey, setAladinSurvey, aladinTarget, setAladinTarget, aladinFov, setAladinFov }: Props) {
  const [open, setOpen] = React.useState(false);
  const [showGallery, setShowGallery] = React.useState(false);
  const [loadingNasa, setLoadingNasa] = React.useState(false);

  // Fetch a default NASA image when switching into NASA mode without a src
  React.useEffect(() => {
    (async () => {
      if (!open) return; // fetch lazily when panel is open for clarity
      if (mode === "nasa" && !nasaSrc && !loadingNasa) {
        try {
          setLoadingNasa(true);
          const res = await fetch("/api/nasa/milkyway");
          const json = await res.json();
          const first = json?.items?.[0]?.full || json?.items?.[0]?.preview;
          if (first) setNasaSrc(first);
        } catch {
          // ignore
        } finally {
          setLoadingNasa(false);
        }
      }
    })();
  }, [mode, open, nasaSrc, loadingNasa, setNasaSrc]);

  function applyPreset(name: PresetName) {
    if (name === "Matrix") {
      setMode("starfield");
      setMeteorsOn(false);
      setBubblesOn(true);
    } else if (name === "Cyberpunk") {
      setMode("starfield");
      setMeteorsOn(true);
      setBubblesOn(false);
    } else if (name === "Galaxy") {
      setMode("observatory");
      setAladinSurvey("P/AllWISE/color");
      setAladinTarget("0 0");
      setAladinFov(90);
      setMeteorsOn(false);
      setBubblesOn(false);
    } else if (name === "NASA Hero") {
      setMode("nasa");
      // Trigger load if missing (effect will fetch lazily when panel open)
      if (!nasaSrc && !loadingNasa) {
        (async () => {
          try {
            setLoadingNasa(true);
            const res = await fetch("/api/nasa/milkyway");
            const json = await res.json();
            const first = json?.items?.[0]?.full || json?.items?.[0]?.preview;
            if (first) setNasaSrc(first);
          } catch {
            /* ignore */
          } finally {
            setLoadingNasa(false);
          }
        })();
      }
      setMeteorsOn(false);
      setBubblesOn(false);
    } else if (name === "Zoom Demo") {
      setMode("zoom");
      setMeteorsOn(false);
      setBubblesOn(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-20">
      <button
        onClick={() => setOpen(v => !v)}
        className="rounded-full bg-(--matrix-green) px-4 py-2 font-semibold text-black shadow-(--glow-green) hover:-translate-y-0.5 transition-transform"
        aria-expanded={open}
        aria-controls="theme-panel"
      >
        THEME
      </button>

      {open && (
        <div id="theme-panel" className="mt-3 w-[380px] rounded-xl border border-white/10 bg-black/70 p-3 backdrop-blur-md shadow-[0_2px_24px_rgba(0,255,65,0.12)]">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold text-white/80">Background & Effects</div>
            <button onClick={() => setOpen(false)} className="text-xs text-white/60 hover:text-white">Zavřít</button>
          </div>

          {/* Presets */}
          <div className="mb-3">
            <div className="mb-1 text-xs font-semibold text-white/70">Presety</div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => applyPreset(p)}
                  className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white/80 hover:border-(--matrix-green)"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Background mode */}
          <div className="mb-3">
            <div className="mb-1 text-xs font-semibold text-white/70">Režim pozadí</div>
            <div className="flex flex-wrap gap-2">
              {([
                { key: "starfield", label: "Starfield" },
                { key: "nasa", label: "NASA" },
                { key: "observatory", label: "Observatoř" },
                { key: "zoom", label: "Zoom (OSD)" },
              ] as Array<{ key: BackgroundMode; label: string }>).map(m => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    mode === m.key ? "bg-(--matrix-green) text-black shadow-(--glow-green)" : "border border-white/15 text-white/80"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* NASA controls */}
          {mode === "nasa" && (
            <div className="mb-3">
              <div className="mb-1 flex items-center justify-between">
                <div className="text-xs font-semibold text-white/70">NASA Milky Way</div>
                <button onClick={() => setShowGallery(v => !v)} className="text-xs text-white/60 hover:text-white">{showGallery ? "Skrýt galerii" : "Galerie"}</button>
              </div>
              {loadingNasa && <div className="text-xs text-white/60">Načítám…</div>}
              {showGallery && <NasaGallery onSelect={(url) => { setNasaSrc(url); }} />}
              {!nasaSrc && <div className="mt-1 text-xs text-white/50">Tip: pokud API nic nevrátí, uvidíš gradient fallback.</div>}
            </div>
          )}

          {/* Zoom (OSD) controls */}
          {mode === "zoom" && (
            <div className="mb-3">
              <div className="mb-1 text-xs font-semibold text-white/70">DZI / IIIF URL</div>
              <input
                className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1 text-sm text-white/90"
                value={tileSource}
                onChange={(e) => setTileSource(e.target.value)}
                placeholder="https://…/image.dzi"
              />
            </div>
          )}

          {/* Observatory (Aladin) controls */}
          {mode === "observatory" && (
            <div className="mb-3 space-y-2">
              <div>
                <div className="mb-1 text-xs font-semibold text-white/70">Survey</div>
                <select
                  className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1 text-sm text-white/90"
                  value={aladinSurvey}
                  onChange={(e) => setAladinSurvey(e.target.value)}
                >
                  <option value="P/AllWISE/color">AllWISE (IR, color)</option>
                  <option value="P/DSS2/color">DSS2 (optical, color)</option>
                  <option value="P/2MASS/color">2MASS (IR, color)</option>
                  <option value="P/GALEXGR6/AIS/color">GALEX (UV, color)</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold text-white/70">Cíl (objekt nebo RA Dec)</div>
                <input
                  className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1 text-sm text-white/90"
                  value={aladinTarget}
                  onChange={(e) => setAladinTarget(e.target.value)}
                  placeholder="např. Orion Nebula, Andromeda, Sgr A*, 83.8221 -5.3911"
                />
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {["Orion Nebula","Andromeda","Sagittarius A*","Pleiades"].map((t) => (
                    <button key={t} onClick={() => setAladinTarget(t)} className="rounded-md border border-white/15 px-2 py-1 text-white/70 hover:border-(--matrix-green)">{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/70">FOV: {Math.round(aladinFov)}°</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={180}
                  step={1}
                  value={aladinFov}
                  onChange={(e) => setAladinFov(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Effects */}
          <div className="mb-1 text-xs font-semibold text-white/70">Efekty</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMeteorsOn(!meteorsOn)}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                meteorsOn ? "bg-(--matrix-green) text-black shadow-(--glow-green)" : "border border-white/15 text-white/80"
              }`}
            >
              Meteory {meteorsOn ? "On" : "Off"}
            </button>
            <button
              onClick={() => setBubblesOn(!bubblesOn)}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                bubblesOn ? "bg-cyan-400/80 text-black shadow-[0_0_16px_rgba(0,255,255,0.35)]" : "border border-white/15 text-white/80"
              }`}
            >
              Bubbles {bubblesOn ? "On" : "Off"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
