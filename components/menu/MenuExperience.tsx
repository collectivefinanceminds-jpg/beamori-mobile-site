"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { searchProducts } from "@/lib/menu";
import type { ResolvedMenuCategory, ResolvedMenuProduct } from "./types";
import CategorySidebar from "./CategorySidebar";
import MenuCategoryCard from "./MenuCategoryCard";
import { MapPinIcon } from "./MenuIcons";
import MenuSearchBar from "./MenuSearchBar";

export default function MenuExperience({
  categories,
  products,
}: {
  categories: ResolvedMenuCategory[];
  products: ResolvedMenuProduct[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.id ?? null,
  );
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const suppressObserver = useRef(false);

  const filteredProducts = useMemo(
    () => searchProducts(products, categories, query),
    [products, categories, query],
  );

  const productsByCategory = useMemo(() => {
    const map = new Map<string, ResolvedMenuProduct[]>();
    for (const category of categories) {
      map.set(
        category.id,
        filteredProducts.filter((product) => product.category === category.id),
      );
    }
    return map;
  }, [categories, filteredProducts]);

  const visibleCategories = useMemo(
    () =>
      categories.filter(
        (category) => (productsByCategory.get(category.id)?.length ?? 0) > 0,
      ),
    [categories, productsByCategory],
  );

  const registerRef = (categoryId: string, el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(categoryId, el);
    else cardRefs.current.delete(categoryId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserver.current) return;
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const categoryId = (mostVisible.target as HTMLElement).dataset
          .categoryId;
        if (categoryId) setActiveCategoryId(categoryId);
      },
      { threshold: 0.5 },
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleCategories]);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const el = cardRefs.current.get(categoryId);
    if (!el) return;

    suppressObserver.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      suppressObserver.current = false;
    }, 700);
  };

  return (
    <div className="pb-40">
      <div className="px-gutter pt-4">
        <div className="flex items-center gap-3">
          <h1 className="shrink-0 text-2xl font-bold text-ink">Pickup</h1>
          <MenuSearchBar value={query} onChange={setQuery} />
        </div>
        <div className="mt-2">
          <a
            href="https://maps.app.goo.gl/y7aJM9HSDr75GrSc6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-ink underline-offset-2 hover:underline"
          >
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-forest" />
            298C Compassvale Street, Singapore 543298
          </a>
          <p className="mt-0.5 text-xs text-muted">Unit No: #15-80</p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 px-gutter">
        <CategorySidebar
          categories={visibleCategories}
          activeCategoryId={activeCategoryId}
          onSelect={handleSelectCategory}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {visibleCategories.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              No drinks match your search.
            </p>
          ) : (
            visibleCategories.map((category) => (
              <MenuCategoryCard
                key={category.id}
                category={category}
                products={productsByCategory.get(category.id) ?? []}
                registerRef={registerRef}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
