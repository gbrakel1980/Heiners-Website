"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatCounter } from "@/components/shared/StatCounter";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

const PROJECTS = [
  { key: "selfShieldingHV" as const },
  { key: "rinikenSwitzerland" as const },
  { key: "hotSpotDistrictHeating" as const },
] as const;

export default function ProjectsSection() {
  const t = useTranslations("projects");
  const tStats = useTranslations("stats");
  const [hasRevealed, setHasRevealed] = useState(false);
  const gridRef = useStaggerReveal<HTMLDivElement>({ onReveal: () => setHasRevealed(true) });

  return (
    <section
      id="projects"
      className="bg-light px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      {/* Stats bar */}
      <div className="bg-primary/5 border-y border-light-border py-10 mb-16 -mx-4 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatCounter value={110} suffix="+" label={tStats("projectsLabel")} variant="light" />
          <StatCounter value={40} suffix="+" label={tStats("offshoreLabel")} variant="light" />
          <StatCounter value={70} suffix="+" label={tStats("onshoreLabel")} variant="light" />
          <StatCounter value={50} suffix="+" label={tStats("yearsLabel")} variant="light" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
          variant="light"
        />

        {/* Project cards */}
        <div ref={gridRef} className="flex flex-col gap-6">
          {PROJECTS.map((project, i) => (
            <div key={project.key} className={hasRevealed ? "reveal-visible" : "reveal-hidden"}>
              <ProjectCard
                title={t(`items.${project.key}.title`)}
                description={t(`items.${project.key}.description`)}
                tech={t(`items.${project.key}.tech`)}
                techLabel={t("keyTech")}
                index={i}
              />
            </div>
          ))}
        </div>

        {/* Confidentiality note */}
        <p className="mt-10 text-center text-sm text-light-text-muted italic">
          {t("confidentialityNote")}
        </p>
      </div>
    </section>
  );
}
