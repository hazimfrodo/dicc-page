"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CursorParallax } from "./Parallax";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HPCScene = dynamic(() => import("./Scene3D/HPCScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1927] to-[#192f59]" />
  ),
});

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Apple-style scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content scales down and fades on scroll (like iPhone product page)
      gsap.to(contentRef.current, {
        scale: 0.92,
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[110vh] overflow-hidden">
      {/* Three.js Canvas Background */}
      <CursorParallax speed={-30} className="absolute inset-0">
        <HPCScene className="w-full h-full" />
      </CursorParallax>

      {/* Gradient overlays - Apple-style clean gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1927]/40 via-transparent to-[#0d1927]/90" />

      {/* Content - Apple-style centered, large type */}
      <div ref={contentRef} className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
            <Image src="/dicc-logo.png" alt="DICC" width={20} height={20} className="rounded" />
            <span className="text-white/80 text-xs font-medium tracking-wider uppercase">Universiti Malaya</span>
          </div>
        </div>

        {/* Main heading - Apple large type */}
        <h1
          className={`text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Data-Intensive
          <br />
          Computing Centre
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-7 text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-light transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Accelerating Scientific Discovery through
          <br className="hidden md:block" /> High-Performance Computing and Research Solutions.
        </p>

        {/* CTAs */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-5 transition-all duration-1000 delay-[900ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#services"
            className="px-10 py-4 bg-[#C8A951] text-[#061a3a] text-lg font-semibold rounded-full hover:bg-[#A8893D] transition-all duration-500 hover:shadow-2xl hover:shadow-[#C8A951]/30 hover:scale-105"
          >
            Explore Services
          </a>
          <a
            href="https://docs.dicc.um.edu.my/s/start"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 text-white/80 text-lg font-medium rounded-full hover:text-white hover:bg-white/5 transition-all duration-500"
          >
            Get Started &rarr;
          </a>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-[1200ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
