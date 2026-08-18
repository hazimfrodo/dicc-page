"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";
import { AppleReveal } from "./AppleReveal";

const MiniScene = dynamic(() => import("./Scene3D/MiniScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function ParallaxDivider() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <ScrollParallax speed={0.4} className="absolute inset-0">
        <MiniScene className="w-full h-full" />
      </ScrollParallax>

      <div className="absolute inset-0 bg-[#0d1927]/70" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <CursorParallax speed={15}>
          <AppleReveal direction="scale" distance={20}>
            <div className="text-center px-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Powering the Future
                <br />
                <span className="text-[#C8A951]">of Research</span>
              </h2>
              <p className="mt-6 text-white/40 text-xl max-w-xl mx-auto font-light">
                Where high-performance computing meets innovative research solutions
              </p>
            </div>
          </AppleReveal>
        </CursorParallax>
      </div>
    </section>
  );
}
