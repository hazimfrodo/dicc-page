"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataPacketProps {
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  delay: number;
  index: number;
}

export default function DataPacket({
  start,
  end,
  speed,
  delay,
  index,
}: DataPacketProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const midY = (start[1] + end[1]) / 2 + 0.1;
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        midY,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;
    const progress = ((t * speed + delay) % 3.0) / 3.0;
    const point = curve.getPoint(progress);
    meshRef.current.position.copy(point);

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const fadeIn = Math.min(progress * 5, 1);
    const fadeOut = Math.min((1 - progress) * 5, 1);
    mat.opacity = fadeIn * fadeOut * 0.9;
    mat.emissiveIntensity = 0.6 + fadeIn * fadeOut * 0.6;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial
        color="#C8A951"
        emissive="#C8A951"
        emissiveIntensity={1}
        transparent
        opacity={0}
      />
    </mesh>
  );
}
