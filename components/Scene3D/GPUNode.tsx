"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GPUNodeProps {
  position: [number, number, number];
  index: number;
}

function GPUChip({ x, z, index }: { x: number; z: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.4 + Math.sin(t * 1.2 + index * 0.9 + x * 3) * 0.4;
  });

  return (
    <group position={[x, 0.025, z]}>
      {/* GPU die */}
      <mesh ref={ref}>
        <boxGeometry args={[0.06, 0.008, 0.06]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Die markings */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.04, 0.002, 0.04]} />
        <meshStandardMaterial
          color="#C8A951"
          emissive="#C8A951"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function HeatSinkFin({ x }: { x: number }) {
  return (
    <mesh position={[x, 0.04, 0]}>
      <boxGeometry args={[0.003, 0.035, 0.18]} />
      <meshStandardMaterial color="#2a3441" metalness={0.85} roughness={0.15} />
    </mesh>
  );
}

function FanUnit({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000;
    ref.current.rotation.z = t * 8 + index * Math.PI;
  });

  return (
    <group position={position}>
      {/* Fan housing */}
      <mesh>
        <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
        <meshStandardMaterial color="#0c1220" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Fan blades */}
      <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
            <boxGeometry args={[0.025, 0.002, 0.008]} />
            <meshStandardMaterial color="#1a2332" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
        {/* Center hub */}
        <mesh>
          <cylinderGeometry args={[0.006, 0.006, 0.016, 8]} />
          <meshStandardMaterial color="#C8A951" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function PowerConnector({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.025, 0.015, 0.01]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Pin rows */}
      {[0.006, 0.018].map((x, i) => (
        <mesh key={i} position={[x - 0.012, 0.006, 0]}>
          <boxGeometry args={[0.004, 0.004, 0.008]} />
          <meshStandardMaterial color="#C8A951" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function GPUNode({ position, index }: GPUNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + index * 1.5) * 0.03;
    groupRef.current.rotation.y = Math.sin(t * 0.4 + index * 0.8) * 0.05;

    coreRefs.current.forEach((core, i) => {
      if (!core) return;
      const mat = core.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5 + index * 0.7 + i * 0.5) * 0.3;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* PCB - main board */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.38, 0.012, 0.2]} />
        <meshStandardMaterial color="#0c4a1e" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* PCB top layer - solder mask */}
      <mesh position={[0, 0.007, 0]}>
        <boxGeometry args={[0.375, 0.002, 0.195]} />
        <meshStandardMaterial color="#0d5a24" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* GPU chips (4 chips in 2x2 layout) */}
      <GPUChip x={-0.06} z={-0.04} index={index} />
      <GPUChip x={0.06} z={-0.04} index={index} />
      <GPUChip x={-0.06} z={0.04} index={index} />
      <GPUChip x={0.06} z={0.04} index={index} />

      {/* HBM memory stacks around GPUs */}
      {[[-0.12, -0.04], [-0.12, 0.04], [0.12, -0.04], [0.12, 0.04]].map(([x, z], i) => (
        <mesh key={`mem-${i}`} position={[x, 0.02, z]}>
          <boxGeometry args={[0.025, 0.015, 0.025]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* VRM components */}
      {[-0.15, -0.13, -0.11].map((x, i) => (
        <mesh key={`vrm-${i}`} position={[x, 0.018, -0.07]}>
          <boxGeometry args={[0.015, 0.012, 0.015]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Heatsink base plate */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.25, 0.008, 0.16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Heat sink fins */}
      {Array.from({ length: 15 }).map((_, i) => (
        <HeatSinkFin key={i} x={i * 0.016 - 0.112} />
      ))}

      {/* Heat pipes */}
      {[-0.04, 0.04].map((z, i) => (
        <mesh key={`pipe-${i}`} position={[0, 0.04, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.22, 8]} />
          <meshStandardMaterial color="#b87333" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Fans (2x) */}
      <FanUnit position={[-0.07, 0.055, 0]} index={index} />
      <FanUnit position={[0.07, 0.055, 0]} index={index + 1} />

      {/* Power connectors (2x 8-pin) */}
      <PowerConnector position={[0.16, 0.015, -0.06]} />
      <PowerConnector position={[0.16, 0.015, 0.02]} />

      {/* NVLink connector */}
      <mesh position={[-0.19, 0.015, 0]}>
        <boxGeometry args={[0.015, 0.01, 0.04]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Backplate */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[0.375, 0.005, 0.195]} />
        <meshStandardMaterial color="#1a2332" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* PCIe connector */}
      <mesh position={[0, -0.015, -0.085]}>
        <boxGeometry args={[0.12, 0.008, 0.015]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Capacitors along edge */}
      {[0.02, 0.045, 0.07, 0.095, 0.12].map((x, i) => (
        <mesh key={`cap-${i}`} position={[x, 0.018, 0.06]}>
          <cylinderGeometry args={[0.004, 0.004, 0.01, 6]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* LED accent strip */}
      <mesh ref={(el) => { if (el) coreRefs.current[0] = el; }} position={[0, 0.008, 0.1]}>
        <boxGeometry args={[0.35, 0.003, 0.003]} />
        <meshStandardMaterial
          color="#C8A951"
          emissive="#C8A951"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
