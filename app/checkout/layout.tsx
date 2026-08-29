import type { ReactNode } from "react";
import { CheckoutProvider } from "@/components/checkout/CheckoutContext";

/**
 * Checkout state (pickup method/time, takeaway bag, promo code, applied
 * coupon, payment method, special remarks) is scoped to this route tree —
 * the coupon and payment-method sub-pages read/write the same instance and
 * router.back() to return, no props or query params needed.
 */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
