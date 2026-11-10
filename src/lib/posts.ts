import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
};

function readPostMeta(slug: string): PostMeta {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { data } = matter(file);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    // YAML parses unquoted dates as Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    draft: data.draft === true,
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
