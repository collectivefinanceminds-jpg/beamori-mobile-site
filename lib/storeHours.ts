import { WEEKLY_HOURS, type DayHours } from "@/data/storeHours";

export function getHoursForDate(date: Date): DayHours {
  return WEEKLY_HOURS[date.getDay()] ?? { isOpen: false };
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function isOpenAt(date: Date): boolean {
  const hours = getHoursForDate(date);
  if (!hours.isOpen || !hours.openTime || !hours.closeTime) return false;

  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  return (
    nowMinutes >= parseTimeToMinutes(hours.openTime) &&
    nowMinutes < parseTimeToMinutes(hours.closeTime)
  );
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date: Date): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

/**
 * 4 weeks total: 1 week before the current week, plus the current week
 * and 2 weeks after (3 weeks "in advance" counting the current week).
 */
export function buildAvailabilityCalendar(referenceDate = new Date()): Date[] {
  const rangeStart = startOfWeek(referenceDate);
  rangeStart.setDate(rangeStart.getDate() - 7);

  return Array.from({ length: 28 }, (_, i) => {
    const d = new Date(rangeStart);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function isSameDate(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

export function isPastDate(date: Date, today = new Date()): boolean {
  return startOfDay(date) < startOfDay(today);
}

export function formatTime12h(time: string): string {
  const [hoursStr, minutes] = time.split(":");
  const hours = Number(hoursStr);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes} ${period}`;
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
