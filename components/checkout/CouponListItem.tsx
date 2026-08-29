import type { Coupon } from "@/data/coupons";

export default function CouponListItem({
  coupon,
  isSelected,
  isEligible,
  onSelect,
}: {
  coupon: Coupon;
  isSelected: boolean;
  isEligible: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!isEligible}
      aria-pressed={isSelected}
      className={`rounded-card w-full border-2 bg-surface p-4 text-left transition-colors disabled:opacity-50 ${
        isSelected ? "border-forest" : "border-transparent"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{coupon.title}</p>
          <p className="mt-0.5 text-xs text-muted">{coupon.description}</p>
          {coupon.eligibilityNote && (
            <p className="mt-1 text-[0.6875rem] text-muted">
              {coupon.eligibilityNote}
            </p>
          )}
          {coupon.validUntil && (
            <p className="mt-1 text-[0.6875rem] text-muted">
              Valid until {coupon.validUntil}
            </p>
          )}
        </div>
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            isSelected ? "border-forest bg-forest" : "border-hairline"
          }`}
        >
          {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
        </span>
      </div>
    </button>
  );
}
