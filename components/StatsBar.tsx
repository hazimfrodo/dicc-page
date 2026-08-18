"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollParallax } from "./Parallax";

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
    <section className="relative bg-[#0d1927] py-16 md:py-20 overflow-hidden">
      <ScrollParallax speed={0.2} className="absolute inset-0">
        <StatsBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <ScrollParallax key={stat.label} speed={0.1 + i * 0.05}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C8A951]">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <p className="mt-2 text-sm md:text-base text-white/60 font-medium">
                {stat.label}
              </p>
            </div>
          </ScrollParallax>
        ))}
      </div>
    </section>
  );
}
