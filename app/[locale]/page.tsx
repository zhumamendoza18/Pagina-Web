import { notFound } from "next/navigation";

import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Solutions } from "@/components/home/Solutions";
import { DemandingEnvironments } from "@/components/home/DemandingEnvironments";
import { Industries } from "@/components/home/Industries";
import { Work } from "@/components/home/Work";
import { Applications } from "@/components/home/Applications";
import { Ethos } from "@/components/home/Ethos";
import { Clients } from "@/components/home/Clients";
import { Brands } from "@/components/home/Brands";
import { ConversionCta } from "@/components/home/ConversionCta";
import { QuoteSection } from "@/components/home/QuoteSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

// Home metadata (title, description, canonical, hreflang, OG, Twitter) is
// provided by app/[locale]/layout.tsx.

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />

      <Story locale={locale} dict={dict} />

      <Solutions locale={locale} dict={dict} />

      <DemandingEnvironments locale={locale} dict={dict} />

      <Industries locale={locale} dict={dict} />

      <Work locale={locale} dict={dict} />

      <Applications locale={locale} dict={dict} />

      <Ethos dict={dict} />

      {/* Hidden while their feature flags are off — they render nothing and
          take no space until CCS provides real data. */}
      <Clients dict={dict} />
      <Brands dict={dict} />

      {/* Placeholder band so the natural scroll is visible. The remaining
          sections (About, Contact, …) are added in later phases and
          are not compressed by anything here. */}
      <Section variant="muted" spacing="large" reveal>
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
            {dict.home.kicker}
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold text-ccs-navy sm:text-4xl">
            {dict.home.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ccs-gray">
            {dict.home.subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-sm text-ccs-charcoal/70">
            {dict.home.body}
          </p>
          <p className="mt-10 text-sm text-ccs-gray">{dict.home.statusNote}</p>
        </Container>
      </Section>

      <ConversionCta locale={locale} dict={dict} />

      <QuoteSection dict={dict} />
    </>
  );
}
