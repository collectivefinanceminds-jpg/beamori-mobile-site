"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/home/HomeIcons";
import { useCart } from "@/components/menu/CartContext";
import { MOCK_COUPONS } from "@/data/coupons";
import { formatSgd } from "@/lib/currency";
import { computeDiscountCents, isCouponEligible } from "@/lib/coupons";
import { useCheckout } from "./CheckoutContext";
import CouponListItem from "./CouponListItem";

export default function CouponSelectionExperience() {
  const router = useRouter();
  const { items } = useCart();
  const { appliedCoupon, setAppliedCoupon } = useCheckout();
  const [selectedId, setSelectedId] = useState(appliedCoupon?.id ?? null);

  const subtotalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );
  const selectedCoupon =
    MOCK_COUPONS.find((coupon) => coupon.id === selectedId) ?? null;
  const discountCents = selectedCoupon
    ? computeDiscountCents(selectedCoupon, subtotalCents)
    : 0;
  const totalCents = Math.max(0, subtotalCents - discountCents);

  const handleConfirm = () => {
    setAppliedCoupon(selectedCoupon);
    router.back();
  };

  return (
    <div className="pb-44">
      <div className="px-gutter grid grid-cols-[2.25rem_1fr_2.25rem] items-center pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card"
        >
          <ChevronLeftIcon className="h-5 w-5 text-ink" />
        </button>
        <h1 className="text-center text-lg font-semibold text-ink">
          Select Coupon
        </h1>
        <div />
      </div>

      <div className="px-gutter mt-4 flex flex-col gap-3">
        {MOCK_COUPONS.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted">
            No coupons available.
          </p>
        ) : (
          MOCK_COUPONS.map((coupon) => (
            <CouponListItem
              key={coupon.id}
              coupon={coupon}
              isSelected={selectedId === coupon.id}
              isEligible={isCouponEligible(coupon, subtotalCents)}
              onSelect={() =>
                setSelectedId((current) =>
                  current === coupon.id ? null : coupon.id,
                )
              }
            />
          ))
        )}
      </div>

      <div className="pb-safe fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 rounded-t-card border-t border-hairline bg-surface px-gutter pt-3 shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted">Total</span>
          <span className="text-lg font-bold text-forest">
            {formatSgd(totalCents)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-btn mt-3 mb-3 w-full bg-forest py-3.5 text-center text-base font-semibold text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
