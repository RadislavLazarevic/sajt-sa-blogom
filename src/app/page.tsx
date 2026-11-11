import Link from "next/link";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import PostGrid from "@/components/PostGrid";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero postCount={posts.length} />

      <section className="w-full px-6 py-20 md:px-14">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-normal tracking-tight md:text-5xl">Najnoviji postovi</h2>
          <Link href="/blog" className="shrink-0 font-medium underline-offset-4 hover:underline">
            Svi postovi ↗
          </Link>
        </div>
        <PostGrid posts={posts.slice(0, 8)} />
      </section>

      <Newsletter />
    </>
  );
}
