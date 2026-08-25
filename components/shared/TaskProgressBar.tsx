/**
 * Data-driven progress line: marker count comes from `required`, fill and
 * marker state come from `current`. One implementation reused at "sm" on
 * the homepage Task Center card and "lg" on the task detail page, so the
 * two never drift out of sync.
 */
export default function TaskProgressBar({
  current,
  required,
  size = "sm",
}: {
  current: number;
  required: number;
  size?: "sm" | "lg";
}) {
  const markerCount = Math.max(required, 1);
  const fraction = required > 0 ? Math.min(current / required, 1) : 0;

  const wrapperHeight = size === "lg" ? "h-3.5" : "h-2";
  const trackHeight = size === "lg" ? "h-1.5" : "h-1";
  const dotSize = size === "lg" ? "h-3.5 w-3.5" : "h-2 w-2";

  return (
    <div className={`relative w-full ${wrapperHeight}`}>
      <div
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${trackHeight} rounded-full bg-forest/20`}
      />
      <div
        className={`absolute top-1/2 left-0 -translate-y-1/2 ${trackHeight} rounded-full bg-forest transition-all duration-500`}
        style={{ width: `${fraction * 100}%` }}
      />
      {Array.from({ length: markerCount }).map((_, index) => {
        const position =
          markerCount > 1 ? (index / (markerCount - 1)) * 100 : 100;
        const reached = index + 1 <= current;
        return (
          <span
            key={index}
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface ${dotSize} ${
              reached ? "bg-forest" : "bg-forest/30"
            }`}
            style={{ left: `${position}%` }}
          />
        );
      })}
    </div>
  );
}
