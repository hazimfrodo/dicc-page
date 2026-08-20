"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollParallax } from "./Parallax";

const StatsBackground = dynamic(() => import("./Scene3D/StatsBackground"), {
  ssr: false,
});

const stats = [
  { label: "Active Researchers", value: 300, suffix: "+", icon: "👥" },
  { label: "CPU Compute (FP64)", value: 85.1, suffix: " TF", decimals: 1, icon: "⚡" },
  { label: "GPU Compute (FP16)", value: 5.2, suffix: " PF", decimals: 1, icon: "🚀" },
  { label: "Storage Capacity", value: 990, suffix: "TB+", icon: "💾" },
  { label: "Availability", value: 24, suffix: "/7", icon: "🌐" },
  { label: "Average Uptime", value: 99.8, suffix: "%", decimals: 1, icon: "📊" },
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
    <section className="relative bg-[#0d1927] py-10 md:py-14 overflow-hidden">
      <ScrollParallax speed={0.2} className="absolute inset-0">
        <StatsBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-[1400px] mx-auto px-2">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-start gap-x-6 gap-y-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex-shrink-0">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C8A951] tracking-tight whitespace-nowrap">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </div>
              <p className="mt-2 text-xs md:text-sm lg:text-base text-white/70 font-medium leading-tight whitespace-nowrap">
                {stat.icon} {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
