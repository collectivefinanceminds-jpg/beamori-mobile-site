"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatSgd } from "@/lib/currency";
import { isProductDetailRoute } from "@/lib/nav";
import { useCart } from "./CartContext";
import { CartIcon } from "./MenuIcons";

/**
 * Fixed, column-width wrapper (same technique as BottomNav) so the pill/bar
 * aligns with the centered phone column at any viewport width, sitting
 * just above the persistent bottom nav. Hidden on product detail pages,
 * where the sticky purchase bar already owns that space and BottomNav
 * itself is hidden too (see AppShell).
 */
export default function CartOverlay() {
  const pathname = usePathname();
  const { items, totalItems } = useCart();

  if (isProductDetailRoute(pathname)) return null;

  const totalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );

  return (
    <div className="pointer-events-none fixed bottom-[calc(var(--spacing-navbar)+env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-gutter">
      {totalItems === 0 ? (
        <div className="flex justify-end">
          <span className="rounded-btn pointer-events-auto flex items-center gap-1.5 bg-surface/90 px-3 py-2 text-xs font-medium text-muted shadow-card">
            <CartIcon className="h-5.5 w-5.5" />0 item
          </span>
        </div>
      ) : (
        <Link
          href="/cart"
          className="rounded-btn pointer-events-auto flex items-center justify-between bg-forest px-5 py-3.5 text-white shadow-card"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <CartIcon className="h-5 w-5" />
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
          <span className="text-sm font-semibold">
            {formatSgd(totalCents)}
          </span>
        </Link>
      )}
    </div>
  );
}
