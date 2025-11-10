"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import {
  Star,
  Image as ImageIcon,
  Telescope,
  Sparkle,
  CloudMoon,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
} from "lucide-react";
import clsx from "clsx";
import { useThemeLang } from "@/context/ThemeLangContext";

export type BackgroundMode = "starfield" | "nasa" | "observatory" | "void";

interface ThemePanelProps {
  mode: BackgroundMode;
  setMode: Dispatch<SetStateAction<BackgroundMode>>;
  meteorsOn: boolean;
  setMeteorsOn: Dispatch<SetStateAction<boolean>>;
  bubblesOn: boolean;
  setBubblesOn: Dispatch<SetStateAction<boolean>>;
  nasaSrc?: string;
  setNasaSrc: Dispatch<SetStateAction<string | undefined>>;
  aladinSurvey: string;
  setAladinSurvey: Dispatch<SetStateAction<string>>;
  aladinTarget: string;
  setAladinTarget: Dispatch<SetStateAction<string>>;
  aladinFov: number;
  setAladinFov: Dispatch<SetStateAction<number>>;
}

const MODES: Array<{ id: BackgroundMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "starfield", label: "Starfield", icon: Star },
  { id: "nasa", label: "NASA", icon: ImageIcon },
  { id: "observatory", label: "Observatory", icon: Telescope },
  { id: "void", label: "Void", icon: CloudMoon },
];

export default function ThemePanel({
  mode,
  setMode,
  meteorsOn,
  setMeteorsOn,
  bubblesOn,
  setBubblesOn,
  nasaSrc,
  setNasaSrc,
  aladinSurvey,
  setAladinSurvey,
  aladinTarget,
  setAladinTarget,
  aladinFov,
  setAladinFov,
}: ThemePanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const { theme, setTheme, lang, setLang } = useThemeLang();

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="pointer-events-auto fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/70 shadow-glow-cyan backdrop-blur transition hover:border-matrix-cyan/60 hover:text-white"
        aria-label="Otevřít ovládání vzhledu"
      >
        <Sparkle className="h-4 w-4 text-matrix-cyan" />
        Theme
      </button>
    );
  }

  return (
    <aside
      className={clsx(
        "pointer-events-auto fixed bottom-6 right-6 z-30 text-white shadow-glow-cyan backdrop-blur transition-all duration-300",
        collapsed
          ? "w-56 rounded-2xl border border-white/10 bg-black/60 p-4"
          : "w-96 rounded-2xl border border-white/10 bg-black/70 p-6"
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkle className="h-4 w-4 text-matrix-cyan" />
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Theme</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 transition hover:border-matrix-cyan/60 hover:text-white"
            aria-label={collapsed ? "Otevřít panel" : "Skrýt panel"}
          >
            {collapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMinimized(true)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 transition hover:border-matrix-cyan/60 hover:text-white"
            aria-label="Minimalizovat panel"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>
      </div>

      {collapsed ? (
        <div className="flex flex-wrap gap-2 text-xs text-white/60">
          <button
            type="button"
            onClick={() => setMode("starfield")}
            className={clsx(
              "rounded-full border px-3 py-1",
              mode === "starfield" ? "border-matrix-green/70 text-matrix-green" : "border-white/15"
            )}
          >
            Starfield
          </button>
          <button
            type="button"
            onClick={() => setMode("nasa")}
            className={clsx(
              "rounded-full border px-3 py-1",
              mode === "nasa" ? "border-matrix-green/70 text-matrix-green" : "border-white/15"
            )}
          >
            NASA
          </button>
          <button
            type="button"
            onClick={() => setMode("observatory")}
            className={clsx(
              "rounded-full border px-3 py-1",
              mode === "observatory" ? "border-matrix-green/70 text-matrix-green" : "border-white/15"
            )}
          >
            Observatory
          </button>
          <button
            type="button"
            onClick={() => setMode("void")}
            className={clsx(
              "rounded-full border px-3 py-1",
              mode === "void" ? "border-matrix-green/70 text-matrix-green" : "border-white/15"
            )}
          >
            Void
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
        {MODES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={clsx(
              "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition", 
              mode === id
                ? "border-matrix-green/80 bg-matrix-green/10 text-matrix-green"
                : "border-white/10 text-white/70 hover:border-white/30"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3 text-sm">
        {/* Theme mode */}
        <label className="flex items-center justify-between gap-3">
          <span>Téma</span>
          <div className="inline-flex overflow-hidden rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={clsx(
                "px-3 py-1 text-xs",
                theme === "light" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/5"
              )}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={clsx(
                "px-3 py-1 text-xs",
                theme === "dark" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/5"
              )}
            >
              Dark
            </button>
          </div>
        </label>

        {/* Language */}
        <label className="flex items-center justify-between gap-3">
          <span>Jazyk</span>
          <div className="inline-flex overflow-hidden rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setLang("cs")}
              className={clsx(
                "px-3 py-1 text-xs",
                lang === "cs" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/5"
              )}
            >
              CZ
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={clsx(
                "px-3 py-1 text-xs",
                lang === "en" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/5"
              )}
            >
              EN
            </button>
          </div>
        </label>

        <label className="flex items-center justify-between gap-3">
          <span>Meteors</span>
          <button
            type="button"
            onClick={() => setMeteorsOn((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs"
          >
            {meteorsOn ? <ToggleRight className="h-4 w-4 text-matrix-green" /> : <ToggleLeft className="h-4 w-4 text-white/40" />}
            {meteorsOn ? "On" : "Off"}
          </button>
        </label>

        <label className="flex items-center justify-between gap-3">
          <span>Bubbles</span>
          <button
            type="button"
            onClick={() => setBubblesOn((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs"
          >
            {bubblesOn ? <ToggleRight className="h-4 w-4 text-matrix-green" /> : <ToggleLeft className="h-4 w-4 text-white/40" />}
            {bubblesOn ? "On" : "Off"}
          </button>
        </label>

        {mode === "nasa" && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/50">NASA Image URL</label>
            <input
              type="url"
              inputMode="url"
              placeholder="https://..."
              value={nasaSrc ?? ""}
              onChange={(event) => {
                const value = event.target.value.trim();
                setNasaSrc(value.length > 0 ? value : undefined);
              }}
              className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-matrix-cyan/60 focus:outline-none"
            />
          </div>
        )}

        {mode === "observatory" && (
          <div className="space-y-3">
            <div>
              <label className="text-xs uppercase tracking-widest text-white/50">Survey</label>
              <input
                type="text"
                value={aladinSurvey}
                onChange={(event) => setAladinSurvey(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm focus:border-matrix-cyan/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/50">Target</label>
              <input
                type="text"
                value={aladinTarget}
                onChange={(event) => setAladinTarget(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm focus:border-matrix-cyan/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/50">Field of View (°)</label>
              <input
                type="number"
                min={1}
                max={360}
                step={1}
                value={aladinFov}
                onChange={(event) => setAladinFov(Number.parseInt(event.target.value, 10) || 0)}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm focus:border-matrix-cyan/60 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
        </>
      )}
    </aside>
  );
}
