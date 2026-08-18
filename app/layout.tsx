import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data-Intensive Computing Centre | Universiti Malaya",
  description:
    "DICC provides world-class research computing infrastructure, High Performance Computing, and data management solutions to empower researchers at Universiti Malaya.",
  keywords: [
    "HPC",
    "High Performance Computing",
    "Data Intensive Computing",
    "Universiti Malaya",
    "Research Computing",
    "DICC",
  ],
  openGraph: {
    title: "Data-Intensive Computing Centre | Universiti Malaya",
    description:
      "Accelerating Scientific Discovery through High-Performance Computing",
    url: "https://dicc.um.edu.my",
    siteName: "DICC Universiti Malaya",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
