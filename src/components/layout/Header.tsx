"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "testimonials", href: "#testimonials" },
  { key: "publications", href: "#publications" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-primary/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
      role="banner"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo / Wordmark */}
        <a
          href={`/${locale}`}
          className="flex items-baseline gap-1.5 text-lg font-bold tracking-tight"
          aria-label={t("logoText")}
        >
          <span className="text-accent">BCC</span>
          <span className="text-white">Cable Consulting</span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.key); }}
              className="relative text-sm font-medium text-gray-300 transition-colors hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Desktop Language Switcher */}
        <div className="hidden md:flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => switchLocale("en")}
            className={`text-xs font-semibold px-3 py-1 h-8 rounded-md transition-colors ${
              locale === "en"
                ? "bg-accent/15 text-accent"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            aria-label="Switch to English"
          >
            EN
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => switchLocale("de")}
            className={`text-xs font-semibold px-3 py-1 h-8 rounded-md transition-colors ${
              locale === "de"
                ? "bg-accent/15 text-accent"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            aria-label="Switch to German"
          >
            DE
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-primary border-surface"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav
                className="mt-8 flex flex-col gap-6"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.key); }}
                    className="text-left text-lg font-medium text-gray-300 transition-colors hover:text-accent"
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>

              {/* Mobile Language Switcher */}
              <div className="mt-10 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    switchLocale("en");
                  }}
                  className={`text-sm font-semibold px-4 py-2 h-9 rounded-md transition-colors ${
                    locale === "en"
                      ? "bg-accent/15 text-accent"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  EN
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    switchLocale("de");
                  }}
                  className={`text-sm font-semibold px-4 py-2 h-9 rounded-md transition-colors ${
                    locale === "de"
                      ? "bg-accent/15 text-accent"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  DE
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
