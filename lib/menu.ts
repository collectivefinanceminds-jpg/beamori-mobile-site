import {
  getProductById,
  MENU_PRODUCTS,
  type MenuCategory,
  type MenuProduct,
} from "@/data/menu";

/**
 * Default-selected option ids per group, keyed by group id — the initial
 * state for a product page. The first available option in each group is
 * the default (see the ordering note on CustomisationGroup.options), not a
 * separately-flagged option.
 */
export function getDefaultSelectedOptionIds(
  product: MenuProduct,
): Record<string, string[]> {
  const selections: Record<string, string[]> = {};
  for (const group of product.customisationGroups ?? []) {
    const firstAvailable = group.options.find((option) => option.available);
    selections[group.id] = firstAvailable ? [firstAvailable.id] : [];
  }
  return selections;
}

/** Base price plus every selected option's price adjustment, in cents. */
export function computeUnitPriceCents(
  product: MenuProduct,
  selectedOptionIdsByGroup: Record<string, string[]>,
): number {
  const adjustment = (product.customisationGroups ?? []).reduce(
    (groupSum, group) => {
      const selectedIds = selectedOptionIdsByGroup[group.id] ?? [];
      const optionSum = group.options
        .filter((option) => selectedIds.includes(option.id))
        .reduce((sum, option) => sum + option.priceAdjustmentCents, 0);
      return groupSum + optionSum;
    },
    0,
  );
  return product.priceCents + adjustment;
}

/** True once every required customisation group has at least one selection. */
export function hasRequiredSelections(
  product: MenuProduct,
  selectedOptionIdsByGroup: Record<string, string[]>,
): boolean {
  return (product.customisationGroups ?? [])
    .filter((group) => group.required)
    .every((group) => (selectedOptionIdsByGroup[group.id] ?? []).length > 0);
}

/**
 * Selected option labels across every group, in group-then-option order —
 * e.g. ["Large", "Less Sweet", "Earl Grey Milk", "Vanilla Cold Foam"], for
 * the "Large / Less Sweet / ..." config summary shown on a Cart/Checkout line.
 */
export function getSelectedOptionLabels(
  product: MenuProduct,
  selectedOptionIdsByGroup: Record<string, string[]>,
): string[] {
  return (product.customisationGroups ?? []).flatMap((group) => {
    const selectedIds = selectedOptionIdsByGroup[group.id] ?? [];
    return group.options
      .filter((option) => selectedIds.includes(option.id))
      .map((option) => option.label);
  });
}

/**
 * Add-ons for a product's page, always filled up to `limit` when the
 * catalog has enough available products. Starts with the product's own
 * curated `recommendedAddOnIds`, then backfills from other available items
 * — same category first, then anywhere else — rather than ever leaving the
 * section short or empty.
 */
export function getAddOnsForProduct(
  product: MenuProduct,
  limit = 5,
): MenuProduct[] {
  const explicit = (product.recommendedAddOnIds ?? [])
    .map((id) => getProductById(id))
    .filter(
      (candidate): candidate is MenuProduct =>
        candidate !== undefined &&
        candidate.id !== product.id &&
        candidate.available,
    );

  const result: MenuProduct[] = [...explicit];
  const chosenIds = new Set(result.map((item) => item.id));

  const addUntilFull = (candidates: MenuProduct[]) => {
    for (const candidate of candidates) {
      if (result.length >= limit) return;
      if (chosenIds.has(candidate.id)) continue;
      result.push(candidate);
      chosenIds.add(candidate.id);
    }
  };

  if (result.length < limit) {
    addUntilFull(
      MENU_PRODUCTS.filter(
        (candidate) =>
          candidate.category === product.category &&
          candidate.available &&
          candidate.id !== product.id,
      ),
    );
  }

  if (result.length < limit) {
    addUntilFull(
      MENU_PRODUCTS.filter(
        (candidate) => candidate.available && candidate.id !== product.id,
      ),
    );
  }

  return result.slice(0, limit);
}

/**
 * Add-ons for Checkout, aggregated across everything already in the cart —
 * not one product's own recommendations. Starts with the union of every
 * cart product's recommendedAddOnIds, backfills from categories already in
 * the cart, then any other available product — always excluding anything
 * already in the cart itself (adding more of it belongs in the cart's own
 * quantity stepper, not the add-ons row).
 */
export function getAddOnsForCart<T extends MenuProduct>(
  cartProductIds: string[],
  catalog: T[],
  limit = 5,
): T[] {
  const cartIds = new Set(cartProductIds);
  const cartCategories = new Set(
    cartProductIds
      .map((id) => catalog.find((product) => product.id === id)?.category)
      .filter((category): category is string => Boolean(category)),
  );
  const explicitIds = cartProductIds.flatMap(
    (id) =>
      catalog.find((product) => product.id === id)?.recommendedAddOnIds ?? [],
  );

  const result: T[] = [];
  const chosenIds = new Set<string>();

  const addUntilFull = (candidates: T[]) => {
    for (const candidate of candidates) {
      if (result.length >= limit) return;
      if (chosenIds.has(candidate.id) || cartIds.has(candidate.id)) continue;
      if (!candidate.available) continue;
      result.push(candidate);
      chosenIds.add(candidate.id);
    }
  };

  addUntilFull(
    explicitIds
      .map((id) => catalog.find((product) => product.id === id))
      .filter((product): product is T => product !== undefined),
  );

  if (result.length < limit) {
    addUntilFull(
      catalog.filter((product) => cartCategories.has(product.category)),
    );
  }

  if (result.length < limit) {
    addUntilFull(catalog);
  }

  return result.slice(0, limit);
}

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
