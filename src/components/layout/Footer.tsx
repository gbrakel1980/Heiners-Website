"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  return (
    <footer className="bg-surface" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Wordmark + Tagline */}
          <div>
            <div className="flex items-baseline gap-1.5 text-lg font-bold tracking-tight">
              <span className="text-accent">BCC</span>
              <span className="text-white">Cable Consulting</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Quick Nav Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => handleNavClick(item.key)}
                      className="text-sm text-gray-300 transition-colors hover:text-accent"
                    >
                      {tNav(item.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t("contact")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${t("email")}`}
                className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {t("email")}
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                {t("location")}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom Bar */}
        <p className="text-center text-xs text-gray-500">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
