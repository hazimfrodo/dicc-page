"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";

const VisionBackground = dynamic(
  () => import("./Scene3D/VisionBackground"),
  { ssr: false }
);

export default function VisionMission() {
  return (
    <section className="relative py-20 md:py-28 bg-[#f2f2f5] overflow-hidden">
      <ScrollParallax speed={0.15} className="absolute inset-0">
        <VisionBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollParallax speed={0.1}>
          <div className="text-center mb-14">
            <p className="text-[#C8A951] text-sm font-semibold tracking-widest uppercase mb-3">
              Vision & Mission
            </p>
          </div>
        </ScrollParallax>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ScrollParallax speed={0.08}>
            <CursorParallax speed={10}>
              <div className="p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 h-full">
                <div className="text-[#C8A951] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Our Vision
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#061a3a] leading-snug">
                  To become a prominent research computing centre.
                </h3>
              </div>
            </CursorParallax>
          </ScrollParallax>

          <ScrollParallax speed={0.12}>
            <CursorParallax speed={10}>
              <div className="p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 h-full">
                <div className="text-[#C8A951] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Our Mission
                </div>
                <p className="text-lg text-[#061a3a] leading-relaxed">
                  The UM Data-Intensive Computing Centre aims to provide research
                  communities with excellent support and innovative solutions to
                  address research computing challenges.
                </p>
              </div>
            </CursorParallax>
          </ScrollParallax>
        </div>
      </div>
    </section>
  );
}
