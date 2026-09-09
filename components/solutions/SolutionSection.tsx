"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { subtopicCoverSrc, type SolutionSubtopic } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Lightbox } from "@/components/ui/Lightbox";
import { SolutionIcon, type SolutionIconName } from "@/components/ui/SolutionIcon";

export interface SolutionSectionLabels {
  viewProcess: string;
  whatIsIt: string;
  benefits: string;
  idealFor: string;
  summaryPending: string;
  topicsGroupLabel: string;
  imagePlaceholder: string;
  gallery: { label: string; close: string; prev: string; next: string };
}

interface SolutionSectionProps {
  locale: Locale;
  /** Alternates the background band. */
  index: number;
  /** Anchor id — kept identical to the previous page so existing links work. */
  familySlug: string;
  familyTitle: string;
  icon: SolutionIconName;
  subtopics: SolutionSubtopic[];
  defaultTopicSlug?: string;
  labels: SolutionSectionLabels;
}

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * One independent, interactive family block on /soluciones. Left pane: the
 * album cover with a "Ver proceso" action that opens this section's lightbox.
 * Right pane: the family title, its own subtopic chips, and the selected
 * subtopic's short copy. State is per-section — nothing here touches another
 * family.
 */
export function SolutionSection({
  locale,
  index,
  familySlug,
  familyTitle,
  icon,
  subtopics,
  defaultTopicSlug,
  labels,
}: SolutionSectionProps) {
  const first = subtopics[0];
  const [selectedSlug, setSelectedSlug] = useState(
    defaultTopicSlug && subtopics.some((s) => s.slug === defaultTopicSlug)
      ? defaultTopicSlug
      : first?.slug,
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const topic = subtopics.find((s) => s.slug === selectedSlug) ?? first;
  if (!topic) return null;

  const gallery = topic.gallery ?? [];
  const realCount = gallery.filter((g) => g.src).length;
  const hasAlbum = realCount > 0;
  const cover = subtopicCoverSrc(topic);
  const thumbs = gallery
    .map((g, i) => ({ ...g, i }))
    .filter((g) => g.src)
    .slice(0, 4);
  const lightboxImages = gallery.map((g) => ({
    src: g.src,
    alt: g.alt[locale],
  }));

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  const bandClass = index % 2 === 0 ? "bg-white" : "bg-ccs-light";
  const benefits = topic.benefits?.[locale] ?? [];
  const idealFor = topic.idealFor?.[locale] ?? [];

  return (
    <section
      id={familySlug}
      aria-labelledby={`${familySlug}-title`}
      className={`scroll-mt-20 py-20 sm:py-28 lg:py-32 ${bandClass}`}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Header — first on mobile, right column top on desktop */}
          <div className="lg:col-start-2 lg:row-start-1">
            <span
              aria-hidden="true"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ccs-line text-ccs-navy"
            >
              <SolutionIcon name={icon} className="h-5 w-5" />
            </span>
            <h2
              id={`${familySlug}-title`}
              className="mt-4 text-2xl font-extrabold leading-tight text-ccs-navy sm:text-3xl"
            >
              {familyTitle}
            </h2>
          </div>

          {/* Visual — second on mobile, left column (full height) on desktop */}
          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <div
              key={selectedSlug}
              className="ccs-fade relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ccs-charcoal"
            >
              {hasAlbum ? (
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  aria-label={`${labels.viewProcess} — ${topic.name[locale]}`}
                  className="group absolute inset-0 h-full w-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ccs-cyan"
                >
                  <Media
                    src={cover}
                    alt=""
                    placeholderLabel={labels.imagePlaceholder}
                    placeholderTone="dark"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    fill
                    imageClassName="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ccs-navy/85 via-ccs-navy/15 to-transparent"
                  />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    {labels.viewProcess}
                    <Arrow />
                  </span>
                </button>
              ) : (
                <Media
                  src={cover}
                  alt=""
                  placeholderLabel={labels.imagePlaceholder}
                  placeholderTone="dark"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  fill
                />
              )}
            </div>

            {thumbs.length > 0 && (
              <ul className="mt-3 grid grid-cols-4 gap-3">
                {thumbs.map((t) => (
                  <li key={t.i}>
                    <button
                      type="button"
                      onClick={() => openLightbox(t.i)}
                      aria-label={`${labels.viewProcess} — ${t.i + 1}`}
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded border border-ccs-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan-dark"
                    >
                      <Media src={t.src} alt="" sizes="140px" fill />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Chips + selected subtopic — third on mobile, right column bottom */}
          <div className="lg:col-start-2 lg:row-start-2">
            <div
              role="group"
              aria-label={labels.topicsGroupLabel}
              className="flex flex-wrap gap-2"
            >
              {subtopics.map((st) => {
                const active = st.slug === selectedSlug;
                return (
                  <button
                    key={st.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedSlug(st.slug)}
                    className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan-dark ${
                      active
                        ? "border-ccs-navy bg-ccs-navy text-white"
                        : "border-ccs-line bg-white text-ccs-charcoal hover:border-ccs-navy/40 hover:bg-ccs-light"
                    }`}
                  >
                    {st.name[locale]}
                  </button>
                );
              })}
            </div>

            <div key={selectedSlug} className="ccs-fade mt-8">
              <h3 className="text-xl font-bold text-ccs-navy sm:text-2xl">
                {topic.name[locale]}
              </h3>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ccs-gray">
                {labels.whatIsIt}
              </h4>
              <p className="mt-2 max-w-prose text-base leading-relaxed text-ccs-charcoal/85">
                {topic.summary?.[locale] ?? labels.summaryPending}
              </p>

              {benefits.length > 0 && (
                <>
                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ccs-gray">
                    {labels.benefits}
                  </h4>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-base text-ccs-charcoal/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ccs-cyan-dark"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {idealFor.length > 0 && (
                <>
                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ccs-gray">
                    {labels.idealFor}
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {idealFor.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center rounded-full border border-ccs-line bg-white px-3 py-1 text-sm text-ccs-charcoal"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Lightbox
        open={lightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxOpen(false)}
        labels={{
          label: `${labels.gallery.label} — ${familyTitle}`,
          close: labels.gallery.close,
          prev: labels.gallery.prev,
          next: labels.gallery.next,
          placeholder: labels.imagePlaceholder,
        }}
      />
    </section>
  );
}
