"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollParallax } from "./Parallax";
import { AppleReveal, AppleStagger } from "./AppleReveal";

const StatsBackground = dynamic(() => import("./Scene3D/StatsBackground"), {
  ssr: false,
});

const stats = [
  { label: "Active Researchers", value: 500, suffix: "+" },
  { label: "Computing Power", value: 2.4, suffix: " PF", decimals: 1 },
  { label: "Storage Capacity", value: 50, suffix: "PB+" },
  { label: "Support Available", value: 24, suffix: "/7" },
];

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative bg-[#0d1927] py-24 md:py-32 overflow-hidden">
      <ScrollParallax speed={0.2} className="absolute inset-0">
        <StatsBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AppleStagger className="grid grid-cols-2 md:grid-cols-4 gap-12" stagger={0.12} direction="up" distance={30}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#C8A951] tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <p className="mt-3 text-base text-white/40 font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
