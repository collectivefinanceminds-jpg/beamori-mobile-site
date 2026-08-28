"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ResolvedMenuCategory } from "./types";

// Names that don't naturally wrap at the sidebar's width but should
// still stack one word per line. Most multi-word names wrap on their
// own via CSS; this is a narrow, explicit exception list.
const FORCE_STACK_NAMES = new Set(["Bundle Deals"]);

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
                className={`relative flex w-full flex-col items-center gap-1.5 py-3 pl-0.5 text-center text-xs leading-tight transition-colors ${
                  isActive
                    ? "bg-forest/8 font-semibold text-forest"
                    : "font-medium text-muted"
                }`}
              >
                {isActive && (
                  // Inset 20% from top and bottom (not a full-height
                  // border) so the indicator reads as a marker next to
                  // the selected item, not a divider spanning it.
                  <span className="absolute top-[20%] bottom-[20%] left-0 w-0.5 rounded-full bg-forest" />
                )}
                <span className="flex h-11.25 w-11.25 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ivory">
                  {category.iconSrc ? (
                    <Image
                      src={category.iconSrc}
                      alt=""
                      width={45}
                      height={45}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      title={`public/menu-categories/${category.id}.png`}
                      className="h-6 w-6 rounded border border-dashed border-hairline"
                    />
                  )}
                </span>
                {FORCE_STACK_NAMES.has(category.name) ? (
                  <span className="flex flex-col">
                    {category.name.split(" ").map((word) => (
                      <span key={word}>{word}</span>
                    ))}
                  </span>
                ) : (
                  category.name
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
