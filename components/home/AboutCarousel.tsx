"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ResolvedAboutSlide = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string | null;
};

/**
 * Native scroll-snap carousel — no animation library, just CSS. Active dot
 * is tracked via IntersectionObserver rather than scroll-position math, so
 * it stays correct regardless of slide width or momentum scrolling.
 */
export default function AboutCarousel({
  slides,
}: {
  slides: ResolvedAboutSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: [0.5, 0.75, 1] },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  return (
    <div>
      <div className="px-gutter flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.slug}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative aspect-6/5 w-[85%] shrink-0 snap-center overflow-hidden rounded-card bg-ivory shadow-card"
          >
            {slide.imageSrc ? (
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                sizes="85vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-2 flex items-center justify-center rounded-[calc(var(--radius-card)-0.5rem)] border-2 border-dashed border-hairline text-center">
                <code className="text-[0.6875rem] text-muted">
                  public/home/about/{slide.slug}.png
                </code>
              </div>
            )}

            {/* Translucent gradient overlay, bottom ~20% of the card */}
            <div className="absolute inset-x-0 bottom-0 flex h-1/5 flex-col justify-center gap-0.5 bg-linear-to-t from-black/70 to-transparent px-3">
              <h3 className="truncate text-sm font-semibold leading-tight text-white">
                {slide.title}
              </h3>
              <p className="line-clamp-1 text-xs leading-tight text-white/80">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {slides.map((slide, index) => (
          <span
            key={slide.slug}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? "w-4 bg-forest" : "w-1.5 bg-hairline"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
