"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Image
            src="/dicc-logo.png"
            alt="DICC Logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span
            className={`font-semibold text-sm tracking-wide transition-colors duration-300 ${
              scrolled ? "text-[#061a3a]" : "text-white"
            }`}
          >
            Data Intensive Computing Centre (DICC)
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-[#C8A951] ${
                scrolled ? "text-gray-700" : "text-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://forms.gle/nd9Jp5f1RtmCJbdN9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#192f59] text-white text-sm font-semibold rounded-full hover:bg-[#0d1927] transition-all duration-300 hover:shadow-lg hover:shadow-[#192f59]/25"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-[#061a3a]" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 font-medium py-2 hover:text-[#C8A951] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://forms.gle/nd9Jp5f1RtmCJbdN9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-2.5 bg-[#192f59] text-white text-sm font-semibold rounded-full text-center hover:bg-[#0d1927] transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
