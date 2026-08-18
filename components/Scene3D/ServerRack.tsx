"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ServerRackProps {
  position: [number, number, number];
  index: number;
}

function RackUnit({ y, index }: { y: number; index: number }) {
  const ledRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = performance.now() / 1000;
    ledRefs.current.forEach((led, i) => {
      if (!led) return;
      const mat = led.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 2 + index * 1.5 + i * 0.8) * 1.0;
    });
  });

  return (
    <group position={[0, y, 0]}>
      {/* Rack unit faceplate */}
      <mesh position={[0, 0, 0.201]}>
        <boxGeometry args={[0.36, 0.065, 0.005]} />
        <meshStandardMaterial color="#0c1220" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Drive bay grooves */}
      {[-0.1, -0.03, 0.04, 0.11].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.205]}>
          <boxGeometry args={[0.055, 0.05, 0.002]} />
          <meshStandardMaterial color="#060a12" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}

      {/* Status LEDs */}
      {[0.13, 0.15, 0.17].map((x, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ledRefs.current[i] = el; }}
          position={[x, 0, 0.208]}
        >
          <boxGeometry args={[0.01, 0.01, 0.004]} />
          <meshStandardMaterial
            color={i === 0 ? "#4CAF50" : i === 1 ? "#2196F3" : "#FFC107"}
            emissive={i === 0 ? "#4CAF50" : i === 1 ? "#2196F3" : "#FFC107"}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Power button */}
      <mesh position={[-0.17, 0, 0.208]}>
        <cylinderGeometry args={[0.006, 0.006, 0.003, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function VentGrille({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.008 - 0.028, 0]}>
          <boxGeometry args={[0.08, 0.003, 0.002]} />
          <meshStandardMaterial color="#0a0f1a" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function ServerRack({ position, index }: ServerRackProps) {
  const groupRef = useRef<THREE.Group>(null);
  const topLedRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = performance.now() / 1000;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + index * 1.2) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.03;

    if (topLedRef.current) {
      const mat = topLedRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 1.5 + index) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main chassis - tall rack server */}
      <mesh>
        <boxGeometry args={[0.4, 0.9, 0.3]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Side panel with brushed metal effect */}
      <mesh position={[-0.201, 0, 0]}>
        <boxGeometry args={[0.005, 0.88, 0.28]} />
        <meshStandardMaterial color="#1a2332" metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0.201, 0, 0]}>
        <boxGeometry args={[0.005, 0.88, 0.28]} />
        <meshStandardMaterial color="#1a2332" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Top edge highlight */}
      <mesh position={[0, 0.451, 0]}>
        <boxGeometry args={[0.41, 0.003, 0.31]} />
        <meshStandardMaterial color="#C8A951" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Front faceplate */}
      <mesh position={[0, 0, 0.151]}>
        <boxGeometry args={[0.38, 0.88, 0.005]} />
        <meshStandardMaterial color="#0f1724" metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Rack units (4U server) */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((y, i) => (
        <RackUnit key={i} y={y} index={index} />
      ))}

      {/* Left ventilation grille */}
      <VentGrille position={[-0.1, 0, 0.206]} />

      {/* Right ventilation grille */}
      <VentGrille position={[0.1, 0, 0.206]} />

      {/* Top status bar */}
      <mesh position={[0, 0.42, 0.152]}>
        <boxGeometry args={[0.38, 0.015, 0.003]} />
        <meshStandardMaterial color="#0a0f1a" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Main power LED on top bar */}
      <mesh
        ref={topLedRef}
        position={[0.16, 0.42, 0.156]}
      >
        <boxGeometry args={[0.02, 0.02, 0.006]} />
        <meshStandardMaterial
          color="#4CAF50"
          emissive="#4CAF50"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Network port LEDs */}
      {[0.11, 0.13, 0.15].map((x, i) => (
        <mesh key={`net-${i}`} position={[x, 0.38, 0.156]}>
          <boxGeometry args={[0.01, 0.01, 0.004]} />
          <meshStandardMaterial
            color="#00BCD4"
            emissive="#00BCD4"
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Rack mount rails - left */}
      <mesh position={[-0.21, 0, 0.15]}>
        <boxGeometry args={[0.015, 0.9, 0.01]} />
        <meshStandardMaterial color="#2a3441" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rack mount rails - right */}
      <mesh position={[0.21, 0, 0.15]}>
        <boxGeometry args={[0.015, 0.9, 0.01]} />
        <meshStandardMaterial color="#2a3441" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screw holes on rails */}
      {[-0.35, -0.15, 0.05, 0.25, 0.4].map((y, i) => (
        <group key={`screw-${i}`}>
          <mesh position={[-0.21, y, 0.158]}>
            <cylinderGeometry args={[0.003, 0.003, 0.005, 6]} />
            <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.21, y, 0.158]}>
            <cylinderGeometry args={[0.003, 0.003, 0.005, 6]} />
            <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Rear exhaust vents */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`rear-${i}`} position={[i * 0.055 - 0.135, 0, -0.151]}>
          <boxGeometry args={[0.04, 0.7, 0.005]} />
          <meshStandardMaterial color="#080c14" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}

      {/* Wireframe overlay for depth */}
      <mesh position={[0, 0, 0]}>
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
