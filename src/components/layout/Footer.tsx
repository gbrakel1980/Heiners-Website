"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, ChevronUp } from "lucide-react";

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "publications", href: "#publications" },
  { key: "contact", href: "#contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const handleNavClick = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-light" role="contentinfo">
      {/* Top gradient transition */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Column 1: Wordmark + Tagline — wider */}
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2 text-xl font-bold tracking-tight font-display">
              <span className="text-warm-accent-dark">BCC</span>
              <span className="text-light-text">Cable Consulting</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-light-text-muted">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Quick Nav Links */}
          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-light-text-muted">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => handleNavClick(item.key)}
                      className="text-sm text-light-text-body transition-colors duration-200 hover:text-warm-accent-dark"
                    >
                      {tNav(item.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-4">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-light-text-muted">
              {t("contact")}
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${t("email")}`}
                className="group flex items-center gap-3 text-sm text-light-text-body transition-colors duration-200 hover:text-warm-accent-dark"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-warm-accent/10 transition-colors group-hover:bg-warm-accent/20">
                  <Mail className="h-3.5 w-3.5 text-warm-accent" />
                </div>
                {t("email")}
              </a>
              <div className="flex items-center gap-3 text-sm text-light-text-body">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-warm-accent/10">
                  <MapPin className="h-3.5 w-3.5 text-warm-accent" />
                </div>
                {t("location")}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-light-border pt-8 sm:flex-row">
          <p className="text-xs text-light-text-muted/70">
            {t("copyright")}
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-light-text-muted transition-colors duration-200 hover:text-warm-accent-dark"
            aria-label="Scroll to top"
          >
            <span className="hidden sm:inline">Back to top</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-light-border transition-all duration-200 group-hover:border-warm-accent/40 group-hover:bg-warm-accent/10">
              <ChevronUp className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
