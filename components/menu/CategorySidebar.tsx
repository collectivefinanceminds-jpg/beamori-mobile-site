"use client";

import { useEffect, useRef } from "react";
import type { MenuCategory } from "@/data/menu";

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
  categories: MenuCategory[];
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
                className={`w-full border-l-2 py-3 text-center text-xs leading-tight transition-colors ${
                  isActive
                    ? "border-forest font-semibold text-forest"
                    : "border-transparent font-medium text-muted"
                }`}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
