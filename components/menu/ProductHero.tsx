import Image from "next/image";
import type { ResolvedMenuProduct } from "./types";

export default function ProductHero({
  product,
}: {
  product: ResolvedMenuProduct;
}) {
  return (
    <>
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

      <div className="mt-4 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-ink">{product.name}</h1>
        {!product.available && (
          <span className="rounded-btn bg-hairline px-2.5 py-1 text-xs font-semibold text-muted">
            Sold Out
          </span>
        )}
      </div>
    </>
  );
}
