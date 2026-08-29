import type { ReactNode } from "react";
import { MapPinIcon } from "@/components/menu/MenuIcons";

/**
 * Beamori's single pickup location — shared visual language between the
 * Menu page's address row and Checkout's pickup card. `trailing` is a slot
 * for whatever sits alongside the address (the Menu page's store-status
 * trigger; Checkout owns its own pickup-method UI instead, so it omits it).
 */
export default function PickupLocationRow({
  trailing,
}: {
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <a
          href="https://maps.app.goo.gl/y7aJM9HSDr75GrSc6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-ink underline-offset-2 hover:underline"
        >
          <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-forest" />
          298C Compassvale Street, 543298
        </a>
        <p className="mt-0.5 text-xs text-muted">Unit No: #15-80</p>
      </div>
      {trailing}
    </div>
  );
}
