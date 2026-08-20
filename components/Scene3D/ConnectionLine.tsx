"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  type: "server-server" | "server-gpu" | "server-node";
  index: number;
}

export default function ConnectionLine({
  start,
  end,
  type,
  index,
}: ConnectionLineProps) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const { color, radius } = useMemo(() => {
    switch (type) {
      case "server-server":
        return { color: "#7360ff", radius: 0.012 };
      case "server-gpu":
        return { color: "#C8A951", radius: 0.01 };
      case "server-node":
        return { color: "#90CAF9", radius: 0.008 };
    }
  }, [type]);

  const tubeObj = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const m = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    m.y += 0.15;
    const curve = new THREE.QuadraticBezierCurve3(s, m, e);
    const geo = new THREE.TubeGeometry(curve, 24, radius, 6, false);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.Mesh(geo, mat);
  }, [start, end, color, radius]);

  useFrame(() => {
    const t = performance.now() / 1000;
    const mat = tubeObj.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.2 + Math.sin(t * 0.5 + index * 1.1) * 0.1;
  });

  return <primitive object={tubeObj} />;
}
