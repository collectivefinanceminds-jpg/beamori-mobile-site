import Link from "next/link";
import { notFound } from "next/navigation";
import { getTaskById, type TaskStatus } from "@/data/tasks";
import { formatTaskCountdown, formatTaskProgressLabel } from "@/lib/tasks";
import RewardImageSlot from "@/components/shared/RewardImageSlot";
import TaskProgressBar from "@/components/shared/TaskProgressBar";
import BackButton from "@/components/tasks/BackButton";
import RulesButton from "@/components/tasks/RulesButton";

const STATUS_LABELS: Record<TaskStatus, string> = {
  locked: "Locked",
  "in-progress": "In Progress",
  completed: "Completed",
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = getTaskById(id);
  if (!task) notFound();

  const countdown = formatTaskCountdown(task.endsAt);

  return (
    <div className="pb-section">
      <div className="px-gutter flex items-center justify-between pt-4">
        <BackButton />
        <RulesButton />
      </div>

      <h1 className="px-gutter mt-6 text-2xl font-bold text-ink">
        {task.title}
      </h1>

      <div className="px-gutter mt-8 flex justify-center">
        <RewardImageSlot
          src={task.rewardImage}
          alt={task.rewardName}
          className="h-48 w-48"
        />
      </div>

      <p className="mt-4 text-center text-lg font-semibold text-ink">
        {task.rewardName}
      </p>
      <p className="mt-1 text-center text-sm text-muted">
        {STATUS_LABELS[task.status]}
      </p>

      <div className="px-gutter mt-8">
        <TaskProgressBar
          current={task.currentProgress}
          required={task.requiredProgress}
          size="lg"
        />
      </div>

      <p className="px-gutter mt-3 text-center text-base font-semibold text-ink">
        {formatTaskProgressLabel(
          task.currentProgress,
          task.requiredProgress,
          task.progressUnit,
        )}
      </p>
      <p className="px-gutter mt-1 text-center text-xs text-muted">
        Keep going to unlock this reward.
      </p>

      {countdown && (
        <p className="px-gutter mt-4 text-center text-sm text-ink">
          Ending in: <span className="font-semibold text-forest">{countdown}</span>
        </p>
      )}

      <div className="px-gutter mt-10">
        <Link
          href="/menu"
          className="rounded-btn block w-full bg-forest py-3.5 text-center text-base font-semibold text-white"
        >
          {task.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
