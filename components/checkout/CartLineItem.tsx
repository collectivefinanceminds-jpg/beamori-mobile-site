import Image from "next/image";
import { CloseIcon } from "@/components/home/HomeIcons";
import type { CartItem } from "@/components/menu/CartContext";
import type { ResolvedMenuProduct } from "@/components/menu/types";
import { formatSgd } from "@/lib/currency";
import { getSelectedOptionLabels } from "@/lib/menu";

export default function CartLineItem({
  item,
  product,
  onRemove,
}: {
  item: CartItem;
  product: ResolvedMenuProduct;
  onRemove: () => void;
}) {
  const configLabels = getSelectedOptionLabels(
    product,
    item.selectedOptionIdsByGroup,
  );
  const lineTotalCents = item.unitPriceCents * item.quantity;

  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ivory">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-1 flex items-center justify-center rounded border border-dashed border-hairline text-center text-[0.5rem] text-muted">
            public/menu/{product.id}.png
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">
              {product.name}
            </p>
            {configLabels.length > 0 && (
              <p className="mt-0.5 truncate text-xs text-muted">
                {configLabels.join(" / ")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${product.name}`}
            className="shrink-0 text-muted"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted">Qty {item.quantity}</span>
          <div className="flex items-baseline gap-1.5">
            {product.compareAtPriceCents && (
              <span className="text-xs text-muted line-through">
                {formatSgd(product.compareAtPriceCents * item.quantity)}
              </span>
            )}
            <span className="text-sm font-semibold text-forest">
              {formatSgd(lineTotalCents)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
