import type { MenuCategory, MenuProduct } from "@/data/menu";

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
