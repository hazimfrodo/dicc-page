"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { CursorParallax } from "./Parallax";
import { AppleReveal, AppleStagger } from "./AppleReveal";

const NewsBackground = dynamic(() => import("./Scene3D/NewsBackground"), {
  ssr: false,
});

interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  categories: { name: string; slug: string }[];
}

function getCategoryColor(name: string) {
  switch (name.toLowerCase()) {
    case "hpc":
      return "bg-[#192f59]/10 text-[#192f59]";
    case "events":
      return "bg-[#C8A951]/10 text-[#A8893D]";
    case "news":
      return "bg-[#7360ff]/10 text-[#7360ff]";
    default:
      return "bg-[#192f59]/10 text-[#192f59]";
  }
}

export default function NewsClient({ news }: { news: NewsItem[] }) {
  return (
    <section id="news" className="relative py-32 md:py-44 bg-white overflow-hidden">
      <NewsBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AppleReveal direction="up">
          <div className="text-center mb-24">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Latest News
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#061a3a] max-w-4xl mx-auto leading-[1.1] tracking-tight">
              Stay Updated
            </h2>
          </div>
        </AppleReveal>

        <AppleStagger className="grid md:grid-cols-3 gap-10" stagger={0.12} direction="up" distance={50}>
          {news.map((item) => (
            <CursorParallax key={item.slug} speed={6}>
              <Link
                href={`/news/${item.slug}`}
                className="group block h-full"
              >
                <div className="p-8 rounded-3xl bg-[#f2f2f5] hover:bg-[#061a3a] transition-all duration-700 h-full">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.categories.map((cat) => (
                      <span
                        key={cat.slug}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(cat.name)} group-hover:bg-[#C8A951]/20 group-hover:text-[#C8A951] transition-colors duration-700`}
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-[#061a3a] group-hover:text-white transition-colors duration-700 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#848484] group-hover:text-white/40 transition-colors duration-700">{item.date}</p>
                  <p className="mt-4 text-[#848484] group-hover:text-white/50 leading-relaxed line-clamp-3 transition-colors duration-700">
                    {item.excerpt}
                  </p>
                  <div className="mt-6 text-[#C8A951] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Read more &rarr;
                  </div>
                </div>
              </Link>
            </CursorParallax>
          ))}
        </AppleStagger>

        <AppleReveal delay={0.3}>
          <div className="text-center mt-16">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#061a3a] text-white text-lg font-semibold rounded-full hover:bg-[#192f59] transition-all duration-500 hover:shadow-xl hover:scale-105 group"
            >
              View All News
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </AppleReveal>
      </div>
    </section>
  );
}
