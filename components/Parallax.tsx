"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  cursorSpeed?: number;
  className?: string;
  as?: "div" | "span" | "section" | "article" | "aside";
}

export function ScrollParallax({
  children,
  speed = 0.3,
  className = "",
  as: Tag = "div",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 80 * speed },
        {
          y: -80 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    // @ts-expect-error Tag is a valid element
    <Tag ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}

export function CursorParallax({
  children,
  speed = 20,
  className = "",
  as: Tag = "div",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * (speed / window.innerWidth);
      const y = (e.clientY - window.innerHeight / 2) * (speed / window.innerHeight);
      gsap.to(el, { x, y, duration: 0.8, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [speed]);

  return (
    // @ts-expect-error Tag is a valid element
    <Tag ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}

export function ParallaxGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
}
