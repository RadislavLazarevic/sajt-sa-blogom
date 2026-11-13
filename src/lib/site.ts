// Sub-path the site is served from (e.g. "/sajt-sa-blogom" on GitHub Pages), "" locally.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// next/link adds basePath automatically; plain src/href to files in public/ (and next/image) don't.
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

export const siteConfig = {
  name: "Radislav",
  title: "Radislav — blog o programiranju",
  description: "Lični blog o programiranju, tehnologiji i svemu što usput naučim.",
  // Full public URL including basePath, no trailing slash (set by the deploy workflow)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Formspree form ID (the part after formspree.io/f/); public by design
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
  locale: "sr_RS",
  social: {
    instagram: "https://www.instagram.com/radislavl/",
    linkedin: "https://www.linkedin.com/in/radislav-lazarevi%C4%87-4bb15627b/",
    tiktok: "https://www.tiktok.com/@radislavl",
  },
};
