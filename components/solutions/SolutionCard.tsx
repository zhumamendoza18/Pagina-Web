import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { SolutionIcon, type SolutionIconName } from "@/components/ui/SolutionIcon";

interface SolutionCardProps {
  href: string;
  title: string;
  icon: SolutionIconName;
  imageSrc: string;
  imageAlt: string;
  placeholderLabel: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Large photographic card for a solution family. Photo + title + discreet
 * icon + arrow, with an elegant hover. No visible paragraph text.
 */
export function SolutionCard({
  href,
  title,
  icon,
  imageSrc,
  imageAlt,
  placeholderLabel,
  priority = false,
  sizes = "(min-width: 640px) 50vw, 100vw",
}: SolutionCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-ccs-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan"
    >
      <Media
        src={imageSrc}
        alt={imageAlt}
        placeholderLabel={placeholderLabel}
        placeholderTone="dark"
        sizes={sizes}
        priority={priority}
        fill
        imageClassName="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]"
      />

      {/* Legibility overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ccs-navy/90 via-ccs-navy/25 to-ccs-navy/10 transition-colors duration-300 group-hover:from-ccs-navy/95"
      />

      {/* Discreet icon */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm"
      >
        <SolutionIcon name={icon} className="h-5 w-5" />
      </span>

      {/* Title + arrow */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="mb-1 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
