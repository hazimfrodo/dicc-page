"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataNodeProps {
  position: [number, number, number];
  index: number;
}

export default function DataNode({ position, index }: DataNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const t = performance.now() / 1000;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7 + index * 2.0) * 0.04;
      groupRef.current.position.x = position[0] + Math.cos(t * 0.4 + index * 1.3) * 0.02;
      groupRef.current.rotation.y = t * 0.5 + index;
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.2 + index) * 0.2;
    }
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(t * 1.8 + index * 0.7) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.008, 8, 24]} />
        <meshStandardMaterial
          color="#C8A951"
          emissive="#C8A951"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial
          color="#90CAF9"
          emissive="#90CAF9"
          emissiveIntensity={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#90CAF9"
          emissive="#90CAF9"
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbit dots */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[
          Math.cos((i * Math.PI * 2) / 3) * 0.1,
          Math.sin((i * Math.PI * 2) / 3) * 0.1,
          0
        ]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial
            color="#C8A951"
            emissive="#C8A951"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
