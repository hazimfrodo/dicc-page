"use client";

import { useEffect, useState } from "react";

export function useCursorParallax(sensitivity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * sensitivity;
      const y = (e.clientY - window.innerHeight / 2) * sensitivity;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [sensitivity]);

  return offset;
}
