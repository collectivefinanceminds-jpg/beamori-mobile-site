import type { PaymentMethod } from "@/data/paymentMethods";
import { renderPaymentMethodIcon } from "./PaymentIcons";

export default function PaymentMethodListItem({
  method,
  isSelected,
  onSelect,
}: {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      {renderPaymentMethodIcon(method.id, {
        className: "h-5 w-5 shrink-0 text-forest",
      })}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{method.label}</p>
        <p className="mt-0.5 truncate text-xs text-muted">
          {method.description}
        </p>
      </div>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          isSelected ? "border-forest bg-forest" : "border-hairline"
        }`}
      >
        {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}
