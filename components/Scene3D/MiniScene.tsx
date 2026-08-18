"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const UM_BLUE = new THREE.Color("#192f59");
    const UM_ORANGE = new THREE.Color("#C8A951");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const color = Math.random() > 0.8 ? UM_ORANGE : UM_BLUE;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = performance.now() / 1000;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function MiniScene({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
