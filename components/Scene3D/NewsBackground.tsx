"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataStream() {
  const ref = useRef<THREE.Group>(null);
  const particleRefs = useRef<THREE.Mesh[]>([]);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      startPos: [
        (Math.random() - 0.5) * 14,
        -3 - Math.random() * 2,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 6,
      size: 0.02 + Math.random() * 0.03,
    }));
  }, []);

  useFrame((state) => {
    const t = performance.now() / 1000;
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = particles[i];
      const y = ((t * p.speed + p.delay) % 6) - 3;
      mesh.position.y = p.startPos[1] + y + 3;
      mesh.position.x = p.startPos[0] + Math.sin(t * 0.3 + i) * 0.3;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const progress = (mesh.position.y + 3) / 6;
      mat.opacity = Math.sin(progress * Math.PI) * 0.25;
    });
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh
          key={p.id}
          ref={(el) => { if (el) particleRefs.current[i] = el; }}
          position={p.startPos}
        >
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial
            color="#90CAF9"
            emissive="#90CAF9"
            emissiveIntensity={0.5}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NewsBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
        <DataStream />
      </Canvas>
    </div>
  );
}
