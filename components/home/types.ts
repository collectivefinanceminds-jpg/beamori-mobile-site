import type { Task } from "@/data/tasks";

export type ResolvedTask = Task & { rewardImageSrc: string | null };
