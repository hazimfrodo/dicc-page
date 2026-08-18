"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";

const CTABackground = dynamic(() => import("./Scene3D/CTABackground"), {
  ssr: false,
});

export default function CTA() {
  return (
    <section className="relative py-20 md:py-24 bg-[#C8A951] overflow-hidden">
      <ScrollParallax speed={0.2} className="absolute inset-0">
        <CTABackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollParallax speed={0.1}>
          <CursorParallax speed={12}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061a3a] leading-tight">
              Ready to Accelerate Your Research?
            </h2>
          </CursorParallax>
        </ScrollParallax>
        <ScrollParallax speed={0.08}>
          <p className="mt-5 text-[#061a3a]/70 text-lg max-w-2xl mx-auto">
            Get access to world-class computing resources and expert support from
            DICC
          </p>
        </ScrollParallax>
        <ScrollParallax speed={0.06}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://forms.gle/nd9Jp5f1RtmCJbdN9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#061a3a] text-white font-semibold rounded-full hover:bg-[#192f59] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Request Account
            </a>
            <a
              href="mailto:dicc@um.edu.my"
              className="px-8 py-3.5 border-2 border-[#061a3a]/40 text-[#061a3a] font-semibold rounded-full hover:bg-[#061a3a]/10 hover:border-[#061a3a] transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </ScrollParallax>
      </div>
    </section>
  );
}
