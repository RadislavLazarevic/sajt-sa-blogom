import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");
const WORDS_PER_MINUTE = 200;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  image?: string;
  tags: string[];
  readingMinutes: number;
};

function readPostMeta(slug: string): PostMeta {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(file);
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    // YAML parses unquoted dates as Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    draft: data.draft === true,
    image: typeof data.image === "string" ? data.image : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

// Sync fs reads are predictable, so they end up in the static shell without "use cache"
export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPostMeta(file.replace(/\.mdx$/, "")))
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
