"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/home/HomeIcons";
import { PAYMENT_METHODS } from "@/data/paymentMethods";
import { useCheckout } from "./CheckoutContext";
import PaymentMethodListItem from "./PaymentMethodListItem";

/**
 * No "Saved Methods" section — Beamori has no saved-payment-method system
 * yet, and the spec is explicit not to invent one. Just the one list of
 * genuinely-intended-once-Stripe-exists methods.
 */
export default function PaymentMethodSelectionExperience() {
  const router = useRouter();
  const { paymentMethodId, setPaymentMethodId } = useCheckout();
  const [selectedId, setSelectedId] = useState(paymentMethodId);

  const handleConfirm = () => {
    if (!selectedId) return;
    setPaymentMethodId(selectedId);
    router.back();
  };

  return (
    <div className="pb-section">
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
          Select Payment Method
        </h1>
        <div />
      </div>

      <div className="px-gutter mt-6">
        <h2 className="text-sm font-semibold text-muted">
          Other Payment Methods
        </h2>
        <div className="rounded-card mt-2 divide-y divide-hairline bg-surface">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodListItem
              key={method.id}
              method={method}
              isSelected={selectedId === method.id}
              onSelect={() => setSelectedId(method.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-gutter mt-8">
        <button
          type="button"
          disabled={!selectedId}
          onClick={handleConfirm}
          className="rounded-btn w-full bg-forest py-3.5 text-center text-base font-semibold text-white disabled:bg-hairline disabled:text-muted"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
