"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/home/HomeIcons";

/**
 * Back returns to Cart/Menu without losing cart state (cart is app-wide,
 * so router.back() alone is enough — nothing to preserve manually).
 */
export default function CheckoutHeader() {
  const router = useRouter();

  return (
    <div className="px-gutter grid grid-cols-[2.25rem_1fr_2.25rem] items-center pt-4">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Back"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card"
      >
        <ChevronLeftIcon className="h-5 w-5 text-ink" />
      </button>
      <h1 className="text-center text-lg font-semibold text-ink">Checkout</h1>
      <div />
    </div>
  );
}
