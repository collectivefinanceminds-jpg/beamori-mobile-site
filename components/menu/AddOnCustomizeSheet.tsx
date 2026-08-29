"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CloseIcon } from "@/components/home/HomeIcons";
import { formatSgd } from "@/lib/currency";
import {
  computeUnitPriceCents,
  getDefaultSelectedOptionIds,
  hasRequiredSelections,
} from "@/lib/menu";
import CustomisationGroup from "./CustomisationGroup";
import type { ResolvedMenuProduct } from "./types";

/**
 * Bottom sheet for customising an add-on before it's added to the cart —
 * same portal/scrim/sheet-in technique as StoreAvailability. Its own
 * quantity + price + Add to Cart, independent of the parent product's.
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

  const customisationGroups = addOn.customisationGroups ?? [];
  const unitPriceCents = computeUnitPriceCents(addOn, selectedOptionIdsByGroup);
  const totalCents = unitPriceCents * quantity;
  const canConfirm = hasRequiredSelections(addOn, selectedOptionIdsByGroup);

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
        className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface"
      >
        <div className="px-gutter flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-ink">{addOn.name}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="px-gutter mt-4">
          <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-card bg-ivory">
            {addOn.imageSrc ? (
              <Image
                src={addOn.imageSrc}
                alt={addOn.name}
                fill
                sizes="160px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-2 flex items-center justify-center rounded-lg border-2 border-dashed border-hairline text-center text-[0.625rem] text-muted">
                public/menu/{addOn.id}.png
              </div>
            )}
          </div>
        </div>

        {customisationGroups.length > 0 && (
          <div className="px-gutter mt-6 flex flex-col gap-6">
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

        <div className="px-gutter sticky bottom-0 mt-6 flex items-center justify-between bg-surface pt-3 pb-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-lg text-ink disabled:opacity-30"
            >
              −
            </button>
            <span className="w-4 text-center text-base font-semibold text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-lg text-ink"
            >
              +
            </button>
          </div>
          <span className="text-lg font-bold text-forest">
            {formatSgd(totalCents)}
          </span>
        </div>

        <div className="px-gutter pb-6">
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() =>
              canConfirm &&
              onConfirm({ quantity, selectedOptionIdsByGroup, unitPriceCents })
            }
            className="rounded-btn w-full bg-forest py-3.5 text-center text-base font-semibold text-white disabled:bg-hairline disabled:text-muted"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
