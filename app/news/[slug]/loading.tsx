import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NewsArticleLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link skeleton */}
          <div className="w-32 h-4 bg-gray-200 rounded mb-10 animate-pulse" />

          {/* Categories skeleton */}
          <div className="flex gap-2 mb-4">
            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Date skeleton */}
          <div className="w-28 h-4 bg-gray-200 rounded mb-4 animate-pulse" />

          {/* Title skeleton */}
          <div className="w-3/4 h-10 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="w-1/2 h-10 bg-gray-200 rounded mb-10 animate-pulse" />

          {/* Image skeleton */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl mb-12 animate-pulse" />

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-5/6 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-5/6 h-5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
