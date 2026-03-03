"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trophy, Award, Users, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const t = useTranslations("about");
  const [photoError, setPhotoError] = useState(false);
  const contentRef = useScrollReveal<HTMLDivElement>();

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
      className="bg-light px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading label={t("sectionLabel")} heading={t("heading")} variant="light" />

        <div ref={contentRef} className="reveal-hidden grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Left column: Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative overflow-hidden rounded-2xl border border-warm-accent/20 shadow-lg shadow-black/10">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-warm-accent/10 to-transparent pointer-events-none" />
              {photoError ? (
                <div className="flex h-[600px] w-full max-w-sm items-center justify-center rounded-2xl bg-light-border">
                  <span className="text-6xl font-bold font-display tracking-tight text-warm-accent/60">
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
            <p className="text-lg leading-relaxed text-light-text md:text-xl">
              {t("lead")}
            </p>

            <p className="mt-6 leading-relaxed text-light-text-body">{t("bio1")}</p>
            <p className="mt-4 leading-relaxed text-light-text-body">{t("bio2")}</p>
            <p className="mt-4 leading-relaxed text-light-text-body">{t("bio3")}</p>

            <h3 className="mt-10 font-display text-xl font-semibold text-light-text">
              {t("awardsHeading")}
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {awards.map((award) => {
                const Icon = award.icon;
                return (
                  <div
                    key={award.title}
                    className="rounded-xl border border-light-border bg-light-surface p-5 shadow-sm transition-all hover:border-warm-accent/40 hover:shadow-md"
                  >
                    <Icon className="mb-3 h-6 w-6 text-warm-accent" aria-hidden="true" />
                    <h4 className="text-sm font-semibold text-light-text">
                      {award.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-light-text-body">
                      {award.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-lg border border-light-border bg-light-surface p-4 shadow-sm">
              <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-accent" aria-hidden="true" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-accent-dark">
                  {t("affiliationHeading")}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-light-text-muted">
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
