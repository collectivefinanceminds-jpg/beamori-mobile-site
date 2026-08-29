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
                className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg border-2 px-6 py-1.5 text-center leading-tight transition-colors ${
                  isSelected
                    ? "border-forest bg-forest/10 font-semibold text-forest"
                    : "border-transparent bg-hairline font-medium text-ink"
                }`}
              >
                {/* min-h-11 (not a second, invisible line) keeps every
                    button in a group the same height — so a single-line
                    option's text is genuinely centered, not pushed up by
                    reserved space for a price line it doesn't have. */}
                <span className="text-[0.6875rem]">{option.label}</span>
                {hasPriceAdjustment && (
                  <span className="text-[0.625rem] text-muted">
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
