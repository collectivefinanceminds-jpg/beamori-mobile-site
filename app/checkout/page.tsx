import { MENU_PRODUCTS } from "@/data/menu";
import { findPublicAsset } from "@/lib/media";
import CheckoutExperience from "@/components/checkout/CheckoutExperience";
import type { ResolvedMenuProduct } from "@/components/menu/types";

export default function CheckoutPage() {
  const catalog: ResolvedMenuProduct[] = MENU_PRODUCTS.map((product) => ({
    ...product,
    imageSrc: findPublicAsset(`menu/${product.id}`),
  }));

  return <CheckoutExperience catalog={catalog} />;
}
