import { formatSgd } from "@/lib/currency";

/**
 * Ticket/coupon visual treatment: a dashed perforation with small
 * ivory-colored circles punched into the card's left/right edges. No
 * dependency — the circles just match the page background color and
 * straddle the card's real edge.
 */
export default function PriceSummaryCard({
  subtotalCents,
  couponLabel,
  discountCents,
  onSelectCoupon,
  promoDiscountCents,
  totalCents,
}: {
  subtotalCents: number;
  couponLabel: string | null;
  discountCents: number;
  onSelectCoupon: () => void;
  promoDiscountCents: number;
  totalCents: number;
}) {
  return (
    <div className="px-gutter mt-4">
      <div className="rounded-card bg-surface px-6 py-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink">{formatSgd(subtotalCents)}</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted">Coupon</span>
          {couponLabel ? (
            <div className="flex items-center gap-2">
              <span className="font-medium text-forest">
                -{formatSgd(discountCents)}
              </span>
              <button
                type="button"
                onClick={onSelectCoupon}
                className="text-xs font-semibold text-forest underline underline-offset-2"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onSelectCoupon}
              className="text-xs font-semibold text-forest underline underline-offset-2"
            >
              Select Coupon
            </button>
          )}
        </div>

        {promoDiscountCents > 0 && (
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted">Promo Code</span>
            <span className="font-medium text-forest">
              -{formatSgd(promoDiscountCents)}
            </span>
          </div>
        )}

        <div className="relative -mx-6 my-4">
          <div className="mx-6 border-t border-dashed border-hairline" />
          <span className="absolute top-1/2 left-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory" />
          <span className="absolute top-1/2 right-0 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-ink">Total</span>
          <span className="text-lg font-bold text-forest">
            {formatSgd(totalCents)}
          </span>
        </div>
      </div>
    </div>
  );
}
