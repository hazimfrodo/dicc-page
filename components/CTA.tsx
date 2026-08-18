"use client";

import dynamic from "next/dynamic";
import { ScrollParallax } from "./Parallax";
import { AppleReveal } from "./AppleReveal";

const CTABackground = dynamic(() => import("./Scene3D/CTABackground"), {
  ssr: false,
});

export default function CTA() {
  return (
    <section className="relative py-32 md:py-44 bg-[#C8A951] overflow-hidden">
      <ScrollParallax speed={0.2} className="absolute inset-0">
        <CTABackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AppleReveal direction="scale" distance={30}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#061a3a] leading-[1.1] tracking-tight">
            Ready to Accelerate
            <br />
            Your Research?
          </h2>
        </AppleReveal>
        <AppleReveal delay={0.15}>
          <p className="mt-8 text-[#061a3a]/60 text-xl max-w-2xl mx-auto font-light">
            Get access to world-class computing resources and expert support from DICC
          </p>
        </AppleReveal>
        <AppleReveal delay={0.3}>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a
              href="https://forms.gle/nd9Jp5f1RtmCJbdN9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#061a3a] text-white text-lg font-semibold rounded-full hover:bg-[#192f59] transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              Request Account
            </a>
            <a
              href="mailto:dicc@um.edu.my"
              className="px-10 py-4 border-2 border-[#061a3a]/30 text-[#061a3a] text-lg font-medium rounded-full hover:bg-[#061a3a]/10 hover:border-[#061a3a] transition-all duration-500"
            >
              Contact Us
            </a>
          </div>
        </AppleReveal>
      </div>
    </section>
  );
}
