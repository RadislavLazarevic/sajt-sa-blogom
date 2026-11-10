import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-zinc-600 dark:text-zinc-400">Još nema objavljenih postova.</p>;
  }

  return (
    <ul className="flex flex-col gap-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <article>
            <time dateTime={post.date} className="text-sm text-zinc-500">
              {formatDate(post.date)}
            </time>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
                {post.title}
              </Link>
            </h3>
            {post.description && (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.description}</p>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
