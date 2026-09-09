import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/config/site";
import { getQuoteHref } from "@/lib/navigation";
import { alternatesFor, localePath } from "@/lib/seo";
import { storyImageSrc, storyConfig } from "@/data/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { EthosGrid } from "@/components/company/EthosGrid";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "es";
  const dict = getDictionary(l);
  const { metaTitle, metaDescription, title } = dict.aboutPage;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: alternatesFor(l, "nosotros"),
    openGraph: {
      title: `${metaTitle} — ${title}`,
      description: metaDescription,
      url: localePath(l, "nosotros"),
    },
  };
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const page = dict.aboutPage;
  const blocks = [page.blocks.origin, page.blocks.experience, page.blocks.support];

  return (
    <>
      <Section variant="light" spacing="large" aria-labelledby="about-title">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
                {page.kicker}
              </p>
              <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-ccs-navy sm:text-4xl lg:text-5xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ccs-gray">
                {page.intro}
              </p>
              <p className="mt-8 inline-flex items-center rounded-full bg-ccs-navy px-3.5 py-1.5 text-sm font-semibold text-white">
                {page.sinceLabel} {site.foundedYear}
              </p>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg sm:aspect-[3/4] lg:aspect-auto lg:h-[32rem]">
              <Media
                src={storyImageSrc()}
                alt={page.imageAlt}
                placeholderLabel={page.imagePlaceholder}
                placeholderTone="light"
                position={storyConfig.imagePosition}
                sizes="(min-width: 1024px) 50vw, 100vw"
                fill
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="muted" spacing="large" reveal>
        <Container>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {blocks.map((block) => (
              <li key={block.title}>
                <h2 className="text-xl font-bold leading-tight text-ccs-navy">
                  {block.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ccs-gray">
                  {block.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section variant="light" spacing="large" reveal aria-labelledby="about-ethos-title">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
            {page.ethosKicker}
          </p>
          <h2
            id="about-ethos-title"
            className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-ccs-navy sm:text-4xl"
          >
            {page.ethosTitle}
          </h2>

          <div className="mt-10 lg:mt-12">
            <EthosGrid ethos={dict.ethos} />
          </div>

          <div className="mt-14 border-t border-ccs-line pt-10">
            <Button href={getQuoteHref(locale)} variant="primary" size="lg">
              {dict.actions.requestQuote}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
