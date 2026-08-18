"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridMesh() {
  const ref = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  const nodes = useMemo(() => {
    const result: { pos: [number, number, number]; id: number }[] = [];
    let id = 0;
    for (let x = -4; x <= 4; x += 1.6) {
      for (let y = -2; y <= 2; y += 1.6) {
        result.push({
          pos: [x + (Math.random() - 0.5) * 0.3, y + (Math.random() - 0.5) * 0.3, -3 + Math.random() * -2],
          id: id++,
        });
      }
    }
    return result;
  }, []);

  useFrame((state) => {
    const t = performance.now() / 1000;
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.y = nodes[i].pos[1] + Math.sin(t * 0.4 + i * 0.7) * 0.15;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.2 + Math.sin(t * 0.6 + i * 0.5) * 0.15;
    });
  });

  return (
    <group ref={ref}>
      {nodes.map((n, i) => (
        <mesh
          key={n.id}
          ref={(el) => { if (el) nodeRefs.current[i] = el; }}
          position={n.pos}
        >
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#C8A951"
            emissive="#C8A951"
            emissiveIntensity={0.3}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ServicesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.1} />
        <GridMesh />
      </Canvas>
    </div>
  );
}
