"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId);
        router.back();
      }}
      className="rounded-btn mt-6 w-full bg-forest py-3.5 text-center text-base font-semibold text-white"
    >
      Add to Cart
    </button>
  );
}
