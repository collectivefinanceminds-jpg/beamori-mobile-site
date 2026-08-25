import Image from "next/image";

/**
 * Reserved space for reward/achievement artwork supplied via task data.
 * Never invents substitute artwork — shows a neutral dashed placeholder
 * until `src` is set, matching the drop-in-image convention used
 * elsewhere on the homepage (Promotions, Action cards).
 */
export default function RewardImageSlot({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-[calc(var(--radius-card)-0.5rem)] border-2 border-dashed border-hairline text-center ${className ?? ""}`}
      >
        <span className="text-[10px] text-muted">Reward artwork</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes="200px" className="object-contain" />
    </div>
  );
}
