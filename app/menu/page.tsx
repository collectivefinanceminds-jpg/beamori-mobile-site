import { MENU_CATEGORIES, MENU_PRODUCTS } from "@/data/menu";
import { findPublicAsset } from "@/lib/media";
import MenuExperience from "@/components/menu/MenuExperience";
import type {
  ResolvedMenuCategory,
  ResolvedMenuProduct,
} from "@/components/menu/types";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const resolvedProducts: ResolvedMenuProduct[] = MENU_PRODUCTS.map(
    (product) => ({
      ...product,
      imageSrc: findPublicAsset(`menu/${product.id}`),
    }),
  );

  const resolvedCategories: ResolvedMenuCategory[] = MENU_CATEGORIES.map(
    (category) => ({
      ...category,
      iconSrc: findPublicAsset(`menu-categories/${category.id}`),
    }),
  );

  // Only honour the query param if it's a real category — otherwise fall
  // back to MenuExperience's own default (the first category).
  const initialCategoryId = resolvedCategories.some((c) => c.id === category)
    ? category
    : undefined;

  return (
    <MenuExperience
      categories={resolvedCategories}
      products={resolvedProducts}
      initialCategoryId={initialCategoryId}
    />
  );
}
