import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, formatDate, stripHtml } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.title.rendered.replace(/&#8217;/g, "'").replace(/&amp;/g, "&");
  const description = stripHtml(post.excerpt.rendered);

  return {
    title: `${title} | DICC`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://dicc.um.edu.my/news/${post.slug}`,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.title.rendered
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–");
  const content = post.content.rendered;
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name || "DICC";

  const relatedPosts = await getRelatedPosts(post.id, post.categories, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/#news"
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
            Back to News
          </Link>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat: { id: number; name: string; slug: string }) => (
              <span
                key={cat.id}
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#192f59]/10 text-[#192f59]"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Date */}
          <time className="text-sm text-[#848484]">{formatDate(post.date)}</time>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061a3a] leading-tight tracking-tight mt-4 mb-3">
            {title}
          </h1>

          {/* Author */}
          <p className="text-sm text-[#848484] mb-10">
            Published by <span className="font-medium text-[#061a3a]">{author}</span>
          </p>

          {/* Featured Image */}
          {featuredImage && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <Image
                src={featuredImage}
                alt={title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <article
            className="wp-content text-[#333] text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Categories at bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-[#848484]">
              Categories:{" "}
              {categories.map((cat: { id: number; name: string }, i: number) => (
                <span key={cat.id}>
                  <span className="font-medium text-[#061a3a]">{cat.name}</span>
                  {i < categories.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#061a3a] mb-8">
                Related Posts
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => {
                  const relatedTitle = related.title.rendered
                    .replace(/&#8217;/g, "'")
                    .replace(/&amp;/g, "&")
                    .replace(/&#8211;/g, "–");
                  const relatedExcerpt = stripHtml(related.excerpt.rendered);
                  const relatedCategories =
                    related._embedded?.["wp:term"]?.[0] || [];

                  return (
                    <Link
                      key={related.id}
                      href={`/news/${related.slug}`}
                      className="group p-6 rounded-2xl bg-[#f2f2f5] hover:bg-[#061a3a] transition-all duration-500"
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        {relatedCategories.map(
                          (cat: { id: number; name: string }) => (
                            <span
                              key={cat.id}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#192f59]/10 text-[#192f59] group-hover:bg-[#C8A951]/20 group-hover:text-[#C8A951] transition-colors"
                            >
                              {cat.name}
                            </span>
                          )
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#061a3a] group-hover:text-white transition-colors leading-snug mb-2">
                        {relatedTitle}
                      </h3>
                      <p className="text-xs text-[#848484] group-hover:text-white/40 transition-colors mb-2">
                        {formatDate(related.date)}
                      </p>
                      <p className="text-sm text-[#848484] group-hover:text-white/50 transition-colors line-clamp-3">
                        {relatedExcerpt.substring(0, 120)}...
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
