/**
 * Clients CCS has worked with.
 *
 * Intentionally EMPTY. Do NOT add any company name or logo until CCS provides
 * the confirmed list. The section stays completely hidden (renders nothing,
 * occupies no space) while `site.flags.showClients` is false OR this array is
 * empty. Logos are LOCAL files only — never an internet URL.
 */

export interface ClientItem {
  name: string;
  /** Filename inside /public/images/ccs/clients/ (local asset only). */
  logo: string;
  /** Optional link to the client's website. */
  url?: string;
  /** Optional industry (slug or label). */
  industry?: string;
  /** Optional project type. */
  projectType?: string;
}

export const clients: ClientItem[] = [];

/** Resolves a client logo filename to a public path, or "" when none is set. */
export function clientLogoSrc(logo: string): string {
  return logo ? `/images/ccs/clients/${logo}` : "";
}
