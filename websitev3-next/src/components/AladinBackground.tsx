"use client";

import React from "react";
import Script from "next/script";

type Props = {
  survey?: string; // e.g. "P/AllWISE/color", "P/DSS2/color"
  fov?: number; // field of view in degrees
  target?: string; // object name or "ra dec" in degrees
  opacity?: number;
};

export default function AladinBackground({
  survey = "P/AllWISE/color",
  fov = 120,
  target = "0 0",
  opacity = 0.45,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  // Ensure CSS is loaded once
  React.useEffect(() => {
    const id = "aladinlite-css";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.min.css";
      document.head.appendChild(link);
    }
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    type AladinGlobal = { A?: { aladin: (el: HTMLElement, opts: Record<string, unknown>) => unknown } };
    const w = window as unknown as AladinGlobal;
    const A = w.A;
    if (!A || !containerRef.current) return;

    // Clean previous instance if any
    containerRef.current.innerHTML = "";
    A.aladin(containerRef.current, {
      survey,
      fov,
      target,
      // Disable UI chrome
      fullScreen: false,
      showLayersControl: false,
      showCooGrid: false,
      showZoomControl: false,
      showFullscreenControl: false,
      reticle: false,
    });

    // Soft color grading via CSS filter on container
    if (containerRef.current) {
      containerRef.current.style.filter = "saturate(1.1) brightness(0.9)";
    }

    const el = containerRef.current;
    return () => {
      // No explicit destroy API; clearing container is enough
      if (el) el.innerHTML = "";
    };
  }, [ready, survey, fov, target]);

  return (
    <>
      <Script
        src="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.min.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div
        ref={containerRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          opacity,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
