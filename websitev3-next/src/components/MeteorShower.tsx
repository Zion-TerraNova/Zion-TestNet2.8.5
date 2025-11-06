"use client";

import React from "react";

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number; // length in pixels
  width: number;
  life: number; // 0..1
  hue: number;
};

export default function MeteorShower() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    const meteors: Meteor[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      // Spawn from random edge with diagonal trajectory
      const side = Math.random();
      let x = 0, y = 0;
      if (side < 0.5) { // top-left region
        x = -50 + Math.random() * (w * 0.3);
        y = -50;
      } else { // top-right region
        x = w + 50 - Math.random() * (w * 0.3);
        y = -50;
      }
      // Direction towards bottom slightly sideways
      const speed = 4 + Math.random() * 6; // px/frame at 60fps
      const angle = side < 0.5 ? (Math.PI / 2 + Math.PI / 6) : (Math.PI / 2 - Math.PI / 6); // ~60 or ~120 degrees
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const len = 80 + Math.random() * 140;
      const width = 1 + Math.random() * 2.5;
      const hue = 130 + Math.random() * 40; // green-cyan
      meteors.push({ x, y, vx, vy, len, width, life: 1, hue });
    }

    function step() {
      // Fade for trails
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, w, h);

      // Low spawn probability to keep it calm
      if (meteors.length < 20 && Math.random() < 0.08) spawn();

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.003; // slow fade-out

        // Draw meteor as glowing streak
        const tx = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
        const ty = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `hsla(${m.hue}, 100%, 60%, ${0.9 * m.life})`);
        grad.addColorStop(1, `hsla(${m.hue}, 100%, 60%, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // Glow bloom
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${m.hue}, 100%, 60%, ${0.6 * m.life})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.width * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${m.hue}, 100%, 60%, ${0.5 * m.life})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Remove if out of bounds or dead
        if (m.life <= 0 || m.x < -200 || m.x > w + 200 || m.y > h + 200) {
          meteors.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    step();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        opacity: 0.35,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
