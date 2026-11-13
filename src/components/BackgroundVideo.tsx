"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/site";

type Props = {
  /** Base name of the files in public/: "<name>.mp4" (landscape 1080p) and "<name>-mobile.mp4" (portrait 720x1280) */
  name: string;
  poster?: string;
  /** Only start downloading when the video is about to scroll into view */
  lazy?: boolean;
};

// Muted, looping, decorative background video that also starts on phones:
// iOS can ignore the autoplay attribute (e.g. Low Power Mode), so play() is called explicitly
// and retried on the first touch.
export default function BackgroundVideo({ name, poster, lazy = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(!lazy);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !visible) return;
    // React doesn't always reflect `muted` as a DOM property, and browsers only autoplay muted video
    el.muted = true;
    if (lazy) el.load(); // sources were just added

    const tryPlay = () => el.play().catch(() => {});
    const onInteract = () => {
      tryPlay();
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };

    el.play().catch(() => {
      window.addEventListener("touchstart", onInteract, { passive: true });
      window.addEventListener("click", onInteract);
    });

    return () => {
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };
  }, [visible, lazy]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster ? withBasePath(poster) : undefined}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={lazy ? "none" : "auto"}
      aria-hidden
    >
      {visible && (
        <>
          <source
            src={withBasePath(`/${name}-mobile.mp4`)}
            type="video/mp4"
            media="(orientation: portrait) and (max-width: 900px)"
          />
          <source src={withBasePath(`/${name}.mp4`)} type="video/mp4" />
        </>
      )}
    </video>
  );
}
