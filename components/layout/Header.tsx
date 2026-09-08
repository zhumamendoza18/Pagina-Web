import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";
import { getNavItems, getQuoteHref } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

/** Sticky top bar. Stays accessible while the page scrolls. */
export function Header({ locale, dict }: HeaderProps) {
  const navItems = getNavItems(locale, dict);
  const quoteHref = getQuoteHref(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-ccs-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 xl:h-20">
          <Logo locale={locale} label={dict.header.brandHome} />

          <nav
            aria-label={dict.header.primaryNav}
            className="hidden xl:flex xl:items-center xl:gap-8"
          >
            <DesktopNav locale={locale} items={navItems} />
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <LanguageSwitcher locale={locale} label={dict.header.languageLabel} />
            <Button href={quoteHref} size="md">
              {dict.actions.requestQuote}
            </Button>
          </div>

          <MobileNav
            locale={locale}
            navItems={navItems}
            quoteHref={quoteHref}
            labels={{
              open: dict.header.openMenu,
              close: dict.header.closeMenu,
              menu: dict.header.primaryNav,
              requestQuote: dict.actions.requestQuote,
              languageLabel: dict.header.languageLabel,
              brandHome: dict.header.brandHome,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
