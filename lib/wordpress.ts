const WP_API_BASE = "https://www.dicc.um.edu.my/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  featured_media: number;
  _embedded?: {
    author?: { name: string; avatar_urls?: Record<string, string> }[];
    "wp:term"?: { id: number; name: string; slug: string; link: string }[][];
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const url = `${WP_API_BASE}/posts?slug=${encodeURIComponent(decodedSlug)}&_embed`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(
  postId: number,
  categoryIds: number[],
  limit = 3
): Promise<WPPost[]> {
  try {
    if (categoryIds.length === 0) return [];
    const categories = categoryIds.join(",");
    const url = `${WP_API_BASE}/posts?categories=${categories}&per_page=${limit + 5}&_embed`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const posts: WPPost[] = await res.json();
    return posts.filter((p) => p.id !== postId).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPosts(perPage = 3): Promise<WPPost[]> {
  try {
    const url = `${WP_API_BASE}/posts?per_page=${perPage}&_embed`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getCategories(
  categoryIds: number[]
): Promise<Category[]> {
  try {
    if (categoryIds.length === 0) return [];
    const ids = categoryIds.join(",");
    const url = `${WP_API_BASE}/categories?include=${ids}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
