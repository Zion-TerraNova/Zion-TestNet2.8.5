"use client";

import React from "react";

type Bubble = {
  x: number; y: number; r: number; vx: number; vy: number; a: number;
};

export default function BubbleOverlay({ density = 50 }: { density?: number }) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const mouse = React.useRef<{x:number;y:number;active:boolean}>({ x: 0, y: 0, active: false });

  React.useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, dpr = 1, raf = 0;
    const bubbles: Bubble[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!bubbles.length) {
        for (let i = 0; i < density; i++) {
          const r = 8 + Math.random() * 28;
          bubbles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            a: 0.35 + Math.random() * 0.4,
          });
        }
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (const b of bubbles) {
        // Mouse repulsion
        if (mouse.current.active) {
          const dx = b.x - mouse.current.x * w;
          const dy = b.y - mouse.current.y * h;
          const dist2 = dx*dx + dy*dy;
          const rad = (120 + b.r) * (120 + b.r);
          if (dist2 < rad) {
            const d = Math.sqrt(dist2) || 1;
            b.vx += (dx / d) * 0.08;
            b.vy += (dy / d) * 0.08;
          }
        }
        // Move and damp
        b.x += b.vx; b.y += b.vy;
        b.vx *= 0.995; b.vy *= 0.995;
        // Wrap
        if (b.x < -50) b.x = w + 50; if (b.x > w + 50) b.x = -50;
        if (b.y < -50) b.y = h + 50; if (b.y > h + 50) b.y = -50;

        // Draw glow circle
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.6);
        grad.addColorStop(0, `rgba(0,255,200,${0.25 * b.a})`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 1.6, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = `rgba(0,255,200,${0.06 * b.a})`;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }

    resize(); step();
    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX / w; mouse.current.y = e.clientY / h; mouse.current.active = true; };
    const onLeave = () => { mouse.current.active = false; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 2, pointerEvents: "none", mixBlendMode: "screen" }}
    />
  );
}
