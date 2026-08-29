import ToggleCard from "./ToggleCard";

/**
 * Missing/empty `allergens` renders an honest "no data yet" message instead
 * of a blanket statement, since the real source of truth will eventually be
 * Beamori's own admin data.
 */
export default function AllergenAccordion({
  allergens,
}: {
  allergens?: string[];
}) {
  const summary =
    allergens && allergens.length > 0
      ? `Contains: ${allergens.join(", ")}.`
      : "No specific allergen data available for this item yet.";

  return (
    <ToggleCard title="Allergens" preview={summary}>
      <p className="text-sm leading-relaxed text-muted">{summary}</p>
      <p className="mt-2 text-xs text-muted">
        Allergen information is provided as a guide only — final ingredient
        details are maintained by Beamori and may change.
      </p>
    </ToggleCard>
  );
}
