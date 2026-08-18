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
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  const color = useMemo(() => {
    switch (type) {
      case "server-server":
        return "#7360ff";
      case "server-gpu":
        return "#C8A951";
      case "server-node":
        return "#90CAF9";
    }
  }, [type]);

  const lineObj = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const m = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    m.y += 0.15;
    const curve = new THREE.QuadraticBezierCurve3(s, m, e);
    const pts = curve.getPoints(24);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.15,
    });
    return new THREE.Line(geo, mat);
  }, [start, end, color]);

  useFrame((state) => {
    const t = performance.now() / 1000;
    const mat = lineObj.material as THREE.LineBasicMaterial;
    mat.opacity = 0.12 + Math.sin(t * 0.5 + index * 1.1) * 0.08;
  });

  return <primitive object={lineObj} />;
}
