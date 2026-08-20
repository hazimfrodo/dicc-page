import Link from "next/link";
import Navbar from "@/components/Navbar";

const guidelines: Record<
  string,
  { title: string; driveId: string }
> = {
  G001: {
    title: "HPC Service Guideline",
    driveId: "10oiU40rzw2Xdt0bwKLtcUS0p7SulYzLY",
  },
  G002: {
    title: "HPC Resource Limits Guideline",
    driveId: "15fGZqBPdCevQRTY0-zHSlOYsDnw70VqE",
  },
  G003: {
    title: "DICC Account Management Guideline",
    driveId: "1VbHyCPGQXO9s0EDW-rhPU7Dsyc0ST658",
  },
  G004: {
    title: "DICC Service Desk Guideline",
    driveId: "1I0PrSRz9II-uWl2KINta7fSbuIT9-Vpv",
  },
  G005: {
    title: "HPC Job Management Guideline",
    driveId: "1HFBE6NF2t4rtHeruQlYQDjRmzL1Hbtkt",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = guidelines[id.toUpperCase()];
  if (!guide) return { title: "Guideline Not Found" };

  return {
    title: `[${id.toUpperCase()}] ${guide.title} | DICC`,
  };
}

export default async function GuidelinePDFPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = guidelines[id.toUpperCase()];

  if (!guide) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-24 pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <Link
              href="/guidelines"
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
              Back to Guidelines
            </Link>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-[#061a3a] mb-4">
                Guideline Not Found
              </h1>
              <p className="text-[#848484]">
                The requested guideline could not be found.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  const pdfUrl = `https://drive.google.com/file/d/${guide.driveId}/preview`;

  return (
    <>
      <Navbar />
      <main className="h-screen flex flex-col bg-white pt-16">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/guidelines"
              className="inline-flex items-center gap-2 text-[#848484] hover:text-[#061a3a] transition-colors group"
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
              Back
            </Link>
            <div className="w-px h-6 bg-gray-200" />
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#192f59]/10 text-[#192f59] mr-2">
                {id.toUpperCase()}
              </span>
              <span className="text-sm font-medium text-[#061a3a]">
                {guide.title}
              </span>
            </div>
          </div>
          <a
            href={`https://drive.google.com/file/d/${guide.driveId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#848484] hover:text-[#C8A951] transition-colors flex items-center gap-1"
          >
            Open in Drive
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title={guide.title}
          />
        </div>
      </main>
    </>
  );
}
