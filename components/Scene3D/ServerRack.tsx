"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ServerRackProps {
  position: [number, number, number];
  index: number;
}

const ledDefs: { pos: [number, number, number]; color: string }[] = [
  { pos: [0.12, 0.2, 0.208], color: "#4CAF50" },
  { pos: [0.14, 0.2, 0.208], color: "#2196F3" },
  { pos: [0.16, 0.2, 0.208], color: "#FFC107" },
  { pos: [0.12, 0.05, 0.208], color: "#4CAF50" },
  { pos: [0.14, 0.05, 0.208], color: "#FF5722" },
  { pos: [0.16, 0.05, 0.208], color: "#00BCD4" },
  { pos: [0.12, -0.1, 0.208], color: "#4CAF50" },
  { pos: [0.14, -0.1, 0.208], color: "#E91E63" },
  { pos: [0.16, -0.1, 0.208], color: "#2196F3" },
  { pos: [0.12, -0.25, 0.208], color: "#FFC107" },
  { pos: [0.14, -0.25, 0.208], color: "#4CAF50" },
  { pos: [0.16, -0.25, 0.208], color: "#00BCD4" },
  { pos: [0.12, 0.38, 0.156], color: "#00BCD4" },
  { pos: [0.14, 0.38, 0.156], color: "#00BCD4" },
  { pos: [0.16, 0.38, 0.156], color: "#00BCD4" },
  { pos: [0.15, 0.42, 0.156], color: "#4CAF50" },
];

export default function ServerRack({ position, index }: ServerRackProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ledRefs = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + index * 1.2) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.03;

    ledRefs.current.forEach((led, i) => {
      if (!led) return;
      const mat = led.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.5 + Math.sin(t * (1.5 + i * 0.2) + index * 1.5 + i * 0.7) * 2.0;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[0.4, 0.9, 0.3]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.151]}>
        <boxGeometry args={[0.38, 0.88, 0.005]} />
        <meshStandardMaterial color="#0f1724" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.451, 0]}>
        <boxGeometry args={[0.41, 0.003, 0.31]} />
        <meshStandardMaterial color="#C8A951" metalness={0.9} roughness={0.1} />
      </mesh>
      {ledDefs.map((led, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ledRefs.current[i] = el; }}
          position={led.pos}
        >
          <boxGeometry args={[0.014, 0.014, 0.005]} />
          <meshStandardMaterial
            color={led.color}
            emissive={led.color}
            emissiveIntensity={2.5}
          />
        </mesh>
      ))}
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
