import Link from "next/link";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/blog", label: "Blog" },
  { href: "/o-meni", label: "O meni" },
];

// Transparent; switches to light text over the home hero (see `body:has([data-hero])` in globals.css)
export default function Header() {
  return (
    <header className="site-header relative z-20">
      <div className="grid h-20 w-full grid-cols-[1fr_auto] items-center gap-6 px-6 md:grid-cols-[1fr_auto_1fr] md:px-14">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Radislav
        </Link>
        <nav className="order-last col-span-2 -mt-4 md:order-none md:col-span-1 md:mt-0">
          <ul className="flex items-center gap-6 text-[15px] font-medium md:gap-12">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="opacity-90 transition-opacity hover:opacity-60">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/blog"
          className="justify-self-end rounded-full border border-current px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
        >
          Čitaj blog <span aria-hidden>↗</span>
        </Link>
      </div>
    </header>
  );
}
