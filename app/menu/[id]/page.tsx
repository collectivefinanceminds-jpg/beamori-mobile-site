import { notFound } from "next/navigation";
import { getProductById, type MenuProduct } from "@/data/menu";
import { findPublicAsset } from "@/lib/media";
import ProductDetail from "@/components/menu/ProductDetail";
import type { ResolvedMenuProduct } from "@/components/menu/types";

function resolveImage(product: MenuProduct): ResolvedMenuProduct {
  return { ...product, imageSrc: findPublicAsset(`menu/${product.id}`) };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const addOns = (product.recommendedAddOnIds ?? [])
    .map((addOnId) => getProductById(addOnId))
    .filter((addOn): addOn is MenuProduct => Boolean(addOn))
    .map(resolveImage);

  return <ProductDetail product={resolveImage(product)} addOns={addOns} />;
}
