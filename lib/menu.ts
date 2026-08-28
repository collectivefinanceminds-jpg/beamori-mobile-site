import { MENU_PRODUCTS, type MenuCategory, type MenuProduct } from "@/data/menu";

// Categories pulled for the homepage "Recommend for You" carousel, in
// display order. Edit this list to change which categories feed it.
const RECOMMENDED_CATEGORY_ORDER = [
  "beamori-specials",
  "singapore-classics",
  "snacks",
];

/** Real menu items from the categories above, for the homepage carousel — not separate mock data. */
export function getRecommendedProducts(): MenuProduct[] {
  return RECOMMENDED_CATEGORY_ORDER.flatMap((categoryId) =>
    MENU_PRODUCTS.filter(
      (product) => product.category === categoryId && product.available,
    ),
  );
}

/** Frontend-only filtering over the current mock menu — matches name, category, and description. */
export function searchProducts<T extends MenuProduct>(
  products: T[],
  categories: MenuCategory[],
  query: string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;

  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name.toLowerCase()]),
  );

  return products.filter((product) => {
    const haystack = [
      product.name,
      categoryNameById.get(product.category) ?? "",
      product.description ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
