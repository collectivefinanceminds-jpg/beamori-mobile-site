"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ResolvedHeroSlide = {
  slug: string;
  imageSrc: string | null;
};

const AUTO_ADVANCE_MS = 3000;

/**
 * Full-bleed hero carousel — native scroll-snap for swipe (same technique as
 * AboutCarousel), plus a timer that auto-advances every 3s. The timer
 * restarts on every activeIndex change regardless of cause, so a manual
 * swipe just pushes the next auto-advance out by 3s rather than fighting it.
 */
const DOTS_HIDE_DELAY_MS = 1500;

export default function HeroCarousel({
  slides,
}: {
  slides: ResolvedHeroSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hideDotsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideDotsTimer = () => {
    if (hideDotsTimerRef.current) {
      clearTimeout(hideDotsTimerRef.current);
      hideDotsTimerRef.current = null;
    }
  };

  const showDots = () => {
    clearHideDotsTimer();
    setDotsVisible(true);
  };

  const hideDotsSoon = () => {
    clearHideDotsTimer();
    hideDotsTimerRef.current = setTimeout(
      () => setDotsVisible(false),
      DOTS_HIDE_DELAY_MS,
    );
  };

  const hideDotsNow = () => {
    clearHideDotsTimer();
    setDotsVisible(false);
  };

  useEffect(() => clearHideDotsTimer, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const index = slideRefs.current.findIndex(
          (el) => el === mostVisible.target,
        );
        if (index !== -1) setActiveIndex(index);
      },
      { threshold: 0.6 },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      const next = slideRefs.current[(activeIndex + 1) % slides.length];
      if (container && next) {
        container.scrollTo({ left: next.offsetLeft, behavior: "smooth" });
      }
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, slides.length]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label="Hero banners"
        onMouseEnter={showDots}
        onMouseLeave={hideDotsNow}
        onTouchStart={showDots}
        onTouchEnd={hideDotsSoon}
        onTouchCancel={hideDotsSoon}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.slug}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative aspect-4/3 w-full shrink-0 snap-center overflow-hidden"
          >
            {slide.imageSrc ? (
              <Image
                src={slide.imageSrc}
                alt="Beamori"
                fill
                sizes="430px"
                className="object-cover object-bottom"
                priority={index === 0}
              />
            ) : (
              // TEMPORARY grey placeholder (not bg-surface) so the diagonal
              // cut on the card below stays visible against it — swap back
              // once a real image is set.
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-neutral-300 text-center">
                <span className="text-sm font-medium text-neutral-600">
                  Hero image not set
                </span>
                <code className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                  public/home/hero/{slide.slug}.png
                </code>
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-14 flex justify-center gap-1.5 transition-opacity duration-300 ${
            dotsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {slides.map((slide, index) => (
            <span
              key={slide.slug}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
