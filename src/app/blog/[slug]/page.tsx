import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostMeta } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <article>
      <header className="mb-10">
        <time dateTime={post.date} className="text-sm text-zinc-500">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{post.title}</h1>
      </header>
      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <Content />
      </div>
      <Link href="/blog" className="mt-16 inline-block font-medium underline-offset-4 hover:underline">
        ← Svi postovi
      </Link>
    </article>
  );
}
