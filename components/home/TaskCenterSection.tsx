import { TASKS } from "@/data/tasks";
import TaskCenterCarousel from "./TaskCenterCarousel";

/**
 * Up to 4 active tasks. Selection/ranking (closest-to-completion first,
 * etc.) is future backend logic — for this frontend phase the first 4
 * mock tasks are shown as-is.
 */
export default function TaskCenterSection() {
  const activeTasks = TASKS.slice(0, 4);
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
