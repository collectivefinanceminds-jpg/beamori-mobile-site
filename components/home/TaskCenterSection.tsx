import { TASKS } from "@/data/tasks";
import { findPublicAsset } from "@/lib/media";
import { rankTasksForHomepage } from "@/lib/tasks";
import type { ResolvedTask } from "./types";
import TaskCenterCarousel from "./TaskCenterCarousel";

/**
 * Up to 4 active tasks, ranked closest-to-completion first and, among
 * ties, easiest-to-complete next — simulated over mock data (see
 * rankTasksForHomepage). Real eligibility/randomised-fallback ranking is
 * future backend work.
 */
export default function TaskCenterSection() {
  const resolvedTasks: ResolvedTask[] = TASKS.map((task) => ({
    ...task,
    rewardImageSrc: findPublicAsset(`home/quest/${task.id}`),
  }));
  const activeTasks = rankTasksForHomepage(resolvedTasks);
  if (activeTasks.length === 0) return null;

  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">Quest</h2>
      <div className="px-gutter mt-3">
        <TaskCenterCarousel tasks={activeTasks} />
      </div>
    </section>
  );
}
