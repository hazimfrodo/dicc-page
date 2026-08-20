"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ServerRackProps {
  position: [number, number, number];
  index: number;
}

export default function ServerRack({ position, index }: ServerRackProps) {
  const groupRef = useRef<THREE.Group>(null);
  const led1Ref = useRef<THREE.Mesh>(null);
  const led2Ref = useRef<THREE.Mesh>(null);
  const led3Ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + index * 1.2) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.03;

    // Animate LEDs
    [led1Ref, led2Ref, led3Ref].forEach((ref, i) => {
      if (!ref.current) return;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 2 + index * 1.5 + i * 0.8) * 1.0;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main chassis */}
      <mesh>
        <boxGeometry args={[0.4, 0.9, 0.3]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Front faceplate */}
      <mesh position={[0, 0, 0.151]}>
        <boxGeometry args={[0.38, 0.88, 0.005]} />
        <meshStandardMaterial color="#0f1724" metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Top edge highlight */}
      <mesh position={[0, 0.451, 0]}>
        <boxGeometry args={[0.41, 0.003, 0.31]} />
        <meshStandardMaterial color="#C8A951" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Status LEDs */}
      <mesh ref={led1Ref} position={[0.13, 0, 0.208]}>
        <boxGeometry args={[0.01, 0.01, 0.004]} />
        <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={2} />
      </mesh>
      <mesh ref={led2Ref} position={[0.15, 0, 0.208]}>
        <boxGeometry args={[0.01, 0.01, 0.004]} />
        <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={2} />
      </mesh>
      <mesh ref={led3Ref} position={[0.17, 0, 0.208]}>
        <boxGeometry args={[0.01, 0.01, 0.004]} />
        <meshStandardMaterial color="#FFC107" emissive="#FFC107" emissiveIntensity={2} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <boxGeometry args={[0.405, 0.905, 0.305]} />
        <meshStandardMaterial
          color="#7360ff"
          emissive="#7360ff"
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}
