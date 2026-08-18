"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = performance.now() / 1000;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x = t * 0.1 * (i + 1) * 0.3;
      mesh.rotation.y = t * 0.15 * (i + 1) * 0.2;
      mesh.position.y = Math.sin(t * 0.3 + i * 1.5) * 0.3;
    });
  });

  const shapes = useMemo(
    () => [
      { pos: [-5, 0, -3] as [number, number, number], geo: "octahedron", scale: 0.5 },
      { pos: [5.5, 1, -2] as [number, number, number], geo: "icosahedron", scale: 0.4 },
      { pos: [-4, -1.5, -1] as [number, number, number], geo: "tetrahedron", scale: 0.35 },
      { pos: [4.5, -1, -4] as [number, number, number], geo: "octahedron", scale: 0.6 },
      { pos: [0, 2, -5] as [number, number, number], geo: "dodecahedron", scale: 0.3 },
      { pos: [-6, 1.5, -2] as [number, number, number], geo: "tetrahedron", scale: 0.25 },
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el; }}
          position={s.pos}
          scale={s.scale}
        >
          {s.geo === "octahedron" && <octahedronGeometry args={[1, 0]} />}
          {s.geo === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
          {s.geo === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
          {s.geo === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color="#192f59"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function AboutBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <GeometricShapes />
      </Canvas>
    </div>
  );
}
