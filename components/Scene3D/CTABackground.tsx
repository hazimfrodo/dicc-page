"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveParticles() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    const positions = ref.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      positions.setY(
        i,
        positions.getY(i) + Math.sin(t * 0.5 + x * 0.3) * 0.001
      );
    }
    positions.needsUpdate = true;
    ref.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#FFFFFF"
        transparent
        opacity={0.15}
        sizeAttenuation
      />
    </points>
  );
}

export default function CTABackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <WaveParticles />
      </Canvas>
    </div>
  );
}
