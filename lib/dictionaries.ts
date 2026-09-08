import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { es } from "@/content/es";
import { en } from "@/content/en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

/**
 * Returns the full dictionary for a locale. Server-side; pass the result
 * (or a slice of it) down to components as props.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
