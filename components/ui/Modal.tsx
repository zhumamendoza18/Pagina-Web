"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the heading rendered inside `children`. */
  labelledBy: string;
  closeLabel: string;
  /**
   * "text" (default): compact reading panel with generous padding.
   * "media": wide, low-padding panel for a full image — same open/close,
   * overlay, Escape, focus-trap and scroll-lock behaviour.
   */
  size?: "text" | "media";
  children: ReactNode;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog: focus is moved in on open and trapped, Escape and the
 * backdrop close it, body scroll is locked, and focus returns to the element
 * that opened it.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  closeLabel,
  size = "text",
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const items = () =>
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
      if (event.key !== "Tab") return;

      const focusables = items();
      if (focusables.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }
      const current = document.activeElement as HTMLElement;
      const index = focusables.indexOf(current);
      if (event.shiftKey && (index <= 0 || current === panel)) {
        event.preventDefault();
        focusables[focusables.length - 1].focus();
      } else if (!event.shiftKey && index === focusables.length - 1) {
        event.preventDefault();
        focusables[0].focus();
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
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const isMedia = size === "media";
  // "media": the image sizes the modal. No fixed height, no overflow-y — the
  // <img> is capped by max-width AND max-height at once so the browser scales
  // it down until it fits the viewport whole, with nothing to scroll.
  const overlayClass = isMedia
    ? "fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5"
    : "fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6";
  const panelClass = isMedia
    ? "relative z-10 w-fit max-w-[calc(100vw-24px)] max-h-[calc(100dvh-24px)] rounded-lg bg-white p-0 shadow-xl focus:outline-none sm:max-w-[calc(100vw-40px)] sm:max-h-[calc(100dvh-40px)]"
    : "relative z-10 max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl focus:outline-none sm:rounded-2xl sm:p-8";
  const closeClass = isMedia
    ? "absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ccs-navy shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
    : "absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ccs-navy hover:bg-ccs-light";

  return createPortal(
    <div className={overlayClass}>
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ccs-charcoal/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={panelClass}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className={closeClass}
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
        {children}
      </div>
    </div>,
    document.body,
  );
}
