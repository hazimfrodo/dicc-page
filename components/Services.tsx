"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";
import { AppleReveal, AppleStagger } from "./AppleReveal";

const ServicesBackground = dynamic(
  () => import("./Scene3D/ServicesBackground"),
  { ssr: false }
);

const services = [
  {
    title: "High Performance Computing",
    description:
      "Access to GPU clusters, parallel computing resources, and optimized HPC workflows for computationally intensive research.",
    href: "https://docs.dicc.um.edu.my/s/hpc",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Research Data Repository",
    description:
      "Secure, citable data storage and sharing platform for research datasets with DOI assignment and long-term preservation.",
    href: "https://researchdata.um.edu.my",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: "DMP Roadmap",
    description:
      "Data Management Planning tools to help researchers create comprehensive data management strategies.",
    href: "https://dmp.dicc.um.edu.my",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Account Management",
    description:
      "Easy account provisioning, password management, and access control for all computing resources.",
    href: "https://sso.dicc.um.edu.my/",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    title: "Service Desk",
    description:
      "Dedicated technical support through our Jira-powered service desk for rapid issue resolution.",
    href: "https://jira.dicc.um.edu.my/servicedesk",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Service Status",
    description:
      "Real-time monitoring and status updates for all DICC services and infrastructure availability.",
    href: "https://stats.uptimerobot.com/JKYM8t8NMx",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 md:py-44 bg-[#0d1927] overflow-hidden">
      <ScrollParallax speed={0.2} className="absolute inset-0">
        <ServicesBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AppleReveal direction="up" distance={40}>
          <div className="text-center mb-24">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Services
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto leading-[1.1] tracking-tight">
              Comprehensive Research
              <br />
              Computing Solutions
            </h2>
          </div>
        </AppleReveal>

        <AppleStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1} direction="up" distance={40}>
          {services.map((service) => (
            <CursorParallax key={service.title} speed={18}>
              <a
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C8A951]/40 hover:bg-white/10 transition-all duration-500 block h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C8A951] flex items-center justify-center text-[#061a3a] mb-7 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/40 text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 text-[#C8A951] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Learn more &rarr;
                </div>
              </a>
            </CursorParallax>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
