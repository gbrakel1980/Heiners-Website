"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Award,
  ExternalLink,
  Download,
  BookOpen,
  FileText,
} from "lucide-react";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

const PUBLICATION_KEYS = [
  "p234",
  "p251",
  "p248",
  "p253",
  "p244",
  "p235",
  "p32",
  "p27",
] as const;

const AWARD_KEYS = ["ieee", "etg"] as const;

const AWARD_ICONS: Record<(typeof AWARD_KEYS)[number], typeof Trophy> = {
  ieee: Trophy,
  etg: Award,
};

export default function PublicationsSection() {
  const t = useTranslations("publications");
  const listRef = useStaggerReveal<HTMLOListElement>();

  return (
    <section
      id="publications"
      className="bg-light px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
          variant="light"
        />

        {/* Awards section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-warm-accent/30" aria-hidden="true" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-accent-dark">
              {t("awardsHeading")}
            </h3>
            <span className="h-px w-8 bg-warm-accent/30" aria-hidden="true" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {AWARD_KEYS.map((key) => {
              const Icon = AWARD_ICONS[key];
              return (
                <div
                  key={key}
                  className="group rounded-xl border border-light-border bg-light-surface p-6 shadow-sm transition-all hover:border-warm-accent/40 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-warm-accent/10">
                      <Icon
                        className="h-5 w-5 text-warm-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-light-text md:text-base">
                        {t(`awards.${key}.title`)}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-light-text-body md:text-sm">
                        {t(`awards.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Publication stat */}
        <div className="mb-10 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-full border border-warm-accent/30 bg-warm-accent/10 px-6 py-3">
            <BookOpen
              className="h-5 w-5 text-warm-accent"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-light-text md:text-base">
              {t("statLine")}
            </span>
          </div>
        </div>

        {/* Curated publication highlights */}
        <div className="mb-12">
          <h3 className="mb-6 text-center font-display text-lg font-semibold text-light-text md:text-xl">
            {t("highlightsHeading")}
          </h3>

          <ol ref={listRef} className="space-y-4" aria-label={t("highlightsHeading")}>
            {PUBLICATION_KEYS.map((key) => {
              const url = t(`items.${key}.url`);
              const badge = t(`items.${key}.badge`);
              const translationKey = `items.${key}.titleTranslation` as const;
              const hasTranslation =
                t.has(translationKey) &&
                t(translationKey).length > 0;

              return (
                <li
                  key={key}
                  className="reveal-hidden group rounded-lg border border-light-border bg-light-surface p-4 shadow-sm transition-all hover:border-warm-accent/30 hover:shadow-md md:p-5"
                >
                  <div className="flex items-start gap-3">
                    {/* Publication number */}
                    <span className="mt-0.5 flex-shrink-0 rounded bg-warm-accent/10 px-2 py-0.5 text-xs font-bold text-warm-accent-dark">
                      {t(`items.${key}.number`)}
                    </span>

                    <div className="min-w-0 flex-1">
                      {/* Title row */}
                      <div className="flex flex-wrap items-start gap-2">
                        <h4 className="text-sm font-medium leading-snug text-light-text md:text-base">
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-warm-accent-dark"
                            >
                              {t(`items.${key}.title`)}
                              <ExternalLink
                                className="ml-1.5 inline-block h-3.5 w-3.5 text-light-text-muted transition-colors group-hover:text-warm-accent"
                                aria-hidden="true"
                              />
                            </a>
                          ) : (
                            t(`items.${key}.title`)
                          )}
                        </h4>
                      </div>

                      {/* Translation for German titles shown in EN locale */}
                      {hasTranslation && (
                        <p className="mt-0.5 text-xs italic text-light-text-muted">
                          {t(`items.${key}.titleTranslation`)}
                        </p>
                      )}

                      {/* Journal and year */}
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-light-text-muted md:text-sm">
                        <FileText
                          className="inline-block h-3.5 w-3.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{t(`items.${key}.journal`)}</span>
                      </p>

                      {/* Prize badge */}
                      {badge && (
                        <Badge className="mt-2 border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">
                          <Trophy
                            className="mr-1 h-3 w-3"
                            aria-hidden="true"
                          />
                          {badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="w-full bg-warm-accent text-white font-semibold hover:bg-warm-accent-dark sm:w-auto whitespace-normal h-auto py-3 text-center"
            size="lg"
          >
            <a
              href="/List%20of%20publications.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("downloadPdf")}
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-warm-accent/30 text-warm-accent-dark hover:border-warm-accent/60 hover:bg-warm-accent/10 sm:w-auto"
            size="lg"
          >
            <a
              href={t("ieeeUrl")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("viewOnIeee")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
