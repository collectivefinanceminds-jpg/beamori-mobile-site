import type { MenuCategory, MenuProduct } from "@/data/menu";

export type ResolvedMenuProduct = MenuProduct & { imageSrc: string | null };
export type ResolvedMenuCategory = MenuCategory & { iconSrc: string | null };
