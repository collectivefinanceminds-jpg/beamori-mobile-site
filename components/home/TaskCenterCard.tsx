import Link from "next/link";
import type { Task } from "@/data/tasks";
import { formatTaskProgressLabel } from "@/lib/tasks";
import RewardImageSlot from "@/components/shared/RewardImageSlot";
import TaskProgressBar from "@/components/shared/TaskProgressBar";

/**
 * The entire card is one tap target to the task detail page — the CTA
 * below is styled like a button but is a plain <span>, not nested
 * interactive content, per the "whole card is clickable" requirement.
 * Left/right split is 60/40 via flex-[1.5]/flex-1 (1.5 : 1 == 60 : 40),
 * which also gives the reward-image slot correct responsive scaling for
 * free instead of hardcoded breakpoint widths.
 */
export default function TaskCenterCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="relative block aspect-5/2 w-full rounded-card bg-surface shadow-card"
    >
      {/* overflow-hidden lives on this inner layer, separate from the
          shadow above — putting both on the same element clips the
          shadow unevenly right at the rounded corners. */}
      <div className="flex h-full items-stretch gap-3 overflow-hidden rounded-card p-4">
        <div className="flex min-w-0 flex-[1.5] flex-col justify-between">
          <h3 className="line-clamp-2 text-sm font-bold text-ink">
            {task.title}
          </h3>

          <div className="flex flex-col gap-1.5">
            <TaskProgressBar
              current={task.currentProgress}
              required={task.requiredProgress}
              size="sm"
            />
            <p className="text-xs text-muted">
              {formatTaskProgressLabel(
                task.currentProgress,
                task.requiredProgress,
                task.progressUnit,
              )}
            </p>
          </div>

          <span className="rounded-btn self-start bg-forest px-4 py-1.5 text-xs font-semibold text-white">
            {task.ctaLabel}
          </span>
        </div>

        <RewardImageSlot
          src={task.rewardImage}
          alt={task.rewardName}
          className="flex-1 shrink-0"
        />
      </div>
    </Link>
  );
}
