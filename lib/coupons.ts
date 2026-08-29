import type { Coupon } from "@/data/coupons";

/** True once the subtotal clears the coupon's own minimum spend, if any. */
export function isCouponEligible(coupon: Coupon, subtotalCents: number): boolean {
  return (
    coupon.minSubtotalCents === undefined ||
    subtotalCents >= coupon.minSubtotalCents
  );
}

/** Discount in cents, capped so a coupon can never take the subtotal below 0. */
export function computeDiscountCents(
  coupon: Coupon,
  subtotalCents: number,
): number {
  if (!isCouponEligible(coupon, subtotalCents)) return 0;

  const rawDiscount =
    coupon.discountType === "percent"
      ? Math.round((subtotalCents * coupon.discountValue) / 100)
      : coupon.discountValue;

  return Math.min(rawDiscount, subtotalCents);
}
