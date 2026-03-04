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
  const awardsRef = useScrollReveal<HTMLDivElement>();

  const awards = [
    { icon: Trophy, title: t("award1Title"), desc: t("award1Desc") },
    { icon: Award, title: t("award2Title"), desc: t("award2Desc") },
    { icon: Users, title: t("award3Title"), desc: t("award3Desc") },
  ];

  const specializations = [
    t("credentialSpec1"),
    t("credentialSpec2"),
    t("credentialSpec3"),
  ];

  return (
    <section
      id="about"
      className="bg-light px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading label={t("sectionLabel")} heading={t("heading")} variant="light" />

        <div ref={contentRef} className="reveal-hidden">
          {/* Photo + Stats — editorial grid */}
          <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            {/* Photo with gold L-frame accent */}
            <div className="relative pl-3 pb-3 lg:pl-4 lg:pb-4">
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-2/3 w-2/3 rounded-bl-2xl border-b-[3px] border-l-[3px] border-warm-accent/50"
                aria-hidden="true"
              />
              {photoError ? (
                <div className="flex aspect-[605/426] w-full items-center justify-center rounded-xl bg-light-border shadow-2xl">
                  <span className="font-display text-6xl font-bold tracking-tight text-warm-accent/60">
                    HB
                  </span>
                </div>
              ) : (
                <Image
                  src="/images/brakelmann.png"
                  alt="Prof. Dr.-Ing. Heinrich Brakelmann"
                  width={605}
                  height={426}
                  className="relative block h-auto w-full rounded-xl shadow-2xl"
                  priority
                  onError={() => setPhotoError(true)}
                />
              )}
            </div>

            {/* Credential profile sidebar */}
            <div className="flex flex-col gap-5 lg:gap-7">
              {/* Academic title */}
              <div className="border-l-2 border-warm-accent pl-4 lg:pl-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-warm-accent lg:text-xs">
                  {t("credentialTitle")}
                </span>
                <p className="mt-1.5 font-display text-base font-bold leading-snug text-light-text lg:text-lg">
                  {t("credentialInstitution")}
                </p>
                <p className="mt-0.5 text-xs text-light-text-muted lg:text-sm">
                  {t("credentialDepartment")}
                </p>
              </div>

              {/* Key recognition */}
              <div className="border-l-2 border-warm-accent/50 pl-4 lg:pl-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-light-text-muted lg:text-xs">
                  {t("credentialRecognitionLabel")}
                </span>
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium text-light-text lg:text-sm">
                    <Trophy className="mr-1.5 inline h-3.5 w-3.5 text-warm-accent" aria-hidden="true" />
                    {t("credentialRecognition1")}
                  </p>
                  <p className="text-xs font-medium text-light-text lg:text-sm">
                    <Award className="mr-1.5 inline h-3.5 w-3.5 text-warm-accent" aria-hidden="true" />
                    {t("credentialRecognition2")}
                  </p>
                </div>
              </div>

              {/* Specializations */}
              <div className="border-l-2 border-warm-accent/30 pl-4 lg:pl-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-light-text-muted lg:text-xs">
                  {t("credentialSpecLabel")}
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {specializations.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full border border-warm-accent/20 bg-warm-accent/5 px-2.5 py-0.5 text-[10px] font-medium text-light-text-body lg:text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lead text — editorial pull-quote */}
          <div className="mt-14 border-l-4 border-warm-accent pl-6 md:mt-16 md:pl-8">
            <p className="font-display text-lg leading-relaxed text-light-text text-justify hyphens-auto md:text-xl lg:text-2xl">
              {t("lead")}
            </p>
          </div>

          {/* Bio — editorial columns, justified with auto-hyphenation */}
          <div className="mt-10 text-justify hyphens-auto text-base leading-relaxed text-light-text-body lg:mt-12 lg:columns-2 lg:gap-12">
            <p>{t("bio1")}</p>
            <p className="mt-4">{t("bio2")}</p>
            <p className="mt-4">{t("bio3")}</p>
          </div>
        </div>

        {/* Awards — dark prestige band */}
        <div
          ref={awardsRef}
          className="reveal-hidden mt-14 overflow-hidden rounded-2xl bg-primary p-6 md:mt-16 md:p-10 lg:p-12"
        >
          <h3 className="mb-8 border-b border-white/10 pb-4 font-display text-base font-semibold uppercase tracking-wider text-warm-accent">
            {t("awardsHeading")}
          </h3>

          <div className="grid gap-8 sm:grid-cols-3">
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <div key={award.title}>
                  <Icon
                    className="mb-3 h-6 w-6 text-warm-accent"
                    aria-hidden="true"
                  />
                  <h4 className="text-base font-semibold text-white">
                    {award.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {award.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Academic affiliation — integrated footer */}
          <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
            <GraduationCap
              className="h-5 w-5 flex-shrink-0 text-warm-accent"
              aria-hidden="true"
            />
            <p className="text-sm text-white/50">
              <span className="font-semibold text-white/70">
                {t("affiliationHeading")}:
              </span>{" "}
              {t("affiliation")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
