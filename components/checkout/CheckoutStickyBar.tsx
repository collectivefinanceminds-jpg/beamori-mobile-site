import { formatSgd } from "@/lib/currency";

/**
 * Total + Pay Now only — no promotional strip above it. Per explicit scope:
 * Pay Now has no working click handler yet (no real payment backend to
 * call) — it just visually reflects readiness (disabled without a payment
 * method or with an empty cart) rather than simulating a fake payment.
 */
export default function CheckoutStickyBar({
  totalCents,
  compareAtTotalCents,
  ctaDisabled,
}: {
  totalCents: number;
  compareAtTotalCents?: number;
  ctaDisabled: boolean;
}) {
  return (
    <div className="pb-safe fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 rounded-t-card border-t border-hairline bg-surface px-gutter pt-3 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">Total</span>
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
        disabled={ctaDisabled}
        className="rounded-btn mt-3 mb-3 w-full bg-forest py-3.5 text-center text-base font-semibold text-white disabled:bg-hairline disabled:text-muted"
      >
        Pay Now
      </button>
    </div>
  );
}
