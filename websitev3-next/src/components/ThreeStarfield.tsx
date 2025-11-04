"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Stars({ count = 4000, mouse }: { count?: number; mouse?: React.MutableRefObject<{x:number;y:number}> }) {
  const ref = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  // Positions in a sphere-ish distribution
  const positions = useMemo(() => {
    const rand = mulberry32(count);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 80 * Math.sqrt(rand());
      const theta = rand() * 2 * Math.PI;
      const phi = Math.acos(2 * rand() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
      ref.current.rotation.x += delta * 0.003;
    }
    if (group.current && mouse) {
      const targetX = (mouse.current.y - 0.5) * 0.1;
      const targetY = (mouse.current.x - 0.5) * -0.15;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={group}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          size={0.03}
          sizeAttenuation
          color={"#b3fff5"}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeStarfield() {
  const mouse = React.useRef({ x: 0.5, y: 0.5 });
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <MilkyWayBand mouse={mouse} />
        <Stars mouse={mouse} />
      </Canvas>
    </div>
  );
}

// Animated Milky Way band without external textures
function MilkyWayBand({ count = 12000, bandWidthDeg = 18, mouse }: { count?: number; bandWidthDeg?: number; mouse?: React.MutableRefObject<{x:number;y:number}> }) {
  const ref = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(count * 7 + 42);
    const arr = new Float32Array(count * 3);
    // band around equator (y ~ 0). latitude in [-bw, bw]
    const bw = (bandWidthDeg * Math.PI) / 180;
    for (let i = 0; i < count; i++) {
      const lat = (rand() * 2 - 1) * bw; // [-bw, bw]
      const lon = rand() * Math.PI * 2; // [0, 2pi]
      // radius with slight jitter to get depth/thickness
      const r = 70 + (rand() - 0.5) * 12; // ~70±6
      const x = r * Math.cos(lat) * Math.cos(lon);
      const y = r * Math.sin(lat) * 0.6; // squash to keep band thin
      const z = r * Math.cos(lat) * Math.sin(lon);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count, bandWidthDeg]);

  const colors = useMemo(() => {
    // per-vertex color tint across the band (green/cyan/magenta mix)
    const rand = mulberry32(count * 11 + 7);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = rand();
      // blend matrix-green (#00ff41), cyan (#00eaff), magenta (#ff2dfb)
      let r = 0, g = 0, b = 0;
      if (t < 0.34) { r = 0; g = 1; b = 0.25; } // greenish
      else if (t < 0.67) { r = 0; g = 0.92; b = 1; } // cyan
      else { r = 1; g = 0.18; b = 0.98; } // magenta
      // soften intensity
      const k = 0.75 + rand() * 0.25;
      col[i * 3 + 0] = r * k;
      col[i * 3 + 1] = g * k;
      col[i * 3 + 2] = b * k;
    }
    return col;
  }, [count]);

  useFrame((_state, delta) => {
    if (ref.current) {
      // slow majestic rotation
      ref.current.rotation.y += delta * 0.006;
      ref.current.rotation.x += delta * 0.0015;
    }
    if (group.current && mouse) {
      const targetX = (mouse.current.y - 0.5) * 0.08;
      const targetY = (mouse.current.x - 0.5) * -0.12;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={group}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled>
        <PointMaterial
          transparent
          size={0.035}
          vertexColors
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
