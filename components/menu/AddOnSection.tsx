import Image from "next/image";
import { formatSgd } from "@/lib/currency";
import type { ResolvedMenuProduct } from "./types";
import { CheckIcon } from "./MenuIcons";

export default function AddOnSection({
  addOns,
  selectedIds,
  onToggle,
}: {
  addOns: ResolvedMenuProduct[];
  selectedIds: string[];
  onToggle: (addOnId: string) => void;
}) {
  if (addOns.length === 0) return null;

  return (
    <section>
      <h2 className="px-gutter text-sm font-semibold text-ink">Add-ons</h2>
      <div className="px-gutter mt-2 flex gap-3 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {addOns.map((addOn) => {
          const isSelected = selectedIds.includes(addOn.id);
          return (
            <button
              key={addOn.id}
              type="button"
              onClick={() => onToggle(addOn.id)}
              aria-pressed={isSelected}
              className={`relative w-28 shrink-0 overflow-hidden rounded-card border-2 bg-surface text-left ${
                isSelected ? "border-forest" : "border-transparent"
              }`}
            >
              <span
                className={`absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? "border-forest bg-forest"
                    : "border-white bg-white/80"
                }`}
              >
                {isSelected && <CheckIcon className="h-3 w-3 text-white" />}
              </span>

              <div className="relative aspect-square w-full bg-ivory">
                {addOn.imageSrc ? (
                  <Image
                    src={addOn.imageSrc}
                    alt={addOn.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-1.5 flex items-center justify-center rounded border border-dashed border-hairline text-center text-[0.5rem] text-muted">
                    public/menu/{addOn.id}.png
                  </div>
                )}
              </div>

              <div className="p-2">
                <p className="truncate text-xs font-medium text-ink">
                  {addOn.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-semibold text-forest">
                    {formatSgd(addOn.priceCents)}
                  </span>
                  {addOn.compareAtPriceCents && (
                    <span className="text-[0.625rem] text-muted line-through">
                      {formatSgd(addOn.compareAtPriceCents)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
