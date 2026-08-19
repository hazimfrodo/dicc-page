"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollParallax } from "./Parallax";
import { AppleReveal, AppleStagger } from "./AppleReveal";

const StatsBackground = dynamic(() => import("./Scene3D/StatsBackground"), {
  ssr: false,
});

const stats = [
  { label: "Active Researchers", value: 300, suffix: "+", icon: "👥" },
  { label: "CPU Compute (FP64)", value: 85.10, suffix: " TF", decimals: 2, icon: "⚡" },
  { label: "GPU Compute (FP16)", value: 5.25, suffix: " PF", decimals: 2, icon: "🚀" },
  { label: "Storage Capacity", value: 990, suffix: "TB+", icon: "💾" },
  { label: "Availability", value: 24, suffix: "/7", icon: "🌐" },
  { label: "Average Uptime", value: 99.90, suffix: "%", decimals: 2, icon: "📊" },
  { label: "Accessibility", value: 1, suffix: "", icon: "🌍", display: "Worldwide" },
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
        <AppleStagger className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4" stagger={0.06} direction="up" distance={30}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-1 min-w-0">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#C8A951] tracking-tight whitespace-nowrap">
                {"display" in stat && stat.display ? (
                  <span>{stat.display}</span>
                ) : (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                )}
              </div>
              <p className="mt-2 text-xs md:text-sm text-white/40 font-light leading-tight">
                {stat.icon} {stat.label}
              </p>
            </div>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
