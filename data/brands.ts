/**
 * Brands / manufacturers / suppliers whose products CCS uses.
 *
 * The names below come from the CCS Curriculum Empresarial 2026. They stay
 * COMPLETELY HIDDEN until:
 *   1. the owner confirms the current supplier list, AND
 *   2. the official local logo file exists in /public/images/ccs/brands/, AND
 *   3. `site.flags.showBrands` is set to true.
 *
 * Guards: the section renders nothing (and takes no space) while
 * `site.flags.showBrands` is false, the array is empty, OR no entry has
 * `visible: true`. Logos are LOCAL files only — never an internet URL, never a
 * fabricated logo.
 *
 * CERTIFICATIONS: the corporate document states CCS is a certified applicator
 * for several manufacturers, but "Aplicador certificado de…" must NOT be shown
 * publicly for any brand until the owner confirms which certifications are
 * still current and with which brands. Default: `certifiedApplicator: false`.
 *
 * TODO: Confirmar certificaciones vigentes con dirección antes de publicar.
 */

export interface BrandItem {
  name: string;
  /** Filename inside /public/images/ccs/brands/ (local asset only). "" => hidden. */
  logo: string;
  /** Optional link to the brand's website. */
  url?: string;
  /**
   * Only true once the owner confirms this specific certification is current.
   * Even then, wording shown publicly must be approved.
   */
  certifiedApplicator: boolean;
  /** Must be explicitly turned on per brand once its logo is authorised. */
  visible: boolean;
}

export const brands: BrandItem[] = [
  { name: "Sika", logo: "", url: "", certifiedApplicator: false, visible: false },
  { name: "Torginol", logo: "", url: "", certifiedApplicator: false, visible: false },
  { name: "Corvixx Polymers", logo: "", url: "", certifiedApplicator: false, visible: false },
  { name: "Neogard", logo: "", url: "", certifiedApplicator: false, visible: false },
  {
    name: "Convergent Concrete Technologies",
    logo: "",
    url: "",
    certifiedApplicator: false,
    visible: false,
  },
];

/** Brands cleared to appear publicly (logo authorised + asset present). */
export function visibleBrands(): BrandItem[] {
  return brands.filter((brand) => brand.visible);
}

/** Resolves a brand logo filename to a public path, or "" when none is set. */
export function brandLogoSrc(logo: string): string {
  return logo ? `/images/ccs/brands/${logo}` : "";
}
