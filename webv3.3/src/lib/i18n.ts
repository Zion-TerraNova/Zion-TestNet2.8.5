export type DictSection = {
  docs: string;
  dashboard: string;
  github: string;
};

export type Dictionary = Record<"cs" | "en", DictSection>;

export const DICT: Dictionary = {
  cs: {
    docs: "Dokumentace",
    dashboard: "Dashboard",
    github: "GitHub",
  },
  en: {
    docs: "Docs",
    dashboard: "Dashboard",
    github: "GitHub",
  },
};
