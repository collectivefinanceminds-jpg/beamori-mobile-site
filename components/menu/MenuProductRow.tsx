import Image from "next/image";
import Link from "next/link";
import { formatSgd } from "@/lib/currency";
import type { ResolvedMenuProduct } from "./types";

export default function MenuProductRow({
  product,
  showDivider,
}: {
  product: ResolvedMenuProduct;
  showDivider: boolean;
}) {
  return (
    <Link
      href={`/menu/${product.id}`}
      className={`flex items-center gap-3 px-4 py-4 ${showDivider ? "border-b border-hairline" : ""}`}
    >
      <div className="relative h-25 w-25 shrink-0 overflow-hidden rounded-lg bg-ivory">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="100px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-1 flex items-center justify-center rounded border border-dashed border-hairline text-center text-[0.5rem] text-muted">
            public/menu/{product.id}.png
          </div>
        )}
      </div>

      {/* justify-between keeps name/description/price pinned to the top,
          middle, and bottom of the row regardless of whether a
          description exists — the middle slot is always reserved. */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-0.5">
        <p className="truncate text-sm font-semibold text-ink">
          {product.name}
        </p>
        <p className="line-clamp-1 text-xs text-muted">
          {product.description}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-forest">
            {formatSgd(product.priceCents)}
          </span>
          {product.compareAtPriceCents && (
            <span className="text-xs text-muted line-through">
              {formatSgd(product.compareAtPriceCents)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
