"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  locale: Locale;
  navItems: NavItem[];
  quoteHref: string;
  labels: {
    open: string;
    close: string;
    menu: string;
    requestQuote: string;
    languageLabel: string;
    brandHome: string;
  };
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

/**
 * Right-side drawer for tablet / phone widths (below the `xl` breakpoint, where
 * the horizontal nav no longer fits).
 *
 * The overlay is rendered through a portal into `document.body`: the sticky
 * <header> uses `backdrop-filter`, which makes it the containing block for any
 * `position: fixed` descendant — so a drawer rendered inside the header would be
 * clipped to the 64px header box instead of the viewport. Portalling escapes it.
 */
export function MobileNav({ locale, navItems, quoteHref, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  // The portal target only exists on the client. Defer with rAF so the first
  // client render still matches the server output (drawer absent, menu closed).
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // If the viewport grows past the desktop breakpoint while the drawer is open,
  // close it — otherwise the body scroll lock would never be released.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // While open: focus moves to the close button and is trapped inside the panel,
  // Escape closes, the body scroll is locked, and focus returns to the toggle.
  useEffect(() => {
    if (!open) return;

    const toggle = toggleRef.current;
    const panel = panelRef.current;
    closeRef.current?.focus();

    const focusables = () =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetParent !== null,
          )
        : [];

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
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
      const index = items.indexOf(current);
      if (event.shiftKey && (index <= 0 || current === panel)) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && index === items.length - 1) {
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
      toggle?.focus();
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? labels.close : labels.open}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ccs-navy hover:bg-ccs-light"
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 motion-reduce:transition-none ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 motion-reduce:transition-none ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 motion-reduce:transition-none ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            inert={!open}
            className={`fixed inset-0 z-[60] xl:hidden ${
              open ? "" : "pointer-events-none"
            }`}
          >
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={close}
              className={`absolute inset-0 h-full w-full cursor-default bg-ccs-charcoal/50 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                open ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              id="mobile-nav-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={labels.menu}
              tabIndex={-1}
              className={`absolute right-0 top-0 flex h-dvh w-[88%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ease-out will-change-transform focus:outline-none motion-reduce:transition-none ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-ccs-line px-6 py-4">
                <Logo locale={locale} label={labels.brandHome} />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={labels.close}
                  className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-ccs-navy hover:bg-ccs-light"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav
                aria-label={labels.menu}
                className="flex-1 overflow-y-auto px-6 py-6"
              >
                <ul className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== `/${locale}` &&
                        pathname.startsWith(`${item.href}/`));
                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={isActive ? "page" : undefined}
                          className={`block rounded-md px-3 py-3 text-base font-semibold ${
                            isActive
                              ? "bg-ccs-light text-ccs-navy"
                              : "text-ccs-charcoal hover:bg-ccs-light"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex flex-col gap-4 border-t border-ccs-line px-6 py-6">
                <LanguageSwitcher
                  locale={locale}
                  label={labels.languageLabel}
                  onNavigate={close}
                />
                <Button
                  href={quoteHref}
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  {labels.requestQuote}
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
