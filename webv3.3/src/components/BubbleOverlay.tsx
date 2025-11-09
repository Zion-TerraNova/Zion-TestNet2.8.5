"use client";

import { useMemo } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}

type Intensity = "gentle" | "normal";

const CONFIG = {
  gentle: {
    count: 14,
    sizeMin: 80,
    sizeMax: 180,
    durationMin: 22,
    durationMax: 34,
    opacityStops: [0, 0.35, 0.25, 0],
    blur: "blur-xl",
  },
  normal: {
    count: 28,
    sizeMin: 140,
    sizeMax: 260,
    durationMin: 16,
    durationMax: 26,
    opacityStops: [0, 0.5, 0.35, 0],
    blur: "blur-2xl",
  },
} as const;

interface BubbleOverlayProps {
  intensity?: Intensity;
}

export default function BubbleOverlay({ intensity = "gentle" }: BubbleOverlayProps) {
  const bubbles = useMemo<Bubble[]>(() => {
    const cfg = CONFIG[intensity];
    const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const count = prefersReduced ? 0 : Math.round(cfg.count / dpr);

    const fract = (x: number) => x - Math.floor(x);
    const prng = (seed: number) => fract(Math.sin(seed * 127.1 + 311.7) * 43758.5453);

    const list: Bubble[] = [];
    for (let i = 0; i < count; i += 1) {
      const r1 = prng(i + 1);
      const r2 = prng(i + 2.123);
      const r3 = prng(i + 3.456);
      const size = cfg.sizeMin + r1 * (cfg.sizeMax - cfg.sizeMin);
      list.push({
        id: i,
        size,
        left: r2 * 100,
        duration: cfg.durationMin + r3 * (cfg.durationMax - cfg.durationMin),
        delay: prng(i + 4.789) * 14,
      });
    }
    return list;
  }, [intensity]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-5 overflow-hidden">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className={`absolute bottom-[-200px] block rounded-full bg-gradient-to-tr from-matrix-green/30 via-matrix-cyan/20 to-transparent mix-blend-screen ${CONFIG[intensity].blur}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animation: `bubble-rise ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes bubble-rise {
          0% {
            opacity: ${CONFIG[intensity].opacityStops[0]};
            transform: translate3d(0, 40px, 0) scale(0.85);
          }
          25% {
            opacity: ${CONFIG[intensity].opacityStops[1]};
          }
          50% {
            opacity: ${CONFIG[intensity].opacityStops[2]};
          }
          100% {
            opacity: ${CONFIG[intensity].opacityStops[3]};
            transform: translate3d(0, -140vh, 0) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
