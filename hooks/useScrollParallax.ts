"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
  y?: number;
  speed?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export function useScrollParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { y = 50, speed = 1, scrub = true, start = "top bottom", end = "bottom top" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: y * speed },
      {
        y: -y * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [y, speed, scrub, start, end]);

  return ref;
}
