import type { Metadata } from "next";
import AboutContent from "@/content/o-meni.mdx";

export const metadata: Metadata = {
  title: "O meni",
  description: "Ko sam i o čemu pišem.",
};

export default function AboutPage() {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      <AboutContent />
    </div>
  );
}
