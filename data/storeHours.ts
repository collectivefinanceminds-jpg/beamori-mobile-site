export type DayHours = {
  isOpen: boolean;
  openTime?: string; // "HH:MM", 24-hour
  closeTime?: string; // "HH:MM", 24-hour
  preOrderAvailable?: boolean;
};

// Mock weekly schedule — placeholder until real opening hours are
// confirmed. Keyed by JS Date.getDay() (0 = Sunday ... 6 = Saturday).
export const WEEKLY_HOURS: Record<number, DayHours> = {
  0: { isOpen: false },
  1: {
    isOpen: true,
    openTime: "09:00",
    closeTime: "21:00",
    preOrderAvailable: true,
  },
  2: {
    isOpen: true,
    openTime: "09:00",
    closeTime: "21:00",
    preOrderAvailable: true,
  },
  3: {
    isOpen: true,
    openTime: "09:00",
    closeTime: "21:00",
    preOrderAvailable: true,
  },
  4: {
    isOpen: true,
    openTime: "09:00",
    closeTime: "21:00",
    preOrderAvailable: true,
  },
  5: {
    isOpen: true,
    openTime: "09:00",
    closeTime: "22:00",
    preOrderAvailable: true,
  },
  6: {
    isOpen: true,
    openTime: "10:00",
    closeTime: "22:00",
    preOrderAvailable: false,
  },
};
