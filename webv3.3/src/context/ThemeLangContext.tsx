"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";
export type LangCode = "cs" | "en";

interface ThemeLangState {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

const ThemeLangContext = createContext<ThemeLangState | null>(null);

const THEME_KEY = "zion-theme";
const LANG_KEY = "zion-lang";

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeLangProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    const fromStorage = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return fromStorage ?? getSystemTheme();
  });
  const [lang, setLangState] = useState<LangCode>(() => {
    if (typeof window === "undefined") return "cs";
    const fromStorage = window.localStorage.getItem(LANG_KEY) as LangCode | null;
    return fromStorage ?? (navigator.language?.startsWith("cs") ? "cs" : "en");
  });

  // Apply to <html> attributes and persist
  useEffect(() => {
    try {
      document.documentElement.dataset.theme = theme;
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang]);

  const value = useMemo<ThemeLangState>(
    () => ({
      theme,
      setTheme: (mode: ThemeMode) => setThemeState(mode),
      lang,
      setLang: (l: LangCode) => setLangState(l),
    }),
    [theme, lang]
  );

  return <ThemeLangContext.Provider value={value}>{children}</ThemeLangContext.Provider>;
}

export function useThemeLang() {
  const ctx = useContext(ThemeLangContext);
  if (!ctx) throw new Error("useThemeLang must be used within ThemeLangProvider");
  return ctx;
}
