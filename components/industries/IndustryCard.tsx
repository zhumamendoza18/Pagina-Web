import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { IndustryIcon } from "@/components/ui/IndustryIcon";
import type { IndustryTitleKey } from "@/data/industries";

interface IndustryCardProps {
  href: string;
  name: string;
  icon: IndustryTitleKey;
  imageSrc: string;
  imageAlt: string;
  placeholderLabel: string;
  priority?: boolean;
}

/**
 * A market-segment card that is almost entirely photograph. Only an icon, a
 * name and an arrow — no paragraphs. Centered layout, flat scrim and a thin
 * accent line on hover: intentionally different from SolutionCard.
 */
export function IndustryCard({
  href,
  name,
  icon,
  imageSrc,
  imageAlt,
  placeholderLabel,
  priority = false,
}: IndustryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-ccs-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan lg:aspect-auto lg:h-[30rem]"
    >
      <Media
        src={imageSrc}
        alt={imageAlt}
        placeholderLabel={placeholderLabel}
        placeholderTone="dark"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
        fill
        imageClassName="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
      />

      {/* Flat scrim — lifts slightly on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ccs-charcoal/55 transition-colors duration-300 group-hover:bg-ccs-charcoal/35"
      />

      {/* Centered content: icon · name · arrow */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-white">
        <IndustryIcon name={icon} className="h-7 w-7 text-white/85" />
        <span className="text-lg font-semibold tracking-wide sm:text-xl">
          {name}
        </span>
        <span
          aria-hidden="true"
          className="text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0.5 group-hover:opacity-100"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </span>
      </div>

      {/* Thin accent line on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-ccs-cyan transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  );
}
