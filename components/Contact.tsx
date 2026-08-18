"use client";

import { ScrollParallax, CursorParallax } from "./Parallax";
import { AppleReveal, AppleStagger } from "./AppleReveal";

const contactInfo = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Office Location",
    lines: [
      "Level 2, High Impact Research (HIR) Building,",
      "Lingkungan Budi, University of Malaya,",
      "50603 Kuala Lumpur.",
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Email Us",
    lines: ["dicc@um.edu.my", "", "Mon - Fri", "09:00 - 16:00"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Quick Links",
    links: [
      { label: "Service Desk", href: "https://jira.dicc.um.edu.my/servicedesk" },
      { label: "Documentation", href: "https://docs.dicc.um.edu.my/s/start" },
      { label: "Telegram Group", href: "https://t.me/+o1CxYhbTgyA0NDk1" },
    ],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-44 bg-[#f2f2f5]">
      <div className="max-w-7xl mx-auto px-6">
        <AppleReveal direction="up">
          <div className="text-center mb-24">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Contact Us
            </p>
          </div>
        </AppleReveal>

        <AppleStagger className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto" stagger={0.12} direction="up" distance={40}>
          {contactInfo.map((item) => (
            <CursorParallax key={item.title} speed={20}>
              <div className="p-10 rounded-[2rem] bg-white shadow-xl shadow-black/[0.03] h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#061a3a] flex items-center justify-center text-[#C8A951] mb-7">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#061a3a] mb-4">
                  {item.title}
                </h3>
                {item.lines && (
                  <div className="text-[#848484] text-base leading-relaxed">
                    {item.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
                {item.links && (
                  <div className="flex flex-col gap-3">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#192f59] text-base font-medium hover:text-[#C8A951] transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </CursorParallax>
          ))}
        </AppleStagger>
      </div>
    </section>
  );
}
