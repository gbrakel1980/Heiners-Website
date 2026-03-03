"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatCounter } from "@/components/shared/StatCounter";
import { ProjectCard } from "@/components/sections/ProjectCard";

type FilterType = "all" | "offshore" | "onshore";

const PROJECTS = [
  {
    key: "northSeaOffshore" as const,
    category: "offshore" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80",
    imageAlt: "Offshore wind turbines in the North Sea",
  },
  {
    key: "onshoreHV" as const,
    category: "onshore" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    imageAlt: "High voltage transmission pylons at sunset",
  },
  {
    key: "submarineThermal" as const,
    category: "offshore" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    imageAlt: "Submarine cable being laid from a cable-laying vessel",
  },
  {
    key: "magneticShielding" as const,
    category: "onshore" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&q=80",
    imageAlt: "Electrical switchboard with cable connections and circuit breakers",
  },
] as const;

export default function ProjectsSection() {
  const t = useTranslations("projects");
  const tStats = useTranslations("stats");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="bg-surface-card px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      {/* Stats bar */}
      <div className="bg-primary/60 border-y border-accent/10 py-10 mb-16 -mx-4 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatCounter value={110} suffix="+" label={tStats("projectsLabel")} />
          <StatCounter value={40} suffix="+" label={tStats("offshoreLabel")} />
          <StatCounter value={70} suffix="+" label={tStats("onshoreLabel")} />
          <StatCounter value={50} suffix="+" label={tStats("yearsLabel")} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        {/* Filter tabs */}
        <div className="mb-10 flex justify-center">
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as FilterType)}
          >
            <TabsList className="bg-primary/60 border border-accent/10">
              <TabsTrigger value="all">{t("filterAll")}</TabsTrigger>
              <TabsTrigger value="offshore">{t("filterOffshore")}</TabsTrigger>
              <TabsTrigger value="onshore">{t("filterOnshore")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Project cards grid */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-white/50">{t("emptyState")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.key}
                title={t(`items.${project.key}.title`)}
                description={t(`items.${project.key}.description`)}
                tech={t(`items.${project.key}.tech`)}
                techLabel={t("keyTech")}
                category={project.category}
                categoryLabel={t(project.category === "offshore" ? "filterOffshore" : "filterOnshore")}
                imageUrl={project.imageUrl}
                imageAlt={project.imageAlt}
              />
            ))}
          </div>
        )}

        {/* Confidentiality note */}
        <p className="mt-10 text-center text-sm text-white/40 italic">
          {t("confidentialityNote")}
        </p>
      </div>
    </section>
  );
}
