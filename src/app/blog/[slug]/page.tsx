import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryBadge from "@/components/CategoryBadge";
import ShareButtons from "@/components/ShareButtons";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostMeta } from "@/lib/posts";
import { withBasePath } from "@/lib/site";

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
    <article className="flex flex-col">
      <header
        data-hero
        // Pulls the hero up under the transparent header (h-20); data-hero switches it to light text
        className="relative -mt-20 flex h-[67svh] min-h-80 items-center justify-center overflow-hidden bg-[#10142a]"
      >
        {post.image && (
          <Image src={withBasePath(post.image)} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex max-w-4xl flex-col items-center gap-5 px-6 pt-20">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2" aria-label="Kategorije">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <CategoryBadge name={tag} />
                </li>
              ))}
            </ul>
          )}
          <h1 className="text-center text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {post.title}
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <p className="mb-10 text-sm text-zinc-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
          čitanja
        </p>
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <Content />
        </div>
        <ShareButtons slug={post.slug} title={post.title} />
        <Link
          href="/blog"
          className="mt-12 inline-block font-medium underline-offset-4 hover:underline"
        >
          ← Svi postovi
        </Link>
      </div>
    </article>
  );
}
