import Link from "next/link";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <div className="flex flex-col gap-16">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">Zdravo, ja sam Radislav 👋</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Ovde pišem o programiranju, tehnologiji i stvarima koje učim usput.{" "}
          <Link href="/o-meni" className="font-medium text-foreground underline underline-offset-4">
            Više o meni
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Najnoviji postovi
        </h2>
        <PostList posts={latestPosts} />
        <Link
          href="/blog"
          className="mt-10 inline-block font-medium underline-offset-4 hover:underline"
        >
          Svi postovi →
        </Link>
      </section>
    </div>
  );
}
