"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GPUNodeProps {
  position: [number, number, number];
  index: number;
}

export default function GPUNode({ position, index }: GPUNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const chipRefs = useRef<THREE.Mesh[]>([]);
  const fan1Ref = useRef<THREE.Mesh>(null);
  const fan2Ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + index * 1.5) * 0.03;
    groupRef.current.rotation.y = Math.sin(t * 0.4 + index * 0.8) * 0.05;

    // Animate GPU chips glow
    chipRefs.current.forEach((chip, i) => {
      if (!chip) return;
      const mat = chip.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5 + index * 0.7 + i * 0.5) * 0.3;
    });

    // Animate fans
    if (fan1Ref.current) fan1Ref.current.rotation.z = t * 8 + index;
    if (fan2Ref.current) fan2Ref.current.rotation.z = t * 8 + index + Math.PI;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* PCB base */}
      <mesh>
        <boxGeometry args={[0.38, 0.012, 0.2]} />
        <meshStandardMaterial color="#0c4a1e" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* GPU chips (4 in 2x2) */}
      {[[-0.06, -0.04], [0.06, -0.04], [-0.06, 0.04], [0.06, 0.04]].map(([x, z], i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) chipRefs.current[i] = el; }}
          position={[x, 0.02, z]}
        >
          <boxGeometry args={[0.06, 0.008, 0.06]} />
          <meshStandardMaterial color="#C8A951" emissive="#C8A951" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Heatsink block */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.25, 0.025, 0.16]} />
        <meshStandardMaterial color="#2a3441" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Fan 1 (disc) */}
      <mesh ref={fan1Ref} position={[-0.07, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial color="#0c1220" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Fan 2 (disc) */}
      <mesh ref={fan2Ref} position={[0.07, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial color="#0c1220" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* LED accent strip */}
      <mesh position={[0, 0.008, 0.1]}>
        <boxGeometry args={[0.35, 0.003, 0.003]} />
        <meshStandardMaterial color="#C8A951" emissive="#C8A951" emissiveIntensity={0.5} transparent opacity={0.9} />
      </mesh>

      {/* Backplate */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[0.375, 0.005, 0.195]} />
        <meshStandardMaterial color="#1a2332" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}
