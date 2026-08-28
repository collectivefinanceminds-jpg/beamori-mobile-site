"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ResolvedMenuCategory } from "./types";

/**
 * Narrow, un-carded left nav — shares the page's own background so it
 * reads as part of the page rather than a floating panel. Auto-scrolls
 * itself (not the whole page) to keep the active item visible.
 */
export default function CategorySidebar({
  categories,
  activeCategoryId,
  onSelect,
}: {
  categories: ResolvedMenuCategory[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string) => void;
}) {
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    if (!activeCategoryId) return;
    itemRefs.current
      .get(activeCategoryId)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeCategoryId]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-4 max-h-[calc(100dvh-6rem)] w-23 shrink-0 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex flex-col">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <li
              key={category.id}
              ref={(el) => {
                if (el) itemRefs.current.set(category.id, el);
                else itemRefs.current.delete(category.id);
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full flex-col items-center gap-1.5 border-l-2 py-3 text-center text-xs leading-tight transition-colors ${
                  isActive
                    ? "border-forest font-semibold text-forest"
                    : "border-transparent font-medium text-muted"
                }`}
              >
                <span className="flex h-12.25 w-12.25 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ivory">
                  {category.iconSrc ? (
                    <Image
                      src={category.iconSrc}
                      alt=""
                      width={49}
                      height={49}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      title={`public/menu-categories/${category.id}.png`}
                      className="h-6 w-6 rounded border border-dashed border-hairline"
                    />
                  )}
                </span>
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
