import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { allIndustries, industryImageSrc } from "@/data/industries";
import { getIndustryHref } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IndustryCard } from "@/components/industries/IndustryCard";

interface IndustriesProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * "Industries we serve" — four cards that are almost entirely photograph.
 * Dark-gray background and a tall four-up strip, so it reads clearly
 * different from the "Our solutions" grid above it.
 */
export function Industries({ locale, dict }: IndustriesProps) {
  const { industries } = dict;
  const segments = allIndustries();

  return (
    <Section variant="charcoal" spacing="large" reveal aria-labelledby="industries-title">
      <Container>
        <h2
          id="industries-title"
          className="text-xl font-extrabold uppercase tracking-[0.1em] text-white sm:text-3xl sm:tracking-[0.14em] lg:text-4xl"
        >
          {industries.heading}
        </h2>
      </Container>

      <Container className="mt-10 lg:mt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment, index) => {
            const name = industries.segments[segment.titleKey];
            return (
              <IndustryCard
                key={segment.slug}
                href={getIndustryHref(locale, segment.slug)}
                name={name}
                icon={segment.icon}
                imageSrc={industryImageSrc(segment)}
                imageAlt={name}
                placeholderLabel={industries.imagePlaceholder}
                priority={index < 2}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
