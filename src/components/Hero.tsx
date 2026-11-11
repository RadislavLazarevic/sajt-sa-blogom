import Link from "next/link";
import LocalTime from "@/components/LocalTime";

export default function Hero({ postCount }: { postCount: number }) {
  return (
    <section
      data-hero
      // Pulls the section up under the transparent header (h-20)
      className="relative -mt-20 flex min-h-svh flex-col overflow-hidden bg-[#0b0b0b] text-[#ededea]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      <div className="relative z-10 flex flex-1 flex-col px-6 pt-32 pb-10 md:px-14 md:pt-28">
        <div className="flex items-start justify-between text-sm font-medium">
          <span>Programer i bloger</span>
          <span className="text-right">
            Srbija · <LocalTime />
          </span>
        </div>

        <div className="grid flex-1 grid-rows-[auto_auto] content-center gap-10 py-12 md:grid-rows-2 md:gap-0 md:py-0">
          <h1 className="self-center text-[clamp(2.5rem,8vw,7.5rem)] leading-none font-normal tracking-[-0.04em]">
            Pišem kod.
          </h1>
          <p
            className="self-center justify-self-end text-[clamp(2.5rem,8vw,7.5rem)] leading-none font-normal tracking-[-0.04em]"
          >
            Pišem o njemu.
          </p>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-3">
          <div className="max-w-md">
            <p className="text-lg leading-snug text-[#ededea]/90 md:text-[22px]">
              Blog o programiranju, alatima i stvarima koje učim usput. Pišem onako kako bih voleo da
              mi neko objasni.
            </p>
            <p className="mt-4 text-[15px] text-[#ededea]/55">Next.js · TypeScript · web razvoj</p>
          </div>

          <div className="text-center max-md:hidden">
            <p className="text-7xl leading-none font-light tracking-tight text-[#ff5a36]">
              {String(postCount).padStart(2, "0")}
            </p>
            <p className="mt-3 text-[15px] font-medium">objavljeno na blogu</p>
          </div>

          <Link
            href="/o-meni"
            className="justify-self-start rounded-full bg-[#ededea] px-7 py-4 text-lg font-medium text-[#0b0b0b] transition-opacity hover:opacity-85 md:justify-self-end"
          >
            Upoznaj me <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
