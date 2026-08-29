import type { CustomisationGroup as CustomisationGroupData } from "@/data/menu";
import { formatSgd } from "@/lib/currency";

export default function CustomisationGroup({
  group,
  selectedIds,
  onChange,
}: {
  group: CustomisationGroupData;
  selectedIds: string[];
  onChange: (optionId: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{group.label}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {group.options
          .filter((option) => option.available)
          .map((option) => {
            const isSelected = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange(option.id)}
                aria-pressed={isSelected}
                className={`rounded-btn border-2 px-4 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "border-forest bg-forest/10 font-semibold text-forest"
                    : "border-transparent bg-hairline font-medium text-ink"
                }`}
              >
                {option.label}
                {option.priceAdjustmentCents > 0 && (
                  <span className="ml-1.5 text-xs text-muted">
                    +{formatSgd(option.priceAdjustmentCents)}
                  </span>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
