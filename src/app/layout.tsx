import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
        <footer className="border-t border-black/[.08] dark:border-white/[.145]">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 text-sm text-zinc-500">
            <span>{siteConfig.name}</span>
            <a href="/rss.xml" className="hover:text-foreground">
              RSS
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
