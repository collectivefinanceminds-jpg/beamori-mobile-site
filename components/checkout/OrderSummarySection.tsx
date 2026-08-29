import Link from "next/link";
import { useCart } from "@/components/menu/CartContext";
import type { ResolvedMenuProduct } from "@/components/menu/types";
import CartLineItem from "./CartLineItem";

/** "Add more items" preserves the cart automatically — it's app-wide state now. */
export default function OrderSummarySection({
  catalog,
}: {
  catalog: ResolvedMenuProduct[];
}) {
  const { items, removeItem } = useCart();
  const catalogById = new Map(catalog.map((product) => [product.id, product]));

  return (
    <div className="px-gutter mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Order Summary</h2>
        <Link href="/menu" className="text-sm font-semibold text-forest">
          Add more items
        </Link>
      </div>

      <div className="mt-3 rounded-card bg-surface p-4">
        {items.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted">
            No items in your cart.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-hairline">
            {items.map((item) => {
              const product = catalogById.get(item.productId);
              if (!product) return null;
              return (
                <CartLineItem
                  key={item.cartItemId}
                  item={item}
                  product={product}
                  onRemove={() => removeItem(item.cartItemId)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
