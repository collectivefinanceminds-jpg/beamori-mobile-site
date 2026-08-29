// All operational values below are placeholders pending real Beamori Admin
// configuration — kept as structured config rather than hardcoded into
// components so the eventual Admin-driven values are a drop-in replacement.

export type PickupConfig = {
  /** Minutes from now a Pickup Now order is estimated ready. */
  prepTimeMinutes: number;
  /** Earliest a pre-order slot can be relative to now, in minutes. */
  minLeadTimeMinutes: number;
  /** Spacing between selectable pre-order time slots, in minutes. */
  slotIntervalMinutes: number;
  /** Orders a single time slot can hold before it's marked Full. */
  maxOrdersPerSlot: number;
  /** How many days forward (including today) pre-order booking allows. */
  bookingHorizonDays: number;
};

export const PICKUP_CONFIG: PickupConfig = {
  prepTimeMinutes: 15,
  minLeadTimeMinutes: 30,
  slotIntervalMinutes: 15,
  maxOrdersPerSlot: 5,
  bookingHorizonDays: 7,
};

export type TakeawayBagConfig = {
  /** 0 = currently free. */
  feeCents: number;
};

export const TAKEAWAY_BAG_CONFIG: TakeawayBagConfig = {
  feeCents: 0,
};

export type RemarksConfig = {
  maxLength: number;
};

export const REMARKS_CONFIG: RemarksConfig = {
  maxLength: 140,
};

// Mock per-slot order counts ("YYYY-MM-DD|HH:MM" -> count), placeholder
// until real order data exists — drives the "Full" pre-order slot state.
export const MOCK_SLOT_ORDER_COUNTS: Record<string, number> = {};
