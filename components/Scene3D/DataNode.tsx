"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataNodeProps {
  position: [number, number, number];
  index: number;
}

export default function DataNode({ position, index }: DataNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.7 + index * 2.0) * 0.05;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.4 + index * 1.3) * 0.03;

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(t * 1.0 + index) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color="#90CAF9"
        emissive="#90CAF9"
        emissiveIntensity={0.4}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
