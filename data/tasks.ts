export type TaskStatus = "locked" | "in-progress" | "completed";

export type Task = {
  id: string;
  title: string;
  currentProgress: number;
  requiredProgress: number;
  progressUnit: string;
  ctaLabel: string;
  /** Path under public/, e.g. "home/tasks/order-5-drinks.png" — null until real artwork is supplied. */
  rewardImage: string | null;
  rewardName: string;
  status: TaskStatus;
  /** ISO date string, or null for tasks with no deadline. */
  endsAt: string | null;
};

// Mock data only — the shape is designed to map 1:1 onto a future
// Supabase `tasks` table without redesigning any component.
export const TASKS: Task[] = [
  {
    id: "order-1-drink",
    title: "Order 1 drink to unlock an achievement",
    currentProgress: 0,
    requiredProgress: 1,
    progressUnit: "drink",
    ctaLabel: "Order Now",
    rewardImage: null,
    rewardName: "First Sip Badge",
    status: "in-progress",
    endsAt: null,
  },
  {
    id: "order-3-drinks",
    title: "Order 3 drinks this week to earn a reward",
    currentProgress: 1,
    requiredProgress: 3,
    progressUnit: "drink",
    ctaLabel: "Order Now",
    rewardImage: null,
    rewardName: "Weekly Regular",
    status: "in-progress",
    endsAt: "2026-09-01T00:00:00.000Z",
  },
  {
    id: "order-5-drinks",
    title: "Order 5 drinks to unlock an achievement",
    currentProgress: 2,
    requiredProgress: 5,
    progressUnit: "drink",
    ctaLabel: "Order Now",
    rewardImage: null,
    rewardName: "August Brew Buddy",
    status: "in-progress",
    endsAt: "2026-08-31T23:59:59.000Z",
  },
  {
    id: "try-new-menu",
    title: "Try 2 new menu items to unlock a surprise",
    currentProgress: 0,
    requiredProgress: 2,
    progressUnit: "item",
    ctaLabel: "View Menu",
    rewardImage: null,
    rewardName: "Explorer Badge",
    status: "in-progress",
    endsAt: null,
  },
];

export function getTaskById(id: string): Task | undefined {
  return TASKS.find((task) => task.id === id);
}
