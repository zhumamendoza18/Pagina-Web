import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n";
import { SITE_URL, localePath } from "@/lib/seo";

/**
 * Routes below the locale segment. Add each new page here as it ships
 * (e.g. "industrias", "proyectos", "contacto").
 */
const ROUTES = ["", "soluciones", "nosotros"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    locales.map((locale) => {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${SITE_URL}${localePath(l, route)}`;
      }
      languages["x-default"] = `${SITE_URL}${localePath(defaultLocale, route)}`;
      return {
        url: `${SITE_URL}${localePath(locale, route)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
        alternates: { languages },
      };
    }),
  );
}
