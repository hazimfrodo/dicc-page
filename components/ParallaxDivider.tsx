"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";

const MiniScene = dynamic(() => import("./Scene3D/MiniScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function ParallaxDivider() {
  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Mini Three.js scene background with scroll parallax */}
      <ScrollParallax speed={0.4} className="absolute inset-0">
        <MiniScene className="w-full h-full" />
      </ScrollParallax>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0d1927]/70" />

      {/* Content with cursor parallax */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <CursorParallax speed={15}>
          <ScrollParallax speed={0.15}>
            <div className="text-center px-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Powering the Future
                <br />
                of Research
              </h2>
              <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
                Where high-performance computing meets innovative research solutions
              </p>
            </div>
          </ScrollParallax>
        </CursorParallax>
      </div>
    </section>
  );
}
