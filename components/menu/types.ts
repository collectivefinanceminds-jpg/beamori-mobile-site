import type { MenuProduct } from "@/data/menu";

export type ResolvedMenuProduct = MenuProduct & { imageSrc: string | null };
