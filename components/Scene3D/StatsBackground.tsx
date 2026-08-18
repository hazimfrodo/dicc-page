"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingDots() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.06} color="#C8A951" transparent opacity={0.12} sizeAttenuation />
    </points>
  );
}

export default function StatsBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <FloatingDots />
      </Canvas>
    </div>
  );
}
