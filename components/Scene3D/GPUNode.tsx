"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface GPUNodeProps {
  position: [number, number, number];
  index: number;
}

export default function GPUNode({ position, index }: GPUNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.6 + index * 1.5) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.4 + index * 0.8) * 0.08;

    coreRefs.current.forEach((core, i) => {
      if (core) {
        const mat = core.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity =
          0.5 + Math.sin(t * 1.2 + index * 0.9 + i * 0.3) * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* GPU body - flatter and wider */}
      <RoundedBox args={[0.35, 0.2, 0.25]} radius={0.02} smoothness={4}>
        <meshStandardMaterial
          color="#0d1927"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      {/* Core heat fin lines - orange glow */}
      {[-0.06, -0.02, 0.02, 0.06].map((y, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) coreRefs.current[i] = el;
          }}
          position={[0, y, 0.13]}
        >
          <boxGeometry args={[0.25, 0.015, 0.01]} />
          <meshStandardMaterial
            color="#FF6F00"
            emissive="#FF6F00"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {/* Side glow */}
      <mesh position={[-0.18, 0, 0]}>
        <boxGeometry args={[0.01, 0.18, 0.23]} />
        <meshStandardMaterial
          color="#FF6F00"
          emissive="#FF6F00"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
