import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Guidelines | DICC",
  description:
    "Guidelines for using DICC services at Universiti Malaya.",
};

const guidelines = [
  {
    id: "G001",
    title: "HPC Service Guideline",
    description:
      "Establishes what you can expect from DICC and what we expect from you when using our HPC services.",
    driveId: "10oiU40rzw2Xdt0bwKLtcUS0p7SulYzLY",
  },
  {
    id: "G002",
    title: "HPC Resource Limits Guideline",
    description:
      "Guidelines on resource allocation limits, quotas, and fair usage policies for the HPC cluster.",
    driveId: "15fGZqBPdCevQRTY0-zHSlOYsDnw70VqE",
  },
  {
    id: "G003",
    title: "DICC Account Management Guideline",
    description:
      "Procedures for account creation, password management, and access control for DICC services.",
    driveId: "1VbHyCPGQXO9s0EDW-rhPU7Dsyc0ST658",
  },
  {
    id: "G004",
    title: "DICC Service Desk Guideline",
    description:
      "How to use the DICC Service Desk for technical support and issue reporting.",
    driveId: "1I0PrSRz9II-uWl2KINta7fSbuIT9-Vpv",
  },
  {
    id: "G005",
    title: "HPC Job Management Guideline",
    description:
      "Best practices for submitting, managing, and monitoring HPC jobs on the cluster.",
    driveId: "1HFBE6NF2t4rtHeruQlYQDjRmzL1Hbtkt",
  },
];

export default function GuidelinesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#848484] hover:text-[#061a3a] transition-colors mb-10 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Documentation
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#061a3a] leading-[1.1] tracking-tight">
              Guidelines
            </h1>
          </div>

          {/* Introduction */}
          <div className="bg-[#f2f2f5] rounded-2xl p-8 mb-12">
            <p className="text-[#061a3a] text-lg leading-relaxed">
              We know it&apos;s tempting to skip these Guidelines, but it&apos;s
              important to establish what you can expect from us as you use DICC
              services, and what we expect from you. Understanding these
              guidelines is important because, by using our services, you&apos;re
              agreeing to the items defined in the guidelines.
            </p>
          </div>

          {/* Guidelines List */}
          <div className="space-y-4">
            {guidelines.map((guide) => (
              <Link
                key={guide.id}
                href={`/guidelines/${guide.id}`}
                className="group flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-[#C8A951]/30 bg-white hover:shadow-xl hover:shadow-[#C8A951]/5 transition-all duration-500"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#061a3a] flex items-center justify-center text-[#C8A951] font-bold text-sm flex-shrink-0">
                    {guide.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#061a3a] group-hover:text-[#C8A951] transition-colors">
                      [{guide.id}] {guide.title}
                    </h3>
                    <p className="text-sm text-[#848484] mt-1">
                      {guide.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#848484] group-hover:text-[#C8A951] transition-colors flex-shrink-0 ml-4">
                  <span className="text-sm font-medium hidden md:block">
                    View PDF
                  </span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
