import { TAKEAWAY_BAG_CONFIG } from "@/data/checkoutConfig";
import { formatSgd } from "@/lib/currency";

const OPTIONS: { label: string; value: boolean }[] = [
  { label: "No", value: false },
  { label: "Yes", value: true },
];

export default function TakeawayBagSelector({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="px-gutter mt-4">
      <div className="rounded-card flex items-center justify-between bg-surface p-4">
        <div>
          <h2 className="text-sm font-semibold text-ink">Takeaway Bag</h2>
          <p className="mt-0.5 text-xs text-muted">
            {TAKEAWAY_BAG_CONFIG.feeCents > 0
              ? `+${formatSgd(TAKEAWAY_BAG_CONFIG.feeCents)}`
              : "Free"}
          </p>
        </div>
        <div className="rounded-btn flex gap-1 bg-hairline p-1">
          {OPTIONS.map((option) => {
            const isActive = value === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onChange(option.value)}
                aria-pressed={isActive}
                className={`rounded-btn px-4 py-1.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-forest text-white" : "text-muted"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
