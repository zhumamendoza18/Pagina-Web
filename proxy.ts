import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

/**
 * Ensures every request lands on a locale-prefixed path (/es or /en).
 * A bare or unprefixed path is redirected, using the Accept-Language
 * header to pick the best match (falling back to the default locale).
 *
 * (Next.js 16 renamed the "middleware" convention to "proxy".)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function pickLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (header) {
    const requested = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim().toLowerCase())
      .filter(Boolean);

    for (const lang of requested) {
      if (lang === "es" || lang.startsWith("es-")) return "es";
      if (lang === "en" || lang.startsWith("en-")) return "en";
    }
  }
  return defaultLocale;
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
