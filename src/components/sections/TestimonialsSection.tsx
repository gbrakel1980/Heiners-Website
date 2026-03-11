"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CollaborationCard } from "@/components/sections/CollaborationCard";
import { useStaggerReveal } from "@/hooks/useScrollReveal";
import {
  Award,
  Users,
  GraduationCap,
  Zap,
  Wind,
  Landmark,
  Building2,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const COLLABORATION_KEYS = [
  "ieee",
  "cigre",
  "bmwi",
  "vdeEtg",
  "uniDue",
  "tsos",
  "windDevelopers",
] as const;

const COLLABORATION_ICONS: Record<string, LucideIcon> = {
  ieee: Award,
  cigre: Users,
  bmwi: Landmark,
  vdeEtg: Zap,
  uniDue: GraduationCap,
  tsos: Building2,
  windDevelopers: Wind,
};

const LOGO_ITEMS = [
  { key: "ieee", src: "/images/logos/ieee-pes.png", alt: "IEEE Power & Energy Society", imgClass: "h-14 md:h-16 max-w-none" },
  { key: "vde", src: "/images/logos/vde etg.png", alt: "VDE / ETG", imgClass: "h-10 md:h-14 max-w-none" },
  { key: "cigre", src: "/images/logos/cigre.png", alt: "CIGRE", imgClass: "h-14 md:h-16 max-w-none" },
  { key: "uniDue", src: "/images/logos/Uni-duisburg-essen-logo-2022.jpg", alt: "Universität Duisburg-Essen", imgClass: "h-10 md:h-14 max-w-none" },
  { key: "bmwi", src: "/images/logos/Bundesministerium_für_Wirtschaft_und_Energie_Logo.svg.png", alt: "BMWi — Bundesministerium für Wirtschaft und Energie", imgClass: "h-14 md:h-16 max-w-none" },
] as const;

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <section
      id="testimonials"
      className="bg-surface px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        {/* Collaboration cards -- horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Mobile: horizontal scroll with fade indicator */}
          <div className="relative md:hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {COLLABORATION_KEYS.map((key) => (
                <div
                  key={key}
                  className="min-w-[280px] max-w-[320px] flex-shrink-0 snap-center"
                >
                  <CollaborationCard
                    organization={t(`items.${key}.organization`)}
                    description={t(`items.${key}.description`)}
                    type={t(`items.${key}.type`)}
                    icon={COLLABORATION_ICONS[key]}
                  />
                </div>
              ))}
            </div>
            {/* Right fade gradient to indicate more content */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-4 w-16"
              style={{ background: "linear-gradient(to right, transparent, #1e3a5f)" }}
              aria-hidden="true"
            />
            <p className="mt-2 text-center text-xs text-white/40">{t("scrollHint")}</p>
          </div>

          {/* Desktop: flex layout with centered rows (4 top, 3 bottom centered) */}
          <div ref={gridRef} className="hidden md:flex md:flex-wrap md:justify-center md:gap-6">
            {COLLABORATION_KEYS.map((key) => (
              <div key={key} className="reveal-hidden md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <CollaborationCard
                  organization={t(`items.${key}.organization`)}
                  description={t(`items.${key}.description`)}
                  type={t(`items.${key}.type`)}
                  icon={COLLABORATION_ICONS[key]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By — logo strip */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-white/50" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t("trustedByHeading")}
            </span>
            <span className="h-px w-8 bg-white/50" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {LOGO_ITEMS.map((item) => (
              <div
                key={item.key}
                className="flex h-16 items-center justify-center rounded-xl bg-white px-5 shadow-sm transition-shadow duration-300 hover:shadow-md md:h-20 md:px-6"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={300}
                  height={120}
                  className={`w-auto object-contain ${item.imgClass}`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
