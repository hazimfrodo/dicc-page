"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveParticles() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const NAVY = new THREE.Color("#061a3a");
    const GOLD = new THREE.Color("#C8A951");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;

      const color = Math.random() > 0.7 ? GOLD : NAVY;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    const positions = ref.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      positions.setY(
        i,
        positions.getY(i) + Math.sin(t * 0.4 + x * 0.2) * 0.002
      );
    }
    positions.needsUpdate = true;
    ref.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function CTABackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.1} />
        <WaveParticles />
      </Canvas>
    </div>
  );
}
