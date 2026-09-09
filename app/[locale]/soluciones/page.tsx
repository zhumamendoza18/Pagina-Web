import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { allSolutions } from "@/data/solutions";
import { getQuoteHref } from "@/lib/navigation";
import { alternatesFor, localePath } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  SolutionSection,
  type SolutionSectionLabels,
} from "@/components/solutions/SolutionSection";
import type { SolutionIconName } from "@/components/ui/SolutionIcon";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "es";
  const dict = getDictionary(l);
  const { metaTitle, metaDescription } = dict.solutionsPage;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: alternatesFor(l, "soluciones"),
    openGraph: {
      title: `${metaTitle} — ${dict.solutionsPage.title}`,
      description: metaDescription,
      url: localePath(l, "soluciones"),
    },
  };
}

export default async function SolutionsIndexPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const page = dict.solutionsPage;
  const families = allSolutions();

  const labels: SolutionSectionLabels = {
    viewProcess: page.viewProcess,
    whatIsIt: page.whatIsIt,
    benefits: page.benefitsLabel,
    idealFor: page.idealForLabel,
    summaryPending: page.summaryPending,
    topicsGroupLabel: page.topicsGroupLabel,
    imagePlaceholder: page.imagePlaceholder,
    gallery: page.gallery,
  };

  return (
    <>
      <Section variant="navy" spacing="large" aria-labelledby="solutions-page-title">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan">
            {page.kicker}
          </p>
          <h1
            id="solutions-page-title"
            className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {page.intro}
          </p>
        </Container>
      </Section>

      {families.map((family, index) => (
        <SolutionSection
          key={family.slug}
          locale={locale}
          index={index}
          familySlug={family.slug}
          familyTitle={
            dict.solutions.categories[
              family.titleKey as keyof typeof dict.solutions.categories
            ]
          }
          icon={family.icon as SolutionIconName}
          subtopics={family.subtopics}
          defaultTopicSlug={family.defaultTopicSlug}
          labels={labels}
        />
      ))}

      <Section variant="light" spacing="large">
        <Container>
          <div className="border-t border-ccs-line pt-10">
            <Button href={getQuoteHref(locale)} variant="primary" size="lg">
              {dict.actions.requestQuote}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
