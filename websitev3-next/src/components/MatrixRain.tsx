"use client";

import React from "react";

export default function MatrixRain() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    const cEl = ref.current! as HTMLCanvasElement;
    const ctx = cEl.getContext("2d")! as CanvasRenderingContext2D;

    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    const fontSize = 16;
    // Significantly slower rain speed (rows per frame). Default was 1; now ~0.18 for ~3px/frame at 60fps.
    const SPEED = 0.18;
    const chars = "ZION0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let columns = 0;
    let drops: number[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cEl.width = Math.floor(w * dpr);
      cEl.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(w / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    }

    function draw() {
      // Lighter fade to retain longer trails with slower speed
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < columns; i++) {
        const text = chars[(Math.random() * chars.length) | 0];
        const x = i * fontSize + 4;
        const y = drops[i] * fontSize;
  ctx.fillStyle = "#00ff41";
  ctx.shadowColor = "rgba(0,255,65,0.6)";
  ctx.shadowBlur = 8;
  ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += SPEED;
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
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
        zIndex: 1,
        opacity: 0.08,
        pointerEvents: "none",
      }}
    />
  );
}
