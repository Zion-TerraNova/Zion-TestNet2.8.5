"use client";

import React from "react";
import Script from "next/script";

interface OSDViewer {
  destroy(): void;
  addHandler(ev: string, cb: () => void): void;
  viewport: { goHome: (immediately?: boolean) => void };
}

type Props = {
  tileSource?: string; // DZI or IIIF
  opacity?: number;
};

export default function OSDBackground({ tileSource = "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi", opacity = 0.35 }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!ready || !el) return;
    const OpenSeadragon = (window as unknown as Record<string, unknown>).OpenSeadragon as
      | ((opts: unknown) => OSDViewer)
      | undefined;
    if (!OpenSeadragon) return;
    // Clear any previous
    el.innerHTML = "";
  const viewer = OpenSeadragon({
      element: el,
      tileSources: tileSource,
      prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
      showNavigator: false,
      showNavigationControl: false,
      // Keep static (non-interactive background)
      gestureSettingsMouse: { clickToZoom: false, dblClickToZoom: false, flickEnabled: false },
      zoomPerClick: 1.0,
      springStiffness: 6.0,
    });
    // Center and fit
    viewer.addHandler("open", () => {
      viewer.viewport.goHome(true);
    });
    return () => {
      try { viewer.destroy(); } catch {}
      el.innerHTML = "";
    };
  }, [ready, tileSource]);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/openseadragon.min.js" strategy="afterInteractive" onReady={() => setReady(true)} />
      <div ref={ref} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, opacity, pointerEvents: "none" }} />
    </>
  );
}
