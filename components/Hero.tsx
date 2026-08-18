"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CursorParallax, ScrollParallax } from "./Parallax";

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-triggered parallax for hero content
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fades up and out on scroll
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "80% top",
          scrub: 0.5,
        },
      });

      // Title parallax - moves faster
      gsap.to(titleRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      // Subtitle parallax - moves slower
      gsap.to(subtitleRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // CTA parallax
      gsap.to(ctaRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Three.js Canvas Background - moves with cursor */}
      <CursorParallax speed={-30} className="absolute inset-0">
        <HPCScene className="w-full h-full" />
      </CursorParallax>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1927]/90 via-[#0d1927]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1927]/80 via-transparent to-[#0d1927]/30" />

      {/* Content with parallax layers */}
      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Logo + Label - moves with cursor */}
        <CursorParallax speed={15}>
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Image src="/dicc-logo.png" alt="DICC Logo" width={48} height={48} className="rounded-lg" />
            <p className="text-[#C8A951] text-sm font-semibold tracking-widest uppercase">
              Universiti Malaya
            </p>
          </div>
        </CursorParallax>

        {/* Title - moves with cursor */}
        <CursorParallax speed={10}>
          <h1
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl transition-all duration-1000 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Data-Intensive
            <br />
            Computing Centre
          </h1>
        </CursorParallax>

        {/* Subtitle - moves with cursor */}
        <CursorParallax speed={5}>
          <p
            ref={subtitleRef}
            className={`mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed transition-all duration-1000 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Accelerating Scientific Discovery through High-Performance Computing,
            Data Management, and Research Computing Solutions.
          </p>
        </CursorParallax>

        {/* CTAs - moves with cursor */}
        <CursorParallax speed={8}>
          <div
            ref={ctaRef}
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-1000 delay-[900ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#services"
              className="px-8 py-3.5 bg-[#C8A951] text-[#061a3a] font-semibold rounded-full hover:bg-[#A8893D] transition-all duration-300 hover:shadow-xl hover:shadow-[#C8A951]/25 hover:-translate-y-0.5"
            >
              Explore Services
            </a>
            <a
              href="https://docs.dicc.um.edu.my/s/start"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </div>
        </CursorParallax>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1200ms] z-10 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#C8A951]/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
