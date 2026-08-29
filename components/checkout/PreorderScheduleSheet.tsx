"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/home/HomeIcons";
import { buildPreorderSchedule } from "@/lib/pickup";
import { formatFullDate, formatTime12h } from "@/lib/storeHours";

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Bottom sheet for choosing a pre-order date + time — same portal/scrim/
 * sheet-in technique as StoreAvailability. Day tabs across the top (today +
 * the configured booking horizon), a slot grid below for the selected day.
 */
export default function PreorderScheduleSheet({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
}) {
  const [now] = useState(() => new Date());
  const [schedule] = useState(() => buildPreorderSchedule(now));
  const [selectedDayIndex, setSelectedDayIndex] = useState(() =>
    Math.max(
      0,
      schedule.findIndex((day) => day.isOpen),
    ),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const selectedDay = schedule[selectedDayIndex];

  const handleConfirm = () => {
    if (!selectedDay || !selectedTime) return;
    onConfirm(toIsoDate(selectedDay.date), selectedTime);
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
        aria-label="Choose pre-order time"
        className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        <div className="px-gutter flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-ink">Pre-order</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="px-gutter mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {schedule.map((day, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <button
                key={day.date.toISOString()}
                type="button"
                disabled={!day.isOpen}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSelectedTime(null);
                }}
                className={`flex shrink-0 flex-col items-center rounded-lg border-2 px-3 py-2 text-xs transition-colors disabled:opacity-40 ${
                  isSelected
                    ? "border-forest bg-forest/10 font-semibold text-forest"
                    : "border-transparent bg-hairline text-ink"
                }`}
              >
                <span>
                  {day.date.toLocaleDateString("en-SG", { weekday: "short" })}
                </span>
                <span className="mt-0.5 text-sm font-semibold">
                  {day.date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-gutter mt-5 pb-6">
          {selectedDay && (
            <p className="text-sm font-semibold text-ink">
              {formatFullDate(selectedDay.date)}
            </p>
          )}

          {!selectedDay?.isOpen ? (
            <p className="mt-3 text-sm text-muted">
              Beamori is closed for pre-order this day.
            </p>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {selectedDay.slots.map((slot) => {
                const disabled = slot.status !== "available";
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedTime(slot.time)}
                    aria-pressed={isSelected}
                    className={`rounded-lg border-2 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      isSelected
                        ? "border-forest bg-forest/10 text-forest"
                        : "border-transparent bg-hairline text-ink"
                    }`}
                  >
                    {formatTime12h(slot.time)}
                    {slot.status === "full" && (
                      <span className="block text-[0.625rem] text-muted">
                        Full
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-gutter pb-6">
          <button
            type="button"
            disabled={!selectedTime}
            onClick={handleConfirm}
            className="rounded-btn w-full bg-forest py-3.5 text-center text-base font-semibold text-white disabled:bg-hairline disabled:text-muted"
          >
            Confirm Time
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
