"use client";

import { useState } from "react";
import { computeEstimatedReadyTime, parseIsoDate } from "@/lib/pickup";
import { formatFullDate, formatTime12h } from "@/lib/storeHours";
import { useCheckout, type PickupMethod } from "./CheckoutContext";
import PickupLocationRow from "./PickupLocationRow";
import PickupMethodToggle from "./PickupMethodToggle";
import PreorderScheduleSheet from "./PreorderScheduleSheet";

function toTimeString(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/**
 * One large card combining the pickup method toggle, the ready-time/
 * pre-order-slot display, and the pickup location — per the reference
 * layout's card hierarchy.
 */
export default function PickupCard() {
  const {
    pickupMethod,
    preorderDate,
    preorderTime,
    setPickupMethod,
    setPreorderSlot,
  } = useCheckout();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [readyTime] = useState(() => computeEstimatedReadyTime());

  const handleMethodChange = (method: PickupMethod) => {
    setPickupMethod(method);
    if (method === "preorder" && !preorderTime) {
      setSheetOpen(true);
    }
  };

  const preorderLabel =
    preorderDate && preorderTime
      ? `${formatFullDate(parseIsoDate(preorderDate))}, ${formatTime12h(preorderTime)}`
      : null;

  return (
    <div className="px-gutter mt-4">
      <div className="rounded-card bg-surface p-4">
        <h2 className="text-sm font-semibold text-ink">Pick-up</h2>

        <div className="mt-3">
          <PickupMethodToggle
            value={pickupMethod}
            onChange={handleMethodChange}
          />
        </div>

        {pickupMethod === "now" ? (
          <p className="mt-3 text-sm text-ink">
            Will be ready at{" "}
            <span className="font-semibold">
              {formatTime12h(toTimeString(readyTime))}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="mt-3 flex w-full items-center justify-between rounded-lg bg-hairline px-3 py-2.5 text-left"
          >
            <span
              className={`text-sm ${preorderLabel ? "text-ink" : "text-muted"}`}
            >
              {preorderLabel ?? "Choose a pickup time"}
            </span>
            <span className="text-xs font-semibold text-forest">
              {preorderLabel ? "Change" : "Select"}
            </span>
          </button>
        )}

        <div className="mt-4 border-t border-hairline pt-4">
          <PickupLocationRow />
        </div>
      </div>

      {sheetOpen && (
        <PreorderScheduleSheet
          onClose={() => setSheetOpen(false)}
          onConfirm={(date, time) => {
            setPreorderSlot(date, time);
            setSheetOpen(false);
          }}
        />
      )}
    </div>
  );
}
