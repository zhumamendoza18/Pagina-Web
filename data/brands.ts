/**
 * Brands / manufacturers / suppliers whose products CCS uses.
 *
 * Intentionally EMPTY. Do NOT add any brand (no Home Depot, no anything)
 * until CCS provides the confirmed list. The section stays completely hidden
 * (renders nothing, occupies no space) while `site.flags.showBrands` is false
 * OR this array is empty. Logos are LOCAL files only — never an internet URL.
 */

export interface BrandItem {
  name: string;
  /** Filename inside /public/images/ccs/brands/ (local asset only). */
  logo: string;
  /** Optional link to the brand's website. */
  url?: string;
}

export const brands: BrandItem[] = [];

/** Resolves a brand logo filename to a public path, or "" when none is set. */
export function brandLogoSrc(logo: string): string {
  return logo ? `/images/ccs/brands/${logo}` : "";
}
