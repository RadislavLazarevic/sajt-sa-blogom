import { siteConfig } from "@/lib/site";

// Plain share links (no third-party scripts), each network's official share URL.
const networks = [
  {
    name: "Facebook",
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    icon: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    name: "X (Twitter)",
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    icon: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  },
  {
    name: "LinkedIn",
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    icon: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
];

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = encodeURIComponent(`${siteConfig.url}/blog/${slug}`);
  const text = encodeURIComponent(title);

  return (
    <section className="mt-16 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
      <h2 className="text-sm font-medium text-zinc-500">Podeli ovaj post</h2>
      <ul className="mt-4 flex flex-wrap justify-center gap-3">
        {networks.map((network) => (
          <li key={network.name}>
            <a
              href={network.href(url, text)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                <path d={network.icon} />
              </svg>
              {network.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
