import Link from "next/link";
import { getPosts, formatDate, stripHtml, type WPPost } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "All News | DICC",
  description: "Latest news and updates from the Data-Intensive Computing Centre, Universiti Malaya.",
};

async function getAllPosts(page: number, perPage: number) {
  const posts = await getPosts(perPage);
  return posts;
}

export default async function AllNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const perPage = 12;
  const posts = await getAllPosts(currentPage, perPage);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#C8A951] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              News & Updates
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#061a3a] leading-[1.1] tracking-tight">
              Latest News
            </h1>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: WPPost) => {
                const title = post.title.rendered
                  .replace(/&#8217;/g, "'")
                  .replace(/&amp;/g, "&")
                  .replace(/&#8211;/g, "–");
                const excerpt = stripHtml(post.excerpt.rendered);
                const categories = post._embedded?.["wp:term"]?.[0] || [];
                const featuredImage =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group block h-full"
                  >
                    <div className="rounded-2xl bg-[#f2f2f5] hover:bg-[#061a3a] transition-all duration-700 overflow-hidden h-full flex flex-col">
                      {/* Featured Image */}
                      {featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-1">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {categories.map(
                            (cat: { id: number; name: string }) => (
                              <span
                                key={cat.id}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#192f59]/10 text-[#192f59] group-hover:bg-[#C8A951]/20 group-hover:text-[#C8A951] transition-colors duration-700"
                              >
                                {cat.name}
                              </span>
                            )
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-bold text-[#061a3a] group-hover:text-white transition-colors duration-700 leading-snug mb-2">
                          {title}
                        </h2>

                        {/* Date */}
                        <p className="text-xs text-[#848484] group-hover:text-white/40 transition-colors duration-700 mb-3">
                          {formatDate(post.date)}
                        </p>

                        {/* Excerpt */}
                        <p className="text-sm text-[#848484] group-hover:text-white/50 leading-relaxed line-clamp-3 transition-colors duration-700 flex-1">
                          {excerpt.substring(0, 150)}...
                        </p>

                        {/* Read more */}
                        <div className="mt-4 text-[#C8A951] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Read more &rarr;
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#848484] text-lg">No news articles found.</p>
            </div>
          )}

          {/* Pagination */}
          {posts.length >= perPage && (
            <div className="flex justify-center items-center gap-6 mt-16">
              {currentPage > 1 && (
                <Link
                  href={`/news?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[#061a3a] font-medium rounded-full border border-gray-200 hover:border-[#061a3a] hover:bg-[#061a3a] hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Previous
                </Link>
              )}

              <span className="text-[#848484] text-sm">
                Page {currentPage}
              </span>

              {posts.length === perPage && (
                <Link
                  href={`/news?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[#061a3a] font-medium rounded-full border border-gray-200 hover:border-[#061a3a] hover:bg-[#061a3a] hover:text-white transition-all duration-300"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
