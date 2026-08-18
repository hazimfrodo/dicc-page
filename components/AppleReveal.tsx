"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  duration?: number;
  distance?: number;
}

export function AppleReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 1.2,
  distance = 60,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: "power3.out",
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        break;
      case "down":
        fromVars.y = -distance;
        break;
      case "left":
        fromVars.x = distance;
        break;
      case "right":
        fromVars.x = -distance;
        break;
      case "scale":
        fromVars.scale = 0.9;
        fromVars.y = 30;
        break;
      case "fade":
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [delay, direction, duration, distance]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}

export function AppleStagger({
  children,
  className = "",
  stagger = 0.1,
  direction = "up",
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;
    if (!children.length) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      scale: direction === "scale" ? 0.9 : 1,
      duration: 0.8,
      ease: "power3.out",
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(children, fromVars, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, direction, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function AppleScaleOnScroll({
  children,
  className = "",
  scaleFrom = 0.95,
  scaleTo = 1,
}: {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  scaleTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: scaleFrom, opacity: 0.5 },
        {
          scale: scaleTo,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top center",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [scaleFrom, scaleTo]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxText({
  children,
  className = "",
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 100 * speed },
        {
          y: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
