"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CollaborationCard } from "@/components/sections/CollaborationCard";
import { Badge } from "@/components/ui/badge";
import { useStaggerReveal } from "@/hooks/useScrollReveal";
import {
  Building2,
  Award,
  Users,
  GraduationCap,
  Zap,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const COLLABORATION_KEYS = [
  "ieee",
  "cigre",
  "vdeEtg",
  "uniDue",
  "tsos",
  "windDevelopers",
] as const;

const COLLABORATION_ICONS: Record<string, LucideIcon> = {
  ieee: Award,
  cigre: Users,
  vdeEtg: Zap,
  uniDue: GraduationCap,
  tsos: Building2,
  windDevelopers: BookOpen,
};

const ORGANIZATION_KEYS = ["ieee", "vde", "cigre", "uniDue", "rwth"] as const;

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
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden">
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

          {/* Desktop: 3-column grid with stagger animation */}
          <div ref={gridRef} className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {COLLABORATION_KEYS.map((key) => (
              <div key={key} className="reveal-hidden">
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

        {/* Trusted By / Notable Collaborations badge strip */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-accent/30" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <Building2
                className="h-4 w-4 text-accent/70"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
                {t("trustedByHeading")}
              </span>
            </div>
            <span className="h-px w-8 bg-accent/30" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {ORGANIZATION_KEYS.map((key) => (
              <Badge
                key={key}
                variant="outline"
                className="border-accent/20 bg-surface-card/60 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-accent/40 hover:text-white md:text-sm"
              >
                {t(`organizations.${key}`)}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
