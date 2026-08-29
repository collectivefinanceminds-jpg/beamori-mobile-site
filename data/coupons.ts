export type Coupon = {
  id: string;
  title: string;
  /** Human-readable reward description, e.g. "10% off your order". */
  description: string;
  discountType: "percent" | "fixed";
  /** Percent (0-100) if discountType is "percent", cents if "fixed". */
  discountValue: number;
  /** ISO date string, or null for no expiry. */
  validUntil: string | null;
  /** Minimum subtotal (in cents) required to use this coupon, if any. */
  minSubtotalCents?: number;
  /** Short eligibility note shown under the coupon, e.g. "Min. spend $15.00". */
  eligibilityNote?: string;
};

// Mock data only — future source is Task Center rewards, membership
// benefits, promotions, and other Admin-issued rewards, scoped to the
// authenticated customer. This is a placeholder catalog, not per-user data.
export const MOCK_COUPONS: Coupon[] = [
  {
    id: "welcome-10",
    title: "Welcome 10% Off",
    description: "10% off your order",
    discountType: "percent",
    discountValue: 10,
    validUntil: null,
    eligibilityNote: "New customers",
  },
  {
    id: "matcha-lovers-2",
    title: "Matcha Lovers",
    description: "$2.00 off orders of $15.00 or more",
    discountType: "fixed",
    discountValue: 200,
    validUntil: "2026-12-31",
    minSubtotalCents: 1500,
    eligibilityNote: "Min. spend $15.00",
  },
  {
    id: "weekend-treat-1-50",
    title: "Weekend Treat",
    description: "$1.50 off your order",
    discountType: "fixed",
    discountValue: 150,
    validUntil: "2026-09-30",
    eligibilityNote: "Valid on weekends",
  },
];

export function getCouponById(id: string): Coupon | undefined {
  return MOCK_COUPONS.find((coupon) => coupon.id === id);
}
