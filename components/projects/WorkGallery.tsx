"use client";

import { useState } from "react";
import { Media } from "@/components/ui/Media";
import {
  projectFilters,
  type ProjectFilter,
  type GallerySlot,
  projectImageSrc,
} from "@/data/projects";

interface WorkGalleryProps {
  slots: GallerySlot[];
  filterLabels: Record<ProjectFilter, string>;
  /** Localized category names (industrial / commercial / …). */
  categoryLabels: Record<GallerySlot["category"], string>;
  filtersAriaLabel: string;
  placeholderLabel: string;
  comingSoonLabel: string;
  emptyLabel: string;
}

/**
 * Editorial mosaic: tiles of deliberately different sizes, with a category
 * filter. Photos are the priority — each tile shows only the image and, on
 * hover, a short label. While there are no real projects the label is just
 * the category plus a "coming soon" tag (nothing is invented).
 */
const TILE_CLASSES = [
  "col-span-2 aspect-[4/3] sm:col-span-4 sm:row-span-5 sm:aspect-auto lg:col-span-7",
  "col-span-1 aspect-square sm:col-span-2 sm:row-span-3 sm:aspect-auto lg:col-span-5",
  "col-span-1 aspect-square sm:col-span-2 sm:row-span-2 sm:aspect-auto lg:col-span-5",
  "col-span-1 aspect-square sm:col-span-3 sm:row-span-3 sm:aspect-auto lg:col-span-4",
  "col-span-1 aspect-square sm:col-span-3 sm:row-span-3 sm:aspect-auto lg:col-span-4",
  "col-span-2 aspect-[4/3] sm:col-span-6 sm:row-span-3 sm:aspect-auto lg:col-span-4",
];

export function WorkGallery({
  slots,
  filterLabels,
  categoryLabels,
  filtersAriaLabel,
  placeholderLabel,
  comingSoonLabel,
  emptyLabel,
}: WorkGalleryProps) {
  const [active, setActive] = useState<ProjectFilter>("all");

  const visible =
    active === "all"
      ? slots
      : slots.filter((slot) => slot.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label={filtersAriaLabel}
        className="flex flex-wrap gap-2.5"
      >
        {projectFilters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`inline-flex min-h-[40px] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-ccs-navy bg-ccs-navy text-white"
                  : "border-ccs-line text-ccs-charcoal hover:border-ccs-navy"
              }`}
            >
              {filterLabels[filter]}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-ccs-gray">{emptyLabel}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:auto-rows-[70px] sm:gap-4 sm:[grid-auto-flow:dense] lg:grid-cols-12 lg:auto-rows-[72px]">
          {visible.map((slot, index) => (
            <li
              key={slot.id}
              className={`group relative overflow-hidden rounded-lg bg-ccs-light ${
                TILE_CLASSES[index % TILE_CLASSES.length]
              }`}
            >
              <Media
                src={projectImageSrc(slot.image)}
                alt=""
                placeholderLabel={placeholderLabel}
                placeholderTone="light"
                sizes="(min-width: 1024px) 55vw, (min-width: 640px) 60vw, 100vw"
                fill
              />
              <div
                className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 bg-gradient-to-t from-ccs-navy/85 via-ccs-navy/30 to-transparent p-4 text-white opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <span className="text-sm font-semibold">
                  {categoryLabels[slot.category]}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {comingSoonLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
