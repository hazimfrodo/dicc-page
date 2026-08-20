import { getPosts, formatDate, stripHtml } from "@/lib/wordpress";
import NewsClient from "./NewsClient";

export default async function News() {
  const posts = await getPosts(3);

  const news = posts.map((post) => ({
    title: post.title.rendered
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&#8211;/g, "–"),
    excerpt: stripHtml(post.excerpt.rendered).substring(0, 120) + "...",
    date: formatDate(post.date),
    slug: post.slug,
    categories:
      post._embedded?.["wp:term"]?.[0]?.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
      })) || [],
  }));

  return <NewsClient news={news} />;
}
