import type { Task } from "@/data/tasks";

/**
 * Simulates the future backend ranking with mock data only — Priority 1:
 * closest to completion by percentage (not raw count, so 4/5 outranks
 * 2/3). Priority 2: among ties, the task requiring fewer total steps is
 * "easier" and ranks higher. Real ranking (eligibility, randomised
 * fallback, etc.) is backend work for later.
 */
export function rankTasksForHomepage(tasks: Task[], limit = 4): Task[] {
  return [...tasks]
    .sort((a, b) => {
      const percentA =
        a.requiredProgress > 0 ? a.currentProgress / a.requiredProgress : 0;
      const percentB =
        b.requiredProgress > 0 ? b.currentProgress / b.requiredProgress : 0;
      if (percentB !== percentA) return percentB - percentA;
      return a.requiredProgress - b.requiredProgress;
    })
    .slice(0, limit);
}

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
