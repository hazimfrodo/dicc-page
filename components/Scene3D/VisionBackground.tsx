"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = performance.now() / 1000;
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.x = t * 0.08 * (i + 1) * (i % 2 === 0 ? 1 : -1);
      ring.rotation.y = t * 0.06 * (i + 1);
      const mat = ring.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.06 + Math.sin(t * 0.3 + i) * 0.03;
    });
  });

  return (
    <group ref={groupRef}>
      {[1.8, 2.4, 3.0].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el; }}
          rotation={[Math.PI * 0.3 * i, 0, 0]}
        >
          <torusGeometry args={[radius, 0.005, 8, 64]} />
          <meshStandardMaterial
            color="#7360ff"
            emissive="#7360ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function VisionBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.2} />
        <OrbitalRings />
      </Canvas>
    </div>
  );
}
