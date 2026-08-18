"use client";

import dynamic from "next/dynamic";
import { ScrollParallax, CursorParallax } from "./Parallax";

const NewsBackground = dynamic(() => import("./Scene3D/NewsBackground"), {
  ssr: false,
});

const news = [
  {
    category: "HPC",
    categoryColor: "bg-[#192f59]/10 text-[#192f59]",
    title: "Transitioning to RStudio Server 2026 (R 4.6.1)",
    date: "Jul 28, 2026",
    excerpt:
      "We are excited to roll out R 4.6.1 on the cluster with a smooth transition for your current workflows...",
    href: "https://www.dicc.um.edu.my/2026/07/28/%f0%9f%93%a2-important-update-transitioning-to-rstudio-server-2026-r-4-6-1-%e2%9a%99%ef%b8%8f%f0%9f%93%88/",
  },
  {
    category: "HPC",
    categoryColor: "bg-[#192f59]/10 text-[#192f59]",
    title: "Resource Utilization & Fairshare Policies",
    date: "Jul 24, 2026",
    excerpt:
      "Reminder on resource requests, monitoring, and Slurm Fairshare policies for efficient cluster usage...",
    href: "https://www.dicc.um.edu.my/2026/07/24/resource-utilization-fairshare-policies/",
  },
  {
    category: "Events",
    categoryColor: "bg-[#C8A951]/10 text-[#A8893D]",
    title: "DICC Hosts Delegates from Faculty of AI, UTM",
    date: "May 15, 2026",
    excerpt:
      "DICC welcomed a delegation from the newly established Faculty of Artificial Intelligence at UTM...",
    href: "https://www.dicc.um.edu.my/2026/05/15/bridging-innovations-dicc-hosts-delegates-from-faculty-of-ai-utm/",
  },
];

export default function News() {
  return (
    <section id="news" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <ScrollParallax speed={0.15} className="absolute inset-0">
        <NewsBackground />
      </ScrollParallax>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollParallax speed={0.1}>
          <div className="text-center mb-16">
            <p className="text-[#C8A951] text-sm font-semibold tracking-widest uppercase mb-3">
              Latest News
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061a3a] max-w-3xl mx-auto leading-tight">
              Stay Updated with DICC
            </h2>
          </div>
        </ScrollParallax>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <ScrollParallax key={item.title} speed={0.06 + i * 0.03}>
              <CursorParallax speed={8}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-7 rounded-2xl border border-gray-100 hover:border-[#C8A951]/30 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-[#C8A951]/5 transition-all duration-500 hover:-translate-y-1 block h-full"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#061a3a] group-hover:text-[#C8A951] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#848484]">{item.date}</p>
                  <p className="mt-3 text-sm text-[#848484] leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </a>
              </CursorParallax>
            </ScrollParallax>
          ))}
        </div>

        <ScrollParallax speed={0.05}>
          <div className="text-center mt-12">
            <a
              href="https://www.dicc.um.edu.my/category/news/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#192f59] font-semibold hover:text-[#C8A951] transition-colors group"
            >
              View All News
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </ScrollParallax>
      </div>
    </section>
  );
}
