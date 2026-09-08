/**
 * Central site configuration for Concrete Coatings Solutions.
 *
 * RULE: never invent data. Anything CCS has not confirmed stays as an empty
 * string / empty array. Components must handle empty values gracefully
 * (e.g. no WhatsApp number => no WhatsApp link is rendered at all).
 */

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok";

export interface SiteConfig {
  /** Commercial / brand name shown across the site. */
  name: string;
  /** Full legal entity name. */
  legalName: string;
  /** Tagline per language. */
  tagline: {
    es: string;
    en: string;
  };
  /** Year the company started operating. Shown as "Desde 2009" / "Since 2009". */
  foundedYear: number;

  /**
   * Contact details. Empty string = unknown / not provided yet.
   * Do NOT fill these in with guesses.
   */
  contact: {
    /** Public phone in international format, e.g. "+52...". Empty = no tel: link. */
    phone: string;
    /** WhatsApp number, digits only with country code, e.g. "52...". Empty = no wa.me link. */
    whatsapp: string;
    /** Public email address. Empty = no mailto: link. */
    email: string;
    /** Postal / physical address as a single display string. Empty = hidden. */
    address: string;
  };

  /** Social profile URLs. Empty string = link not rendered. */
  social: Record<SocialPlatform, string>;

  /**
   * Feature flags for content that is prepared structurally but must stay
   * hidden until CCS provides the real information.
   */
  flags: {
    /** Show the "clients we have worked with" section. */
    showClients: boolean;
    /** Show the "brands / manufacturers we use" section. */
    showBrands: boolean;
    /** Show the projects gallery (structure is ready even while empty). */
    showProjects: boolean;
  };
}

export const site: SiteConfig = {
  name: "Concrete Coatings Solutions",
  legalName: "Soluciones para el Recubrimiento del Concreto S. de R.L. de C.V.",
  tagline: {
    es: "Expertos en Sellos de Pisos",
    // TODO: confirm the official English tagline with CCS.
    en: "Floor Sealing Experts",
  },
  foundedYear: 2009,

  contact: {
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
  },

  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
  },

  flags: {
    showClients: false,
    showBrands: false,
    showProjects: true,
  },
};
