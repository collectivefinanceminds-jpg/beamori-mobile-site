export default function ProductDescriptionCard({
  description,
}: {
  description?: string;
}) {
  if (!description) return null;

  return (
    <div className="rounded-card bg-surface p-4">
      <h2 className="text-sm font-semibold text-ink">Product Description</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
