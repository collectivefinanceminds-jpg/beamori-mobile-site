import type { ResolvedMenuProduct } from "./types";
import CustomisationGroup from "./CustomisationGroup";

/**
 * Name, short description, and customisation groups in one full-bleed
 * card — shared between the full product page and the add-on customise
 * sheet, so both look identical here.
 */
export default function ProductCustomizationCard({
  product,
  selectedOptionIdsByGroup,
  onOptionChange,
}: {
  product: ResolvedMenuProduct;
  selectedOptionIdsByGroup: Record<string, string[]>;
  onOptionChange: (groupId: string, optionId: string) => void;
}) {
  const customisationGroups = product.customisationGroups ?? [];

  return (
    <div className="rounded-[1.5rem] bg-surface px-8 py-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-ink">{product.name}</h1>
        {!product.available && (
          <span className="rounded-btn bg-hairline px-2.5 py-1 text-xs font-semibold text-muted">
            Sold Out
          </span>
        )}
      </div>
      {product.description && (
        <p className="mt-2 text-sm text-muted">{product.description}</p>
      )}

      {customisationGroups.length > 0 && (
        <div className="mt-6 flex flex-col gap-6">
          {customisationGroups.map((group) => (
            <CustomisationGroup
              key={group.id}
              group={group}
              selectedIds={selectedOptionIdsByGroup[group.id] ?? []}
              onChange={(optionId) => onOptionChange(group.id, optionId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
