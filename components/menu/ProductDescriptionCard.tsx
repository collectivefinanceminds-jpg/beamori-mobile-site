import ToggleCard from "./ToggleCard";

export default function ProductDescriptionCard({
  description,
}: {
  description?: string;
}) {
  if (!description) return null;

  return (
    <ToggleCard title="Product Description" preview={description}>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </ToggleCard>
  );
}
