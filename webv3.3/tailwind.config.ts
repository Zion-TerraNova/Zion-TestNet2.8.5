import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,md,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "matrix-green": "#00ff41",
        "matrix-cyan": "#0df0ff",
        "matrix-amber": "#ffb347",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        orbitron: ["var(--font-orbitron)", "var(--font-geist-sans)", "sans-serif"],
        brand: ["var(--font-orbitron)", "var(--font-geist-sans)", "sans-serif"],
      },
      boxShadow: {
        "glow-green": "0 0 30px rgba(0, 255, 65, 0.5)",
        "glow-cyan": "0 0 30px rgba(13, 240, 255, 0.4)",
      },
      backgroundImage: {
        "matrix-grid": "radial-gradient(circle at top, rgba(0, 255, 65, 0.25), transparent 60%), radial-gradient(circle at bottom, rgba(13, 240, 255, 0.2), transparent 65%)",
      },
      keyframes: {
        "matrix-fall": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "float": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -6px, 0)" },
        },
      },
      animation: {
        "matrix-fall": "matrix-fall 12s linear infinite",
        float: "float 10s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
