"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/home/HomeIcons";
import {
  computeUnitPriceCents,
  getDefaultSelectedOptionIds,
  hasRequiredSelections,
} from "@/lib/menu";
import AllergenAccordion from "./AllergenAccordion";
import ProductCustomizationCard from "./ProductCustomizationCard";
import ProductDescriptionCard from "./ProductDescriptionCard";
import ProductHero from "./ProductHero";
import StickyPurchaseBar from "./StickyPurchaseBar";
import type { ResolvedMenuProduct } from "./types";

/**
 * Bottom sheet for customising an add-on before it's added to the cart —
 * same portal/scrim/sheet-in technique as StoreAvailability, and otherwise
 * mirrors the full product page 1:1 (hero, name/description/customisation
 * card, product description, allergens, sticky purchase bar) so it reads
 * as the same page, just presented as a popup. Deliberately doesn't show
 * its own Add-ons section — nesting add-on recommendations inside an
 * add-on's own sheet would open the door to sheet-inside-a-sheet.
 */
export default function AddOnCustomizeSheet({
  addOn,
  onClose,
  onConfirm,
}: {
  addOn: ResolvedMenuProduct;
  onClose: () => void;
  onConfirm: (input: {
    quantity: number;
    selectedOptionIdsByGroup: Record<string, string[]>;
    unitPriceCents: number;
  }) => void;
}) {
  const [selectedOptionIdsByGroup, setSelectedOptionIdsByGroup] = useState(
    () => getDefaultSelectedOptionIds(addOn),
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const unitPriceCents = computeUnitPriceCents(addOn, selectedOptionIdsByGroup);
  const totalCents = unitPriceCents * quantity;
  const compareAtTotalCents = addOn.compareAtPriceCents
    ? addOn.compareAtPriceCents * quantity
    : undefined;
  const canConfirm =
    addOn.available && hasRequiredSelections(addOn, selectedOptionIdsByGroup);

  const handleOptionChange = (groupId: string, optionId: string) => {
    const group = (addOn.customisationGroups ?? []).find(
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

  return createPortal(
    <>
      <div
        className="animate-scrim-in fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Customise ${addOn.name}`}
        className="animate-sheet-in fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-ivory pb-40 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        <div className="px-gutter flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card"
          >
            <CloseIcon className="h-5 w-5 text-ink" />
          </button>
        </div>

        <div className="mt-3">
          <ProductHero product={addOn} />
        </div>

        <div className="mt-4">
          {/* Full-bleed — no px-gutter — matching the full product page. */}
          <ProductCustomizationCard
            product={addOn}
            selectedOptionIdsByGroup={selectedOptionIdsByGroup}
            onOptionChange={handleOptionChange}
          />
        </div>

        <div className="px-gutter mt-6 flex flex-col gap-3">
          <ProductDescriptionCard
            description={addOn.longDescription ?? addOn.description}
          />
          <AllergenAccordion allergens={addOn.allergens} />
        </div>

        <StickyPurchaseBar
          quantity={quantity}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrease={() => setQuantity((q) => q + 1)}
          totalCents={totalCents}
          compareAtTotalCents={compareAtTotalCents}
          onAddToCart={() =>
            canConfirm &&
            onConfirm({ quantity, selectedOptionIdsByGroup, unitPriceCents })
          }
          ctaLabel={!addOn.available ? "Sold Out" : "Add to Cart"}
          ctaDisabled={!canConfirm}
        />
      </div>
    </>,
    document.body,
  );
}
