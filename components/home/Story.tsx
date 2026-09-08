import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { site } from "@/config/site";
import { storyImageSrc, storyConfig } from "@/data/home";
import { getAboutHref } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

interface StoryProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * History & experience band, immediately after the hero.
 * Roughly 50% photo / 50% content, lots of vertical space, one short
 * paragraph, and non-numeric highlight chips (no invented statistics).
 */
export function Story({ locale, dict }: StoryProps) {
  const { story } = dict;

  return (
    <Section
      as="section"
      variant="light"
      spacing="large"
      reveal
      aria-labelledby="story-title"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg sm:aspect-[3/4] lg:aspect-auto lg:h-[34rem]">
            <Media
              src={storyImageSrc()}
              alt={story.imageAlt}
              placeholderLabel={story.imagePlaceholder}
              placeholderTone="light"
              position={storyConfig.imagePosition}
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill
            />
          </div>

          {/* Content */}
          <div className="lg:pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ccs-cyan-dark">
              {story.kicker}
            </p>

            <h2
              id="story-title"
              className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-ccs-navy sm:text-4xl lg:text-5xl"
            >
              {story.title}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ccs-gray">
              {story.body}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              <li className="inline-flex items-center rounded-full bg-ccs-navy px-3.5 py-1.5 text-sm font-semibold text-white">
                {story.sinceLabel} {site.foundedYear}
              </li>
              {story.highlights.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center rounded-full border border-ccs-line bg-white px-3.5 py-1.5 text-sm font-medium text-ccs-charcoal"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={getAboutHref(locale)} variant="secondary" size="lg">
                {story.cta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
