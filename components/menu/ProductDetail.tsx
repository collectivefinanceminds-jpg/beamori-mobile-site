"use client";

import { useState } from "react";
import {
  computeUnitPriceCents,
  getDefaultSelectedOptionIds,
  hasRequiredSelections,
} from "@/lib/menu";
import type { ResolvedMenuProduct } from "./types";
import AddOnSection from "./AddOnSection";
import AllergenAccordion from "./AllergenAccordion";
import CloseButton from "./CloseButton";
import CustomisationGroup from "./CustomisationGroup";
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
  const { addItem } = useCart();
  const customisationGroups = product.customisationGroups ?? [];

  const [selectedOptionIdsByGroup, setSelectedOptionIdsByGroup] = useState(
    () => getDefaultSelectedOptionIds(product),
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const unitPriceCents = computeUnitPriceCents(
    product,
    selectedOptionIdsByGroup,
  );
  const addOnsCents = selectedAddOnIds.reduce((sum, addOnId) => {
    const addOn = addOns.find((item) => item.id === addOnId);
    return sum + (addOn ? addOn.priceCents : 0);
  }, 0);
  const totalCents = unitPriceCents * quantity + addOnsCents;
  const compareAtTotalCents = product.compareAtPriceCents
    ? product.compareAtPriceCents * quantity + addOnsCents
    : undefined;

  const canAddToCart =
    product.available && hasRequiredSelections(product, selectedOptionIdsByGroup);

  const handleOptionChange = (groupId: string, optionId: string) => {
    const group = customisationGroups.find((g) => g.id === groupId);
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

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOnIds((previous) =>
      previous.includes(addOnId)
        ? previous.filter((id) => id !== addOnId)
        : [...previous, addOnId],
    );
  };

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addItem({
      productId: product.id,
      quantity,
      selectedOptionIdsByGroup,
      unitPriceCents,
    });

    for (const addOnId of selectedAddOnIds) {
      const addOn = addOns.find((item) => item.id === addOnId);
      if (!addOn) continue;
      addItem({
        productId: addOn.id,
        quantity: 1,
        selectedOptionIdsByGroup: {},
        unitPriceCents: addOn.priceCents,
      });
    }

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="pb-40">
      <div className="px-gutter flex items-center pt-4">
        <CloseButton />
      </div>

      <div className="mt-3">
        <ProductHero product={product} />
      </div>

      {customisationGroups.length > 0 && (
        <div className="px-gutter mt-4">
          {/* Sits right below the hero, rounded top corners forming the
              visible seam between the two sections. */}
          <div className="rounded-card bg-surface p-4">
            <div className="flex flex-col gap-6">
              {customisationGroups.map((group) => (
                <CustomisationGroup
                  key={group.id}
                  group={group}
                  selectedIds={selectedOptionIdsByGroup[group.id] ?? []}
                  onChange={(optionId) => handleOptionChange(group.id, optionId)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <AddOnSection
          addOns={addOns}
          selectedIds={selectedAddOnIds}
          onToggle={handleAddOnToggle}
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
          !product.available ? "Sold Out" : justAdded ? "Added ✓" : "Add to Cart"
        }
        ctaDisabled={!canAddToCart}
      />
    </div>
  );
}
