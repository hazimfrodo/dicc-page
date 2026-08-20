"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NetworkDots() {
  const ref = useRef<THREE.Group>(null);
  const dotRefs = useRef<THREE.Mesh[]>([]);

  const dots = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      pos: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(() => {
    const t = performance.now() / 1000;
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const d = dots[i];
      dot.position.y = d.pos[1] + Math.sin(t * d.speed + d.phase) * 0.3;
      const mat = dot.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 0.8 + d.phase) * 0.2;
    });
  });

  return (
    <group ref={ref}>
      {dots.map((d, i) => (
        <mesh
          key={d.id}
          ref={(el) => { if (el) dotRefs.current[i] = el; }}
          position={d.pos}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#C8A951"
            emissive="#C8A951"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ContactBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.1} />
        <NetworkDots />
      </Canvas>
    </div>
  );
}
