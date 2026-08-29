"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  computeUnitPriceCents,
  getDefaultSelectedOptionIds,
  hasRequiredSelections,
} from "@/lib/menu";
import type { ResolvedMenuProduct } from "./types";
import AddOnCustomizeSheet from "./AddOnCustomizeSheet";
import AddOnSection from "./AddOnSection";
import AllergenAccordion from "./AllergenAccordion";
import CloseButton from "./CloseButton";
import { CheckIcon } from "./MenuIcons";
import ProductCustomizationCard from "./ProductCustomizationCard";
import ProductDescriptionCard from "./ProductDescriptionCard";
import ProductHero from "./ProductHero";
import StickyPurchaseBar from "./StickyPurchaseBar";
import { useCart } from "./CartContext";

export default function ProductDetail({
  product,
  addOns,
}: {
  product: ResolvedMenuProduct;
  addOns: ResolvedMenuProduct[];
}) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedOptionIdsByGroup, setSelectedOptionIdsByGroup] = useState(
    () => getDefaultSelectedOptionIds(product),
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // How many of each add-on this session has added to the cart via its own
  // customise sheet — drives the quantity badge on its tile.
  const [addOnQuantities, setAddOnQuantities] = useState<Record<string, number>>(
    {},
  );
  const [activeAddOnId, setActiveAddOnId] = useState<string | null>(null);
  const activeAddOn = addOns.find((addOn) => addOn.id === activeAddOnId) ?? null;

  const unitPriceCents = computeUnitPriceCents(
    product,
    selectedOptionIdsByGroup,
  );
  const totalCents = unitPriceCents * quantity;
  const compareAtTotalCents = product.compareAtPriceCents
    ? product.compareAtPriceCents * quantity
    : undefined;

  const canAddToCart =
    product.available && hasRequiredSelections(product, selectedOptionIdsByGroup);

  const handleOptionChange = (groupId: string, optionId: string) => {
    const group = (product.customisationGroups ?? []).find(
      (g) => g.id === groupId,
    );
    if (!group) return;

    setSelectedOptionIdsByGroup((previous) => {
      if (group.selectionType === "single") {
        return { ...previous, [groupId]: [optionId] };
      }
      const current = previous[groupId] ?? [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...previous, [groupId]: next };
    });
  };

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addItem({
      productId: product.id,
      quantity,
      selectedOptionIdsByGroup,
      unitPriceCents,
    });

    // Show "Added to Cart" on the button for a beat before leaving, so the
    // confirmation is visible before the page closes. Not disabled — the
    // button stays responsive the whole time.
    setJustAdded(true);
    window.setTimeout(() => {
      // Return to wherever the customer was on the Menu (scroll position
      // included) — same as the close button, since adding to cart is done.
      router.back();
    }, 500);
  };

  const handleAddOnConfirm = (input: {
    quantity: number;
    selectedOptionIdsByGroup: Record<string, string[]>;
    unitPriceCents: number;
  }) => {
    if (!activeAddOn) return;

    addItem({
      productId: activeAddOn.id,
      quantity: input.quantity,
      selectedOptionIdsByGroup: input.selectedOptionIdsByGroup,
      unitPriceCents: input.unitPriceCents,
    });

    setAddOnQuantities((previous) => ({
      ...previous,
      [activeAddOn.id]: (previous[activeAddOn.id] ?? 0) + input.quantity,
    }));
    // Closing the sheet itself (after its own delay) is handled by
    // AddOnCustomizeSheet — this only updates cart state.
  };

  return (
    <div className="pb-40">
      <div className="px-gutter flex items-center pt-4">
        <CloseButton />
      </div>

      <div className="mt-3">
        <ProductHero product={product} />
      </div>

      <div className="mt-4">
        {/* Full-bleed — no px-gutter — spanning the entire site width,
            unlike every other card on this page. */}
        <ProductCustomizationCard
          product={product}
          selectedOptionIdsByGroup={selectedOptionIdsByGroup}
          onOptionChange={handleOptionChange}
        />
      </div>

      <div className="mt-6">
        <AddOnSection
          addOns={addOns}
          quantities={addOnQuantities}
          onSelect={setActiveAddOnId}
        />
      </div>

      <div className="px-gutter mt-6 flex flex-col gap-3">
        <ProductDescriptionCard
          description={product.longDescription ?? product.description}
        />
        <AllergenAccordion allergens={product.allergens} />
      </div>

      <StickyPurchaseBar
        quantity={quantity}
        onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        onIncrease={() => setQuantity((q) => q + 1)}
        totalCents={totalCents}
        compareAtTotalCents={compareAtTotalCents}
        onAddToCart={handleAddToCart}
        ctaLabel={
          !product.available ? (
            "Sold Out"
          ) : justAdded ? (
            <span className="flex items-center justify-center gap-1.5">
              Added to Cart
              <CheckIcon className="h-5 w-5" strokeWidth={3} />
            </span>
          ) : (
            "Add to Cart"
          )
        }
        ctaDisabled={!canAddToCart}
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
