"use client";

import { useMemo } from "react";

type Meteor = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
};

type Quality = "auto" | "high" | "low";

const BASE_COUNT = 28;

interface MeteorShowerProps {
  quality?: Quality;
}

export default function MeteorShower({ quality = "auto" }: MeteorShowerProps) {
  const meteors = useMemo<Meteor[]>(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    let count = BASE_COUNT;
    if (quality === "low" || prefersReduced) count = Math.round(BASE_COUNT * 0.25);
    else if (quality === "high") count = Math.round(BASE_COUNT * 1.5);
    else count = Math.round((BASE_COUNT / dpr) * (isMobile ? 0.75 : 1));

    const fract = (x: number) => x - Math.floor(x);
    const prng = (seed: number) => fract(Math.sin(seed * 157.31 + 93.7) * 43758.5453);

    const list: Meteor[] = [];
    for (let i = 0; i < count; i += 1) {
      const r1 = prng(i + 0.5);
      const r2 = prng(i + 1.5);
      const r3 = prng(i + 2.5);
      list.push({
        id: i,
        top: r1 * 100,
        left: r2 * 100,
        delay: r3 * 8,
        duration: 2.6 + prng(i + 3.5) * 2.2,
      });
    }
    return list;
  }, [quality]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {meteors.map((meteor, idx) => (
        <span
          key={meteor.id}
          className="absolute h-px w-40 bg-linear-to-r from-transparent via-cyan-300/90 to-transparent"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animation: `meteor-shower-${idx % 3} ${meteor.duration}s linear ${meteor.delay}s infinite`,
            transform: `rotate(-${18 + (idx % 5)}deg)`,
            filter: "drop-shadow(0 0 8px rgba(34,211,238,0.45))",
            opacity: 0.9,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes meteor-shower-0 {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(-240px, 200px, 0);
          }
        }
        @keyframes meteor-shower-1 {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          25% { opacity: 1; }
          100% { opacity: 0; transform: translate3d(-200px, 240px, 0); }
        }
        @keyframes meteor-shower-2 {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          35% { opacity: 1; }
          100% { opacity: 0; transform: translate3d(-260px, 220px, 0); }
        }
      `}</style>
    </div>
  );
}
