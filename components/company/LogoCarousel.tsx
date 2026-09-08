"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface LogoCarouselItem {
  name: string;
  /** Resolved public path of a LOCAL logo file, or "" for a text fallback. */
  src: string;
  url?: string;
}

interface LogoCarouselProps {
  items: LogoCarouselItem[];
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
}

/**
 * Elegant horizontal carousel for client / brand logos. Native scroll-snap
 * (touch-friendly); prev / next buttons are a pointer enhancement. Ready for
 * when the sections are switched on — logos are always local assets.
 */
export function LogoCarousel({
  items,
  ariaLabel,
  prevLabel,
  nextLabel,
}: LogoCarouselProps) {
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
      aria-label={ariaLabel}
    >
      <div className="mb-5 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          disabled={!canPrev}
          aria-label={prevLabel}
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
          aria-label={nextLabel}
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
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const tile = (
            <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-ccs-line bg-white p-4 sm:h-28 sm:w-48">
              {item.src ? (
                <span className="relative block h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes="192px"
                    className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </span>
              ) : (
                <span className="text-center text-sm font-semibold text-ccs-charcoal">
                  {item.name}
                </span>
              )}
            </div>
          );

          return (
            <li key={item.name} className="shrink-0 snap-start">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan"
                >
                  {tile}
                </a>
              ) : (
                tile
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
