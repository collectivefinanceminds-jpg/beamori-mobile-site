import Image from "next/image";
import { formatSgd } from "@/lib/currency";
import type { RecommendedProduct } from "@/data/recommended";
import { findPublicAsset } from "@/lib/media";

export default function ProductCard({
  product,
}: {
  product: RecommendedProduct;
}) {
  const imageSrc = findPublicAsset(`home/recommended/${product.slug}`);

  return (
    <div className="aspect-square w-46.75 shrink-0 overflow-hidden rounded-card border border-hairline bg-surface flex flex-col">
      <div className="relative w-full flex-1 bg-ivory">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="187px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-2 flex items-center justify-center rounded-lg border border-dashed border-hairline text-center text-[0.6875rem] text-muted">
            public/home/recommended/{product.slug}.png
          </div>
        )}
      </div>
      {/* Fixed at exactly 1/4 of the card's total (square) height */}
      <div className="flex h-11.75 flex-col justify-center gap-0.5 px-2">
        <span className="truncate text-xs font-medium leading-none text-ink">
          {product.name}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-semibold leading-none text-forest">
            {formatSgd(product.priceCents)}
          </span>
          {product.compareAtPriceCents && (
            <span className="text-[0.625rem] leading-none text-muted line-through">
              {formatSgd(product.compareAtPriceCents)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
