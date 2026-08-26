import type { ReactNode } from "react";
import { CartProvider } from "@/components/menu/CartContext";
import CartOverlay from "@/components/menu/CartOverlay";

/**
 * Cart is scoped to the /menu route tree (this layout + its nested
 * /menu/[id]), not app-wide — nothing outside the menu experience needs
 * it yet.
 */
export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartOverlay />
    </CartProvider>
  );
}
