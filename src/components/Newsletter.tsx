import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] text-[#ededea]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/newsletter.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

      <div className="relative z-10 px-6 md:px-14">
        <div className="flex min-h-[70svh] flex-col justify-end gap-10 pt-32 pb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(3.5rem,11vw,10rem)] leading-none font-medium tracking-[-0.04em]">
            Newsletter
          </h2>
          <div className="md:mr-[8%] md:pb-4">
            <p className="text-3xl font-medium tracking-tight md:text-4xl">Budi u toku</p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-3 text-lg text-[#ededea]/85 transition-colors hover:text-[#ededea]"
            >
              <span aria-hidden>›</span> Pročitaj postove
            </Link>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/15 py-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <h3 className="text-2xl font-medium">Prijavi se za novosti</h3>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
