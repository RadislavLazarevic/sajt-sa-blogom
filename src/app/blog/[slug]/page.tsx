import type { Metadata } from "next";
import Image from "next/image";
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
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm text-zinc-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
          čitanja
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{post.title}</h1>
        {post.image && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm bg-[#10142a]">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        )}
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
