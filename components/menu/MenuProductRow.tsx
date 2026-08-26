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
      className={`flex items-center gap-3 px-4 py-3 ${showDivider ? "border-b border-hairline" : ""}`}
    >
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

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">
          {product.name}
        </p>
        {product.description && (
          <p className="truncate text-xs text-muted">{product.description}</p>
        )}
        <div className="mt-1 flex items-baseline gap-1.5">
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
