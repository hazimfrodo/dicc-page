"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ServerRackProps {
  position: [number, number, number];
  index: number;
}

export default function ServerRack({ position, index }: ServerRackProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + index * 1.2) * 0.06;
    groupRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.05;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity =
        0.4 + Math.sin(t * 0.8 + index * 0.7) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <RoundedBox args={[0.4, 0.8, 0.3]} radius={0.03} smoothness={4}>
        <meshStandardMaterial
          color="#192f59"
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>
      {/* Edge glow wireframe */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.82, 0.32]} />
        <meshStandardMaterial
          color="#7360ff"
          emissive="#7360ff"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Status LED strips */}
      {[0.2, 0.0, -0.2].map((y, i) => (
        <mesh key={i} position={[0.21, y, 0]}>
          <boxGeometry args={[0.01, 0.05, 0.15]} />
          <meshStandardMaterial
            color="#4CAF50"
            emissive="#4CAF50"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}
