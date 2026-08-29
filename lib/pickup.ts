import {
  MOCK_SLOT_ORDER_COUNTS,
  PICKUP_CONFIG,
  type PickupConfig,
} from "@/data/checkoutConfig";
import { getHoursForDate, isPastDate, isSameDate } from "./storeHours";

/** Parses a "YYYY-MM-DD" string as a local date, avoiding the UTC-midnight
 * footgun of `new Date("YYYY-MM-DD")`. */
export function parseIsoDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** "Will be ready at ..." for Pickup Now — never hardcoded into a component. */
export function computeEstimatedReadyTime(
  now = new Date(),
  config: PickupConfig = PICKUP_CONFIG,
): Date {
  return new Date(now.getTime() + config.prepTimeMinutes * 60_000);
}

/**
 * Today + `horizonDays` forward, inclusive of today — distinct from
 * lib/storeHours.ts's buildAvailabilityCalendar, which is a 4-week
 * both-direction calendar for the Menu page's own availability sheet.
 */
export function buildForwardBookingWindow(
  referenceDate = new Date(),
  horizonDays: number = PICKUP_CONFIG.bookingHorizonDays,
): Date[] {
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: horizonDays }, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    return date;
  });
}

export type PickupSlotStatus = "available" | "full" | "too-late" | "past";

export type PickupSlot = {
  time: string; // "HH:MM", 24-hour
  status: PickupSlotStatus;
};

export type PickupDay = {
  date: Date;
  /** Open for pre-order specifically — see DayHours.preOrderAvailable. */
  isOpen: boolean;
  slots: PickupSlot[];
};

function slotOrderKey(date: Date, time: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}|${time}`;
}

/**
 * One day's selectable pre-order slots, each classified into one of the 4
 * per-slot states. A day that's closed, or open but not configured for
 * pre-order, comes back with isOpen: false and no slots at all — that's
 * the 5th, day-level "Closed" state.
 */
export function generateSlotsForDay(
  date: Date,
  now: Date = new Date(),
  config: PickupConfig = PICKUP_CONFIG,
): PickupDay {
  const hours = getHoursForDate(date);
  const openForPreorder = hours.isOpen && hours.preOrderAvailable !== false;

  if (!openForPreorder || !hours.openTime || !hours.closeTime) {
    return { date, isOpen: false, slots: [] };
  }

  const [openHour, openMinute] = hours.openTime.split(":").map(Number);
  const [closeHour, closeMinute] = hours.closeTime.split(":").map(Number);
  const openMinutesTotal = openHour * 60 + openMinute;
  const closeMinutesTotal = closeHour * 60 + closeMinute;
  const leadCutoff = new Date(now.getTime() + config.minLeadTimeMinutes * 60_000);
  const isToday = isSameDate(date, now);

  const slots: PickupSlot[] = [];
  for (
    let minutes = openMinutesTotal;
    minutes < closeMinutesTotal;
    minutes += config.slotIntervalMinutes
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    const slotDate = new Date(date);
    slotDate.setHours(hour, minute, 0, 0);

    let status: PickupSlotStatus;
    if (isPastDate(date, now) || (isToday && slotDate < now)) {
      status = "past";
    } else if (slotDate < leadCutoff) {
      status = "too-late";
    } else if (
      (MOCK_SLOT_ORDER_COUNTS[slotOrderKey(date, time)] ?? 0) >=
      config.maxOrdersPerSlot
    ) {
      status = "full";
    } else {
      status = "available";
    }

    slots.push({ time, status });
  }

  return { date, isOpen: true, slots };
}

/** The full pre-order picker's data — one call for the whole booking window. */
export function buildPreorderSchedule(
  now: Date = new Date(),
  config: PickupConfig = PICKUP_CONFIG,
): PickupDay[] {
  return buildForwardBookingWindow(now, config.bookingHorizonDays).map(
    (date) => generateSlotsForDay(date, now, config),
  );
}
