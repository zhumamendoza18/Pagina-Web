"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Placeholder } from "@/components/ui/Placeholder";

export interface LightboxImage {
  /** Public path, or "" to show a placeholder slide. */
  src: string;
  alt: string;
}

interface LightboxProps {
  open: boolean;
  images: LightboxImage[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
  labels: {
    label: string;
    close: string;
    prev: string;
    next: string;
    placeholder: string;
  };
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

/**
 * Accessible photo album. Portal + focus trap + scroll-lock like <Modal>, plus
 * previous / next (arrows and ←/→), a discreet "n / total" counter, optional
 * thumbnails and basic touch swipe. The large image uses object-contain so a
 * photo is never cropped.
 */
export function Lightbox({
  open,
  images,
  index,
  onIndexChange,
  onClose,
  labels,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const clamped = Math.min(Math.max(index, 0), Math.max(total - 1, 0));

  const go = useCallback(
    (delta: number) => {
      if (total === 0) return;
      onIndexChange(Math.min(Math.max(clamped + delta, 0), total - 1));
    },
    [clamped, total, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const focusables = () =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetParent !== null,
          )
        : [];

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }
      const current = document.activeElement as HTMLElement;
      const i = items.indexOf(current);
      if (event.shiftKey && (i <= 0 || current === panel)) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && i === items.length - 1) {
        event.preventDefault();
        items[0].focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose, go]);

  if (!open || total === 0 || typeof document === "undefined") return null;

  const current = images[clamped];

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={labels.label}
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ccs-navy-deep/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 flex max-h-[calc(100dvh-24px)] w-full max-w-[1200px] flex-col items-center gap-3 focus:outline-none sm:max-h-[calc(100dvh-40px)]"
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-0 top-0 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ccs-navy shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
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
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center gap-2 sm:gap-4">
          {total > 1 && (
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={clamped === 0}
              aria-label={labels.prev}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-ccs-navy shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {current.src ? (
              // eslint-disable-next-line @next/next/no-img-element -- object-contain with max-w AND max-h at once so the photo is never cropped
              <img
                src={current.src}
                alt={current.alt}
                className="block max-h-[calc(100dvh-140px)] w-auto max-w-full rounded-lg object-contain"
              />
            ) : (
              <Placeholder
                label={labels.placeholder}
                tone="dark"
                className="aspect-[4/3] w-full max-w-[900px] rounded-lg"
              />
            )}
          </div>

          {total > 1 && (
            <button
              type="button"
              onClick={() => go(1)}
              disabled={clamped === total - 1}
              aria-label={labels.next}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-ccs-navy shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>

        {total > 1 && (
          <p
            aria-live="polite"
            className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tabular-nums text-ccs-navy"
          >
            {clamped + 1} / {total}
          </p>
        )}

        {total > 1 && (
          <ul className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((img, i) => (
              <li key={i} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`${i + 1} / ${total}`}
                  aria-current={i === clamped ? "true" : undefined}
                  className={`block h-14 w-20 overflow-hidden rounded border-2 transition-colors ${
                    i === clamped
                      ? "border-ccs-cyan"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element -- tiny local thumbnail
                    <img
                      src={img.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="block h-full w-full bg-ccs-charcoal" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  );
}
