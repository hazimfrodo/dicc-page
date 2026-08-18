"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import ServerRack from "./ServerRack";
import GPUNode from "./GPUNode";
import DataNode from "./DataNode";
import ConnectionLine from "./ConnectionLine";
import DataPacket from "./DataPacket";
import {
  sceneObjects,
  connections,
  getPosition,
} from "./sceneLayout";

function SceneContent({
  morphProgress,
  scrollProgress,
}: {
  morphProgress: number;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.15,
        0.05
      );
    groupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.08,
        0.05
      );
  });

  const servers = sceneObjects.filter((o) => o.type === "server");
  const gpus = sceneObjects.filter((o) => o.type === "gpu");
  const nodes = sceneObjects.filter((o) => o.type === "node");

  const dataPackets = useMemo(() => {
    const packets: {
      start: [number, number, number];
      end: [number, number, number];
      speed: number;
      delay: number;
      index: number;
    }[] = [];
    connections.forEach((conn, i) => {
      const fromObj = sceneObjects.find((o) => o.id === conn.from);
      const toObj = sceneObjects.find((o) => o.id === conn.to);
      if (fromObj && toObj) {
        packets.push({
          start: getPosition(fromObj, morphProgress),
          end: getPosition(toObj, morphProgress),
          speed: 0.3 + Math.random() * 0.4,
          delay: Math.random() * 3,
          index: i,
        });
      }
    });
    return packets;
  }, [morphProgress]);

  return (
    <group ref={groupRef}>
      {/* Servers */}
      {servers.map((obj, i) => (
        <ServerRack
          key={obj.id}
          position={getPosition(obj, morphProgress)}
          index={i}
        />
      ))}

      {/* GPUs */}
      {gpus.map((obj, i) => (
        <GPUNode
          key={obj.id}
          position={getPosition(obj, morphProgress)}
          index={i}
        />
      ))}

      {/* Data nodes */}
      {nodes.map((obj, i) => (
        <Float
          key={obj.id}
          speed={1.5}
          rotationIntensity={0}
          floatIntensity={0.3}
          floatingRange={[-0.02, 0.02]}
        >
          <DataNode
            position={getPosition(obj, morphProgress)}
            index={i}
          />
        </Float>
      ))}

      {/* Connection lines */}
      {connections.map((conn, i) => {
        const fromObj = sceneObjects.find((o) => o.id === conn.from);
        const toObj = sceneObjects.find((o) => o.id === conn.to);
        if (!fromObj || !toObj) return null;
        return (
          <ConnectionLine
            key={`${conn.from}-${conn.to}`}
            start={getPosition(fromObj, morphProgress)}
            end={getPosition(toObj, morphProgress)}
            type={conn.type}
            index={i}
          />
        );
      })}

      {/* Data packets */}
      {dataPackets.map((pkt, i) => (
        <DataPacket key={i} {...pkt} />
      ))}
    </group>
  );
}

export default function HPCScene({
  className = "",
}: {
  className?: string;
}) {
  const [morphProgress, setMorphProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleCreated = useCallback(() => {
    // Scene created
  }, []);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        onCreated={handleCreated}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight
          position={[-3, 2, -3]}
          intensity={0.3}
          color="#7360ff"
        />
        <pointLight
          position={[0, -1, 0]}
          intensity={0.5}
          color="#C8A951"
          distance={8}
        />
        <fog attach="fog" args={["#0d1927", 4, 12]} />
        <SceneContent
          morphProgress={morphProgress}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}
