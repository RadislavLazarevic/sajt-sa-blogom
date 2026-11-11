import type { Metadata } from "next";
import PostGrid from "@/components/PostGrid";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Svi postovi o programiranju i tehnologiji.",
};

export default function BlogPage() {
  return (
    <div className="w-full px-6 py-12 md:px-14">
      <h1 className="mb-10 text-4xl font-semibold tracking-tight">Blog</h1>
      <PostGrid posts={getAllPosts()} />
    </div>
  );
}
