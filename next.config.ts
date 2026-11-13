import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no server: no Server Actions, no image optimization)
  output: "export",
  // "/sajt-sa-blogom" on GitHub Pages (set by the deploy workflow), "" locally
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  // Emit /blog/index.html instead of /blog.html so plain static hosting resolves every route
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // cacheComponents/partialPrefetching are off: they conflict with output: "export"
  // route handlers (rss.xml, robots, sitemap), and the whole site is static anyway.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugin names as strings
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
