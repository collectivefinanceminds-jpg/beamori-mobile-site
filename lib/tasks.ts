export function formatTaskProgressLabel(
  current: number,
  required: number,
  unit: string,
): string {
  const pluralUnit = required === 1 ? unit : `${unit}s`;
  return `${current}/${required} ${pluralUnit} checked!`;
}

/**
 * Static snapshot computed at render time (page load/refresh), not a
 * ticking client-side timer — sufficient for this frontend-only phase.
 */
export function formatTaskCountdown(endsAt: string | null): string | null {
  if (!endsAt) return null;

  const diffMs = new Date(endsAt).getTime() - Date.now();
  if (diffMs <= 0) return "Ended";

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${days} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}
