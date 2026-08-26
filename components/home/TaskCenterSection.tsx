import { TASKS } from "@/data/tasks";
import { rankTasksForHomepage } from "@/lib/tasks";
import TaskCenterCarousel from "./TaskCenterCarousel";

/**
 * Up to 4 active tasks, ranked closest-to-completion first and, among
 * ties, easiest-to-complete next — simulated over mock data (see
 * rankTasksForHomepage). Real eligibility/randomised-fallback ranking is
 * future backend work.
 */
export default function TaskCenterSection() {
  const activeTasks = rankTasksForHomepage(TASKS);
  if (activeTasks.length === 0) return null;

  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">Task Center</h2>
      <div className="px-gutter mt-3">
        <TaskCenterCarousel tasks={activeTasks} />
      </div>
    </section>
  );
}
