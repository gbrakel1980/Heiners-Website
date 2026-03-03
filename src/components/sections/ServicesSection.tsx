"use client";

import { useTranslations } from "next-intl";
import {
  Cable,
  Wind,
  Thermometer,
  Shield,
  Activity,
  LayoutGrid,
  MonitorCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import type { LucideIcon } from "lucide-react";

const SERVICE_KEYS = [
  "hvCables",
  "offshore",
  "thermal",
  "emf",
  "transmission",
  "layout",
  "monitoring",
] as const;

const ICON_MAP: Record<(typeof SERVICE_KEYS)[number], LucideIcon> = {
  hvCables: Cable,
  offshore: Wind,
  thermal: Thermometer,
  emf: Shield,
  transmission: Activity,
  layout: LayoutGrid,
  monitoring: MonitorCheck,
};

export default function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="bg-primary px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading label={t("sectionLabel")} heading={t("heading")} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key) => (
            <ServiceCard
              key={key}
              icon={ICON_MAP[key]}
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
