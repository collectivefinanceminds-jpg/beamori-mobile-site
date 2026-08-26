import { notFound } from "next/navigation";
import { getProductById } from "@/data/menu";
import { formatSgd } from "@/lib/currency";
import AddToCartButton from "@/components/menu/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="px-gutter pt-section pb-section">
      <h1 className="text-2xl font-bold text-ink">{product.name}</h1>
      {product.description && (
        <p className="mt-1 text-sm text-muted">{product.description}</p>
      )}
      <p className="mt-3 text-lg font-semibold text-forest">
        {formatSgd(product.priceCents)}
      </p>

      <p className="mt-6 text-sm text-muted">
        Drink customisation (milk, sugar level, add-ons) is coming soon — for
        now this adds the base drink to your cart.
      </p>

      <AddToCartButton productId={product.id} />
    </div>
  );
}
