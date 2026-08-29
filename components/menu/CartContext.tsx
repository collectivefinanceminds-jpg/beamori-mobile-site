"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  cartItemId: string;
  productId: string;
  quantity: number;
  /** Selected option ids per customisation group id — {} for an unconfigured item (e.g. an add-on). */
  selectedOptionIdsByGroup: Record<string, string[]>;
  /** Price for one unit at this configuration, in cents. */
  unitPriceCents: number;
};

type AddItemInput = {
  productId: string;
  quantity: number;
  selectedOptionIdsByGroup: Record<string, string[]>;
  unitPriceCents: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

// Two configurations of the same product (e.g. different milk choices)
// must stay separate cart lines, so identity is the product id plus its
// selected options — not the product id alone.
function buildCartItemId(
  productId: string,
  selectedOptionIdsByGroup: Record<string, string[]>,
): string {
  const configKey = Object.keys(selectedOptionIdsByGroup)
    .sort()
    .map(
      (groupId) =>
        `${groupId}:${[...selectedOptionIdsByGroup[groupId]].sort().join(",")}`,
    )
    .join("|");
  return `${productId}::${configKey}`;
}

/**
 * In-memory only, scoped to the /menu route tree (see app/menu/layout.tsx)
 * — no persistence yet. A natural next step once checkout exists is
 * localStorage or a Supabase-backed cart.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = ({
    productId,
    quantity,
    selectedOptionIdsByGroup,
    unitPriceCents,
  }: AddItemInput) => {
    const cartItemId = buildCartItemId(productId, selectedOptionIdsByGroup);

    setItems((previous) => {
      const existing = previous.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return previous.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...previous,
        {
          cartItemId,
          productId,
          quantity,
          selectedOptionIdsByGroup,
          unitPriceCents,
        },
      ];
    });
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, totalItems }),
    [items, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
