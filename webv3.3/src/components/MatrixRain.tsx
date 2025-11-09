"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return; // Respect accessibility preference.

    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let raf = 0;

    const fontSize = 16;
    const speed = 0.18;
    const characters = "ZION0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const char = characters[(Math.random() * characters.length) | 0];
        const x = i * fontSize + 4;
        const y = drops[i] * fontSize;
        ctx.fillStyle = "#00ff41";
        ctx.shadowColor = "rgba(0,255,65,0.6)";
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speed;
      }

      raf = requestAnimationFrame(draw);
    };

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
      ref={canvasRef}
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
