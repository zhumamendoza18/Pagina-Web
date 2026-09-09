"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";

export interface CarouselItem {
  /** Stable, language-independent unique id (used as the React key). */
  id: string;
  href: string;
  name: string;
  imageSrc: string;
}

interface ApplicationsCarouselProps {
  items: CarouselItem[];
  labels: {
    prev: string;
    next: string;
    carouselLabel: string;
    imagePlaceholder: string;
  };
}

/**
 * Touch-first horizontal carousel (native scroll-snap). Prev / next buttons
 * are an enhancement for pointer users; on mobile people simply swipe.
 */
export function ApplicationsCarousel({ items, labels }: ApplicationsCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carouselLabel}
    >
      <div className="mb-5 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          disabled={!canPrev}
          aria-label={labels.prev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ccs-line text-ccs-navy transition-colors hover:border-ccs-navy disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          disabled={!canNext}
          aria-label={labels.next}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ccs-line text-ccs-navy transition-colors hover:border-ccs-navy disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <ul
        ref={scrollerRef}
        onScroll={updateEdges}
        tabIndex={0}
        aria-label={labels.carouselLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="shrink-0 basis-[80%] snap-start sm:basis-[46%] lg:basis-[31%] xl:basis-[24%]"
          >
            <Link
              href={item.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-ccs-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan"
            >
              <Media
                src={item.imageSrc}
                alt={item.name}
                placeholderLabel={labels.imagePlaceholder}
                placeholderTone="dark"
                sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 80vw"
                fill
                imageClassName="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ccs-navy/90 via-ccs-navy/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <h3 className="text-base font-semibold leading-tight text-white sm:text-lg">
                  {item.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="mb-0.5 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
