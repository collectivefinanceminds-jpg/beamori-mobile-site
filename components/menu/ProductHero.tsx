import Image from "next/image";
import type { ResolvedMenuProduct } from "./types";

/**
 * Image only — name and short description now live in the customisation
 * card below. Own section, px-gutter margin, same width convention as the
 * homepage's Recommended-for-You cards.
 */
export default function ProductHero({
  product,
}: {
  product: ResolvedMenuProduct;
}) {
  return (
    <div className="px-gutter">
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-ivory">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="430px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-3 flex items-center justify-center rounded-lg border-2 border-dashed border-hairline text-center text-xs text-muted">
            public/menu/{product.id}.png
          </div>
        )}
      </div>
    </div>
  );
}
