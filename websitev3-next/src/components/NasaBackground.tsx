"use client";

import React from "react";

export default function NasaBackground({ src, opacity = 0.25 }: { src?: string; opacity?: number }) {
  // This renders a fixed full-bleed background image behind the 3D canvas.
  // Place an appropriately licensed NASA image in public/nasa-sky.jpg to activate.
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        // Gradient fallback and optional image layer when src provided
        background: src
          ? `radial-gradient(1200px 800px at 50% 40%, rgba(0,255,65,0.08), rgba(0,0,0,0.85)), url(${src})`
          : `radial-gradient(1200px 800px at 50% 40%, rgba(0,255,65,0.08), rgba(0,0,0,0.85))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity,
        filter: "saturate(1.2) brightness(0.9)",
        pointerEvents: "none",
      }}
    />
  );
}
