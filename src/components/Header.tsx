import Link from "next/link";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/o-meni", label: "O Meni" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Radislav
        </Link>
        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
