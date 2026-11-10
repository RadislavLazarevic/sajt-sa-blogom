import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Svi postovi o programiranju i tehnologiji.",
};

export default function BlogPage() {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold tracking-tight">Blog</h1>
      <PostList posts={getAllPosts()} />
    </div>
  );
}
