import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { site } from "@/config/site";
import { getFooterNavItems } from "@/lib/navigation";
import {
  telHref,
  whatsappHref,
  emailHref,
  hasAnyContact,
  activeSocialLinks,
} from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const navItems = getFooterNavItems(locale, dict);
  const tel = telHref();
  const wa = whatsappHref();
  const mail = emailHref();
  const socials = activeSocialLinks();

  return (
    <footer className="bg-ccs-navy-deep text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo locale={locale} label={dict.header.brandHome} tone="light" />
            <p className="mt-4 text-sm text-white/70">{dict.footer.tagline}</p>
            <p className="mt-6 text-xs leading-relaxed text-white/50">
              <span className="block font-semibold uppercase tracking-wide text-white/60">
                {dict.footer.legalNameLabel}
              </span>
              {site.legalName}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label={dict.footer.navTitle}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-3 flex flex-col">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {dict.footer.contactTitle}
            </h2>
            {hasAnyContact() ? (
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/80">
                {tel && (
                  <li>
                    <a href={tel} className="transition-colors hover:text-white">
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                {wa && (
                  <li>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                {mail && (
                  <li>
                    <a href={mail} className="transition-colors hover:text-white">
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {site.contact.address && (
                  <li className="text-white/70">{site.contact.address}</li>
                )}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-white/50">
                {dict.footer.contactPending}
              </p>
            )}

            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="capitalize transition-colors hover:text-white"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {site.name}. {dict.footer.rights}
          </p>

          <div className="flex items-center gap-5">
            <LanguageSwitcher
              locale={locale}
              label={dict.header.languageLabel}
              tone="light"
            />
            <a
              href="#top"
              aria-label={dict.footer.backToTop}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
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
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
