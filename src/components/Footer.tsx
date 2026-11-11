import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

// Evaluated once at build time, so it stays out of request-time rendering
const YEAR = new Date().getFullYear();

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E\")";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.35h-4v-4.74c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.82 1.23-1.82 2.5v4.83h-4v-11Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a7.9 7.9 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6Z" />
    </svg>
  );
}

const socialLinks = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.social.tiktok, label: "TikTok", Icon: TikTokIcon },
];

const pageLinks = [
  { href: "/", label: "Početna" },
  { href: "/blog", label: "Blog" },
  { href: "/o-meni", label: "O meni" },
];

const resourceLinks = [
  { href: "/rss.xml", label: "RSS feed" },
  { href: "/sitemap.xml", label: "Mapa sajta" },
];

const linkClass = "text-[#ededea]/55 transition-colors hover:text-[#ededea]";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-[#ededea]">{title}</h2>
      <ul className="mt-6 flex flex-col gap-4 text-[17px]">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const latestPosts = getAllPosts().slice(0, 4);

  return (
    <footer className="bg-[#161616] text-[#ededea]" style={{ backgroundImage: NOISE }}>
      <div className="px-6 md:px-24">
        <div className="flex flex-col gap-10 border-b border-white/15 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-3xl font-medium tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-md text-xl leading-snug text-[#ededea]/70">
              {siteConfig.description}
            </p>
          </div>
          <ul className="flex gap-5">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#ededea]/80 transition-colors hover:bg-[#ededea] hover:text-[#161616]"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-12 border-b border-white/15 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Stranice">
            {pageLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Najnoviji postovi">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className={`${linkClass} line-clamp-1`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Resursi">
            {resourceLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Pratite me">
            {socialLinks.map(({ href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </Column>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[17px] text-[#ededea]/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {YEAR} {siteConfig.name} — Sva prava zadržana
          </p>
          <ul className="flex gap-8">
            <li>
              <Link href="/o-meni" className="transition-colors hover:text-[#ededea]">
                O meni
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="transition-colors hover:text-[#ededea]">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
