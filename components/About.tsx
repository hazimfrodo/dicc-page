"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";
import { AppleReveal, AppleStagger, AppleScaleOnScroll } from "./AppleReveal";

const AboutBackground = dynamic(() => import("./Scene3D/AboutBackground"), {
  ssr: false,
});

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Computing as a Service",
    description:
      "We provide support and access to High Performance Computing to all researchers across every discipline.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Consultation & Training",
    description:
      "We provide necessary training and consultation to ensure researchers are able to achieve what they need.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Data Management",
    description:
      "Research data repository and data management planning tools for secure data handling and sharing.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 bg-white overflow-hidden">
      <ScrollParallax speed={0.15} className="absolute inset-0">
        <AboutBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Apple-style oversized heading */}
        <AppleReveal direction="up" distance={40}>
          <div className="text-center mb-24">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#061a3a] max-w-4xl mx-auto leading-[1.1] tracking-tight">
              Empowering Research
              <br />
              Through Computing
            </h2>
            <p className="mt-8 text-[#848484] text-xl max-w-2xl mx-auto leading-relaxed font-light">
              World-class research computing infrastructure to empower researchers across all disciplines.
            </p>
          </div>
        </AppleReveal>

        {/* Apple-style feature cards - clean, minimal */}
        <AppleStagger className="grid md:grid-cols-3 gap-10" stagger={0.15} direction="up" distance={50}>
          {features.map((feature) => (
            <CursorParallax key={feature.title} speed={6}>
              <div className="group p-10 rounded-3xl bg-[#f2f2f5] hover:bg-[#061a3a] transition-all duration-700 h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#061a3a] group-hover:bg-[#C8A951] flex items-center justify-center text-[#C8A951] group-hover:text-[#061a3a] mb-8 transition-all duration-700">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#061a3a] group-hover:text-white mb-4 transition-colors duration-700">
                  {feature.title}
                </h3>
                <p className="text-[#848484] group-hover:text-white/60 leading-relaxed text-lg transition-colors duration-700">
                  {feature.description}
                </p>
              </div>
            </CursorParallax>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
