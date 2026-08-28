"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  buildAvailabilityCalendar,
  formatFullDate,
  formatTime12h,
  getHoursForDate,
  isOpenAt,
  isPastDate,
  isSameDate,
} from "@/lib/storeHours";
import { CloseIcon } from "@/components/home/HomeIcons";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * Self-contained: owns its own open/selected-date state, needs no props.
 * The trigger (status pill + "check availability" text) sits inline in
 * the page; the calendar itself is a portalled bottom sheet, same
 * pattern as LoginSheet.
 */
export default function StoreAvailability() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [now] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  const openNow = isOpenAt(now);
  const calendarDates = buildAvailabilityCalendar(now);
  const selectedHours = getHoursForDate(selectedDate);

  useEffect(() => {
    if (!sheetOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sheetOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="flex flex-col items-start gap-1.5"
        style={{ "--cta-size": "1.0625rem" } as React.CSSProperties}
      >
        <span
          className={`rounded-btn px-4 py-2 font-bold ${
            openNow ? "bg-forest/15 text-forest" : "bg-hairline text-muted"
          }`}
          style={{ fontSize: "var(--cta-size)" }}
        >
          {openNow ? "Open now" : "Closed"}
        </span>
        {/* Sized as a fraction of the CTA above via the shared --cta-size
            variable, so the two stay proportional if the CTA size ever
            changes again. */}
        <span
          className="text-muted underline underline-offset-2"
          style={{ fontSize: "calc(var(--cta-size) * 0.65)" }}
        >
          Check availability
        </span>
      </button>

      {sheetOpen &&
        createPortal(
          <>
            <div
              className="animate-scrim-in fixed inset-0 z-50 bg-black/40"
              onClick={() => setSheetOpen(false)}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Store availability"
              className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface"
            >
              <div className="px-gutter flex items-center justify-between pt-5">
                <h2 className="text-lg font-semibold text-ink">
                  Our Availability
                </h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close"
                  className="text-muted"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="px-gutter pt-6 pb-8">
                <div className="grid grid-cols-7 gap-1.5">
                  {WEEKDAY_LABELS.map((label, index) => (
                    <span
                      key={index}
                      className="text-center text-[0.6875rem] font-medium text-muted"
                    >
                      {label}
                    </span>
                  ))}

                  {calendarDates.map((date) => {
                    const hours = getHoursForDate(date);
                    const isSelected = isSameDate(date, selectedDate);
                    const isPast = isPastDate(date, now);
                    const isToday = isSameDate(date, now);

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center justify-center gap-0.5 rounded-lg py-2 text-sm transition-colors ${
                          hours.isOpen ? "bg-forest/15" : "bg-hairline"
                        } ${isPast ? "opacity-40" : ""} ${
                          isSelected
                            ? "font-semibold text-ink"
                            : "text-muted"
                        } ${isToday ? "ring-1 ring-forest" : ""}`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-card bg-ivory p-4">
                  <p className="text-sm font-semibold text-ink">
                    {formatFullDate(selectedDate)}
                  </p>
                  {selectedHours.isOpen &&
                  selectedHours.openTime &&
                  selectedHours.closeTime ? (
                    <>
                      <p className="mt-1 text-sm text-muted">
                        Open {formatTime12h(selectedHours.openTime)} –{" "}
                        {formatTime12h(selectedHours.closeTime)}
                      </p>
                      {selectedHours.preOrderAvailable ? (
                        <>
                          <p className="mt-1 text-xs text-forest">
                            Pre-order available
                          </p>
                          <button
                            type="button"
                            onClick={() => setSheetOpen(false)}
                            className="rounded-btn mt-3 w-full bg-forest py-3 text-center text-sm font-semibold text-white"
                          >
                            Order Now
                          </button>
                        </>
                      ) : (
                        <p className="mt-1 text-xs text-muted">
                          Pre-order not available this day
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="mt-1 text-sm text-muted">Closed</p>
                  )}
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
