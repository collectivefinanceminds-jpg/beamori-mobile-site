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
            const hasPriceAdjustment = option.priceAdjustmentCents > 0;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange(option.id)}
                aria-pressed={isSelected}
                className={`rounded-md border-2 px-3 py-2 text-xs transition-colors ${
                  isSelected
                    ? "border-forest bg-forest/10 font-semibold text-forest"
                    : "border-transparent bg-hairline font-medium text-ink"
                }`}
              >
                {hasPriceAdjustment ? (
                  <span className="flex flex-col items-center text-center">
                    <span>{option.label}</span>
                    <span className="text-[0.6875rem] text-muted">
                      +{formatSgd(option.priceAdjustmentCents)}
                    </span>
                  </span>
                ) : (
                  option.label
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
