import type { PickupMethod } from "./CheckoutContext";

const METHODS: { value: PickupMethod; label: string }[] = [
  { value: "now", label: "Pickup Now" },
  { value: "preorder", label: "Pre-order" },
];

export default function PickupMethodToggle({
  value,
  onChange,
}: {
  value: PickupMethod;
  onChange: (method: PickupMethod) => void;
}) {
  return (
    <div className="rounded-btn flex gap-1 bg-hairline p-1">
      {METHODS.map((method) => {
        const isActive = value === method.value;
        return (
          <button
            key={method.value}
            type="button"
            onClick={() => onChange(method.value)}
            aria-pressed={isActive}
            className={`rounded-btn flex-1 py-2 text-sm font-semibold transition-colors ${
              isActive ? "bg-forest text-white" : "text-muted"
            }`}
          >
            {method.label}
          </button>
        );
      })}
    </div>
  );
}
