"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trophy, Award, Users, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function AboutSection() {
  const t = useTranslations("about");
  const [photoError, setPhotoError] = useState(false);

  const awards = [
    {
      icon: Trophy,
      title: t("award1Title"),
      desc: t("award1Desc"),
    },
    {
      icon: Award,
      title: t("award2Title"),
      desc: t("award2Desc"),
    },
    {
      icon: Users,
      title: t("award3Title"),
      desc: t("award3Desc"),
    },
  ];

  return (
    <section
      id="about"
      className="bg-surface px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <SectionHeading label={t("sectionLabel")} heading={t("heading")} />

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Left column: Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative overflow-hidden rounded-2xl border border-accent/20 shadow-lg shadow-black/20">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
              {photoError ? (
                /* Fallback: HB initials placeholder */
                <div className="flex h-[600px] w-full max-w-sm items-center justify-center rounded-2xl bg-surface-card">
                  <span className="text-6xl font-bold tracking-tight text-accent/60">
                    HB
                  </span>
                </div>
              ) : (
                <Image
                  src="/images/brakelmann.png"
                  alt="Prof. Dr.-Ing. Heinrich Brakelmann"
                  width={480}
                  height={600}
                  className="relative block h-auto w-full max-w-sm rounded-2xl object-cover"
                  priority
                  onError={() => setPhotoError(true)}
                />
              )}
            </div>
          </div>

          {/* Right column: Bio + Awards */}
          <div className="flex flex-col">
            {/* Lead paragraph */}
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              {t("lead")}
            </p>

            {/* Bio paragraphs */}
            <p className="mt-6 leading-relaxed text-white/70">{t("bio1")}</p>
            <p className="mt-4 leading-relaxed text-white/70">{t("bio2")}</p>
            <p className="mt-4 leading-relaxed text-white/70">{t("bio3")}</p>

            {/* Awards heading */}
            <h3 className="mt-10 text-xl font-semibold text-white">
              {t("awardsHeading")}
            </h3>

            {/* Award cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {awards.map((award) => {
                const Icon = award.icon;
                return (
                  <div
                    key={award.title}
                    className="rounded-xl border border-accent/20 bg-surface-card p-5 transition-colors hover:border-accent/40"
                  >
                    <Icon className="mb-3 h-6 w-6 text-accent" aria-hidden="true" />
                    <h4 className="text-sm font-semibold text-white">
                      {award.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      {award.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Affiliation */}
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent/70" aria-hidden="true" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent/70">
                  {t("affiliationHeading")}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {t("affiliation")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
