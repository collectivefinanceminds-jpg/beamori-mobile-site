"use client";

import { useState } from "react";
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

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addItem({
      productId: product.id,
      quantity,
      selectedOptionIdsByGroup,
      unitPriceCents,
    });

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
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
    setActiveAddOnId(null);
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
        <div className="rounded-[1.5rem] bg-surface px-8 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">{product.name}</h1>
            {!product.available && (
              <span className="rounded-btn bg-hairline px-2.5 py-1 text-xs font-semibold text-muted">
                Sold Out
              </span>
            )}
          </div>
          {product.description && (
            <p className="mt-2 text-sm text-muted">{product.description}</p>
          )}

          {customisationGroups.length > 0 && (
            <div className="mt-6 flex flex-col gap-6">
              {customisationGroups.map((group) => (
                <CustomisationGroup
                  key={group.id}
                  group={group}
                  selectedIds={selectedOptionIdsByGroup[group.id] ?? []}
                  onChange={(optionId) => handleOptionChange(group.id, optionId)}
                />
              ))}
            </div>
          )}
        </div>
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
          !product.available ? "Sold Out" : justAdded ? "Added ✓" : "Add to Cart"
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
