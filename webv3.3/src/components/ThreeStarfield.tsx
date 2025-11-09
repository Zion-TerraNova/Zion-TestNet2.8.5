"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function StarPoints() {
  const ref = useRef<THREE.Points>(null);
  const [starGeometry] = useState(() => {
  const geometry = new THREE.BufferGeometry();
  const starCount = 3200;
    const positions = new Float32Array(starCount * 3);
    const random = () => Math.random() - 0.5;

    for (let i = 0; i < starCount * 3; i += 3) {
  positions[i] = random() * 1200;
  positions[i + 1] = random() * 600;
  positions[i + 2] = random() * 1200;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  });

  const [starMaterial] = useState(() =>
    new THREE.PointsMaterial({
  color: new THREE.Color(0.05, 0.95, 0.6),
  size: 1.35,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    })
  );

  useFrame((_state, delta) => {
    if (!ref.current) return;
  ref.current.rotation.y += delta * 0.015;
  ref.current.rotation.x += delta * 0.005;
  });

  return <points ref={ref} geometry={starGeometry} material={starMaterial} />;
}

export default function ThreeStarfield() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 120], fov: 75 }}
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <StarPoints />
    </Canvas>
  );
}
