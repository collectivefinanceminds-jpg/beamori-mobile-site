"use client";

import { useEffect, useRef, useState } from "react";
import type { Task } from "@/data/tasks";
import TaskCenterCard from "./TaskCenterCard";

const AUTO_ADVANCE_MS = 3000;

/**
 * Same scroll-snap + IntersectionObserver technique as HeroCarousel — a
 * manual swipe updates activeIndex via the observer, which naturally
 * pushes the next auto-advance out by AUTO_ADVANCE_MS rather than
 * fighting the user's choice. Dots are always visible here (unlike
 * Hero's hover-only dots), matching the reference. Auto-advance is
 * skipped entirely under prefers-reduced-motion.
 *
 * The scroll track has vertical padding (py-4) because overflow-x-auto
 * implicitly makes overflow-y auto too, which clips shadow-card's soft
 * blur flush against the card's own box — most visible right at the
 * rounded corners. The padding gives the shadow room to render; the dots
 * row below pulls up to offset the extra bottom space it adds.
 */
export default function TaskCenterCarousel({ tasks }: { tasks: Task[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.6 },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [tasks.length]);

  useEffect(() => {
    if (tasks.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setTimeout(() => {
      const container = containerRef.current;
      const next = slideRefs.current[(activeIndex + 1) % tasks.length];
      if (container && next) {
        container.scrollTo({ left: next.offsetLeft, behavior: "smooth" });
      }
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, tasks.length]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label="Active tasks"
        className="flex snap-x snap-mandatory overflow-x-auto py-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {tasks.map((task, index) => (
          <div
            key={task.id}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="w-full shrink-0 snap-center"
          >
            <TaskCenterCard task={task} />
          </div>
        ))}
      </div>

      {tasks.length > 1 && (
        <div className="-mt-1 flex justify-center gap-1.5">
          {tasks.map((task, index) => (
            <span
              key={task.id}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-4 bg-forest" : "w-1.5 bg-forest/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
