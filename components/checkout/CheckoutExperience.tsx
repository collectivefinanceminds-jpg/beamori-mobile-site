"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/menu/CartContext";
import AddOnCustomizeSheet from "@/components/menu/AddOnCustomizeSheet";
import AddOnSection from "@/components/menu/AddOnSection";
import type { ResolvedMenuProduct } from "@/components/menu/types";
import { TAKEAWAY_BAG_CONFIG } from "@/data/checkoutConfig";
import { computePromoDiscountCents, findPromoCode } from "@/data/promoCodes";
import { computeDiscountCents } from "@/lib/coupons";
import { getAddOnsForCart } from "@/lib/menu";
import CheckoutHeader from "./CheckoutHeader";
import { useCheckout } from "./CheckoutContext";
import OrderSummarySection from "./OrderSummarySection";
import PaymentMethodCard from "./PaymentMethodCard";
import PickupCard from "./PickupCard";
import PriceSummaryCard from "./PriceSummaryCard";
import PromoCodeCard from "./PromoCodeCard";
import SpecialRemarksCard from "./SpecialRemarksCard";
import TakeawayBagSelector from "./TakeawayBagSelector";
import CheckoutStickyBar from "./CheckoutStickyBar";

export default function CheckoutExperience({
  catalog,
}: {
  catalog: ResolvedMenuProduct[];
}) {
  const router = useRouter();
  const cart = useCart();
  const checkout = useCheckout();

  const [activeAddOnId, setActiveAddOnId] = useState<string | null>(null);

  const addOns = useMemo(
    () => getAddOnsForCart(cart.items.map((item) => item.productId), catalog),
    [cart.items, catalog],
  );
  const activeAddOn = addOns.find((addOn) => addOn.id === activeAddOnId) ?? null;

  // Reflects actual cart quantity per product, not a session-local tally —
  // this page IS the cart view, so the badge should always match reality.
  const addOnQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cart.items) {
      map[item.productId] = (map[item.productId] ?? 0) + item.quantity;
    }
    return map;
  }, [cart.items]);

  const subtotalCents = cart.items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );
  const couponDiscountCents = checkout.appliedCoupon
    ? computeDiscountCents(checkout.appliedCoupon, subtotalCents)
    : 0;
  const promoMatch = checkout.promoCode ? findPromoCode(checkout.promoCode) : undefined;
  const promoDiscountCents = promoMatch
    ? computePromoDiscountCents(promoMatch, subtotalCents)
    : 0;
  const bagFeeCents = checkout.takeawayBag ? TAKEAWAY_BAG_CONFIG.feeCents : 0;
  const totalCents = Math.max(
    0,
    subtotalCents - couponDiscountCents - promoDiscountCents + bagFeeCents,
  );

  const handleAddOnConfirm = (input: {
    quantity: number;
    selectedOptionIdsByGroup: Record<string, string[]>;
    unitPriceCents: number;
  }) => {
    if (!activeAddOn) return;
    cart.addItem({
      productId: activeAddOn.id,
      quantity: input.quantity,
      selectedOptionIdsByGroup: input.selectedOptionIdsByGroup,
      unitPriceCents: input.unitPriceCents,
    });
    setActiveAddOnId(null);
  };

  if (cart.items.length === 0) {
    return (
      <div className="pb-section">
        <CheckoutHeader />
        <div className="px-gutter mt-16 flex flex-col items-center text-center">
          <p className="text-sm text-muted">Your cart is empty.</p>
          <Link
            href="/menu"
            className="rounded-btn mt-4 bg-forest px-6 py-3 text-sm font-semibold text-white"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-44">
      <CheckoutHeader />

      <PickupCard />

      <OrderSummarySection catalog={catalog} />

      <TakeawayBagSelector
        value={checkout.takeawayBag}
        onChange={checkout.setTakeawayBag}
      />

      <div className="mt-6">
        <AddOnSection
          addOns={addOns}
          quantities={addOnQuantities}
          onSelect={setActiveAddOnId}
        />
      </div>

      <PriceSummaryCard
        subtotalCents={subtotalCents}
        couponLabel={checkout.appliedCoupon?.title ?? null}
        discountCents={couponDiscountCents}
        promoDiscountCents={promoDiscountCents}
        onSelectCoupon={() => router.push("/checkout/coupons")}
        totalCents={totalCents}
      />

      <PromoCodeCard />

      <PaymentMethodCard paymentMethodId={checkout.paymentMethodId} />

      <SpecialRemarksCard />

      <CheckoutStickyBar
        totalCents={totalCents}
        ctaDisabled={!checkout.paymentMethodId || cart.items.length === 0}
      />

      {activeAddOn && (
        <AddOnCustomizeSheet
          addOn={activeAddOn}
          onClose={() => setActiveAddOnId(null)}
          onConfirm={handleAddOnConfirm}
        />
      )}
    </div>
  );
}
