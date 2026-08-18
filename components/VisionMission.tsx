"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";
import { AppleReveal } from "./AppleReveal";

const VisionBackground = dynamic(
  () => import("./Scene3D/VisionBackground"),
  { ssr: false }
);

export default function VisionMission() {
  return (
    <section className="relative py-32 md:py-44 bg-[#f2f2f5] overflow-hidden">
      <ScrollParallax speed={0.15} className="absolute inset-0">
        <VisionBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AppleReveal direction="up">
          <div className="text-center mb-20">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Vision & Mission
            </p>
          </div>
        </AppleReveal>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <AppleReveal direction="left" delay={0}>
            <CursorParallax speed={25}>
              <div className="p-12 rounded-[2rem] bg-white shadow-xl shadow-black/[0.03] h-full">
                <div className="text-[#C8A951] text-xs font-bold tracking-[0.25em] uppercase mb-6">
                  Our Vision
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#061a3a] leading-[1.2] tracking-tight">
                  To become a prominent research computing centre.
                </h3>
              </div>
            </CursorParallax>
          </AppleReveal>

          <AppleReveal direction="right" delay={0.1}>
            <CursorParallax speed={25}>
              <div className="p-12 rounded-[2rem] bg-white shadow-xl shadow-black/[0.03] h-full">
                <div className="text-[#C8A951] text-xs font-bold tracking-[0.25em] uppercase mb-6">
                  Our Mission
                </div>
                <p className="text-xl text-[#061a3a] leading-relaxed font-light">
                  The UM Data-Intensive Computing Centre aims to provide research
                  communities with excellent support and innovative solutions to
                  address research computing challenges.
                </p>
              </div>
            </CursorParallax>
          </AppleReveal>
        </div>
      </div>
    </section>
  );
}
