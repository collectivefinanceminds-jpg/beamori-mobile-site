import { MENU_CATEGORIES, MENU_PRODUCTS } from "@/data/menu";
import { findPublicAsset } from "@/lib/media";
import MenuExperience from "@/components/menu/MenuExperience";
import type { ResolvedMenuProduct } from "@/components/menu/types";

export default function MenuPage() {
  const resolvedProducts: ResolvedMenuProduct[] = MENU_PRODUCTS.map(
    (product) => ({
      ...product,
      imageSrc: findPublicAsset(`menu/${product.id}`),
    }),
  );

  return (
    <MenuExperience categories={MENU_CATEGORIES} products={resolvedProducts} />
  );
}
