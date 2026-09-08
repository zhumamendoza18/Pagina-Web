import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";

interface MediaProps {
  /**
   * Public path of the image (e.g. "/images/ccs/hero/floor.webp").
   * Empty / undefined => a neutral placeholder is shown instead.
   */
  src?: string;
  /** Real alt text for the photo. Only used when `src` is set. */
  alt: string;
  /** Caption for the placeholder state. */
  placeholderLabel?: string;
  placeholderTone?: "light" | "dark";
  /** CSS aspect-ratio for the wrapper, e.g. "16 / 9". Ignored when `fill`. */
  aspectRatio?: string;
  /**
   * When true the wrapper is `absolute inset-0` and the image/placeholder
   * fills the nearest positioned ancestor (used for full-bleed backgrounds).
   */
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  /** object-position for the photo, e.g. "center", "50% 30%". */
  position?: string;
  className?: string;
  imageClassName?: string;
}

/**
 * Single entry point for photography on the site. Renders a `next/image`
 * when a real asset exists, otherwise a proportion-preserving placeholder.
 */
export function Media({
  src,
  alt,
  placeholderLabel,
  placeholderTone = "light",
  aspectRatio,
  fill = false,
  priority = false,
  sizes = "100vw",
  position = "center",
  className = "",
  imageClassName = "",
}: MediaProps) {
  const hasImage = Boolean(src && src.trim().length > 0);

  const wrapperClasses = [
    "relative overflow-hidden",
    fill ? "absolute inset-0 h-full w-full" : "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      style={!fill && aspectRatio ? { aspectRatio } : undefined}
    >
      {hasImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imageClassName}`.trim()}
          style={{ objectPosition: position }}
        />
      ) : (
        <Placeholder
          label={placeholderLabel}
          tone={placeholderTone}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
