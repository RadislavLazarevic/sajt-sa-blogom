import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/80 bg-black/30 px-2 py-0.5 text-[13px] font-medium text-white backdrop-blur-sm">
      {children}
    </span>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex w-full flex-col rounded-sm bg-[#10142a] p-6 text-[#ededea] transition-colors hover:bg-[#161b38] md:p-7"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-white/5">
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <CategoryBadge key={tag} name={tag} />
          ))}
          <Badge>{post.readingMinutes} min</Badge>
        </div>
      </div>
      <time dateTime={post.date} className="mt-5 text-sm text-[#ededea]/55">
        {formatDate(post.date)}
      </time>
      <h3 className="mt-1.5 text-lg leading-snug font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
        {post.title}
      </h3>
      {post.description && (
        <p className="mt-2 line-clamp-2 text-[15px] text-[#ededea]/70">{post.description}</p>
      )}
    </Link>
  );
}

export default function PostGrid({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-zinc-600 dark:text-zinc-400">Još nema objavljenih postova.</p>;
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {posts.map((post) => (
        <li key={post.slug} className="flex">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
