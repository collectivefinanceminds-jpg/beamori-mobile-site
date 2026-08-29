import { formatSgd } from "@/lib/currency";

export default function StickyPurchaseBar({
  quantity,
  onDecrease,
  onIncrease,
  totalCents,
  compareAtTotalCents,
  onAddToCart,
  ctaLabel,
  ctaDisabled,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  totalCents: number;
  compareAtTotalCents?: number;
  onAddToCart: () => void;
  ctaLabel: string;
  ctaDisabled: boolean;
}) {
  return (
    <div className="pb-safe fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 rounded-t-card border-t border-hairline bg-surface px-gutter pt-3 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-lg text-ink disabled:opacity-30"
          >
            −
          </button>
          <span className="w-4 text-center text-base font-semibold text-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-lg text-ink"
          >
            +
          </button>
        </div>

        <div className="flex items-baseline gap-2">
          {compareAtTotalCents !== undefined &&
            compareAtTotalCents > totalCents && (
              <span className="text-sm text-muted line-through">
                {formatSgd(compareAtTotalCents)}
              </span>
            )}
          <span className="text-lg font-bold text-forest">
            {formatSgd(totalCents)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={ctaDisabled}
        className="rounded-btn mt-3 mb-3 w-full bg-forest py-3.5 text-center text-base font-semibold text-white disabled:bg-hairline disabled:text-muted"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
