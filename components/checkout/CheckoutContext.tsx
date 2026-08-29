"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Coupon } from "@/data/coupons";
import type { PaymentMethodId } from "@/data/paymentMethods";

export type PickupMethod = "now" | "preorder";

type CheckoutState = {
  pickupMethod: PickupMethod;
  /** "YYYY-MM-DD", set only when pickupMethod is "preorder". */
  preorderDate: string | null;
  /** "HH:MM", set only when pickupMethod is "preorder". */
  preorderTime: string | null;
  takeawayBag: boolean;
  promoCode: string;
  appliedCoupon: Coupon | null;
  paymentMethodId: PaymentMethodId | null;
  napkins: boolean;
  remarks: string;
};

type CheckoutContextValue = CheckoutState & {
  setPickupMethod: (method: PickupMethod) => void;
  setPreorderSlot: (date: string, time: string) => void;
  setTakeawayBag: (value: boolean) => void;
  setPromoCode: (value: string) => void;
  setAppliedCoupon: (coupon: Coupon | null) => void;
  setPaymentMethodId: (id: PaymentMethodId) => void;
  setSpecialRemarks: (napkins: boolean, remarks: string) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

const INITIAL_STATE: CheckoutState = {
  pickupMethod: "now",
  preorderDate: null,
  preorderTime: null,
  takeawayBag: false,
  promoCode: "",
  appliedCoupon: null,
  paymentMethodId: null,
  napkins: false,
  remarks: "",
};

/**
 * In-memory only, scoped to the /checkout route tree (app/checkout/layout.tsx)
 * — mirrors CartContext's plain-useState, no-persistence approach. The
 * coupon and payment-method sub-pages read/write this same instance and
 * router.back() to return, since they're nested under the same provider.
 */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>(INITIAL_STATE);

  const setPickupMethod = (pickupMethod: PickupMethod) =>
    setState((previous) => ({ ...previous, pickupMethod }));

  const setPreorderSlot = (preorderDate: string, preorderTime: string) =>
    setState((previous) => ({ ...previous, preorderDate, preorderTime }));

  const setTakeawayBag = (takeawayBag: boolean) =>
    setState((previous) => ({ ...previous, takeawayBag }));

  const setPromoCode = (promoCode: string) =>
    setState((previous) => ({ ...previous, promoCode }));

  const setAppliedCoupon = (appliedCoupon: Coupon | null) =>
    setState((previous) => ({ ...previous, appliedCoupon }));

  const setPaymentMethodId = (paymentMethodId: PaymentMethodId) =>
    setState((previous) => ({ ...previous, paymentMethodId }));

  const setSpecialRemarks = (napkins: boolean, remarks: string) =>
    setState((previous) => ({ ...previous, napkins, remarks }));

  const value = useMemo<CheckoutContextValue>(
    () => ({
      ...state,
      setPickupMethod,
      setPreorderSlot,
      setTakeawayBag,
      setPromoCode,
      setAppliedCoupon,
      setPaymentMethodId,
      setSpecialRemarks,
    }),
    [state],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
