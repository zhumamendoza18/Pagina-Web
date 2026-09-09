/**
 * Clients CCS has worked with.
 *
 * The names below come from the CCS Curriculum Empresarial 2026 ("empresas que
 * han confiado en nosotros"). They stay COMPLETELY HIDDEN until:
 *   1. the owner confirms each logo may be shown, AND
 *   2. the official local logo file exists in /public/images/ccs/clients/, AND
 *   3. `site.flags.showClients` is set to true.
 *
 * Guards: the section renders nothing (and takes no space) while
 * `site.flags.showClients` is false, the array is empty, OR no entry has
 * `visible: true`. Logos are LOCAL files only — never an internet URL, never a
 * fabricated logo. No specific project is associated with any company unless
 * it is documented.
 */

export interface ClientItem {
  name: string;
  /** Filename inside /public/images/ccs/clients/ (local asset only). "" => hidden. */
  logo: string;
  /** Optional link to the client's website. */
  url?: string;
  /** Optional industry (slug or label). */
  industry?: string;
  /** Optional project type. */
  projectType?: string;
  /** Must be explicitly turned on per client once its logo is authorised. */
  visible: boolean;
}

export const clients: ClientItem[] = [
  { name: "BRP", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Prologis", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Mercury", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Alfa Cronos", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "CommScope", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Lexmark", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Align", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Honeywell", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Edumex", logo: "", url: "", industry: "", projectType: "", visible: false },
  { name: "Flex", logo: "", url: "", industry: "", projectType: "", visible: false },
];

/** Clients cleared to appear publicly (logo authorised + asset present). */
export function visibleClients(): ClientItem[] {
  return clients.filter((client) => client.visible);
}

/** Resolves a client logo filename to a public path, or "" when none is set. */
export function clientLogoSrc(logo: string): string {
  return logo ? `/images/ccs/clients/${logo}` : "";
}
