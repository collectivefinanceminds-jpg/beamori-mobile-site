export type PromoCode = {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
};

// Mock only — manually entered by the customer, deliberately a separate
// concept/data model from Coupons (data/coupons.ts), which are already
// owned by the customer. No real redemption backend yet.
export const MOCK_PROMO_CODES: PromoCode[] = [
  { code: "BEAMORI5", discountType: "fixed", discountValue: 500 },
  { code: "WELCOME10", discountType: "percent", discountValue: 10 },
];

export function findPromoCode(code: string): PromoCode | undefined {
  const normalized = code.trim().toUpperCase();
  return MOCK_PROMO_CODES.find((promo) => promo.code === normalized);
}

export function computePromoDiscountCents(
  promo: PromoCode,
  subtotalCents: number,
): number {
  const rawDiscount =
    promo.discountType === "percent"
      ? Math.round((subtotalCents * promo.discountValue) / 100)
      : promo.discountValue;
  return Math.min(rawDiscount, subtotalCents);
}
