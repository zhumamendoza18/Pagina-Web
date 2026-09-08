import "../globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { locales, isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/config/site";
import {
  SITE_URL,
  OG_LOCALE,
  alternatesFor,
  defaultDescription,
  localePath,
  organizationJsonLd,
} from "@/lib/seo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "es";
  const tagline = site.tagline[l];
  const title = `${site.name} — ${tagline}`;
  const description = defaultDescription(l);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description,
    applicationName: site.name,
    alternates: alternatesFor(l, ""),
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: localePath(l),
      locale: OG_LOCALE[l],
      alternateLocale: locales
        .filter((x) => x !== l)
        .map((x) => OG_LOCALE[x]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body
        id="top"
        className="flex min-h-dvh flex-col bg-white font-sans text-ccs-charcoal antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(locale)),
          }}
        />
        <SkipLink label={dict.header.skipToContent} />
        <Header locale={locale} dict={dict} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
