"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/shared/StatCounter";

function parseStatValue(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: "" };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const s = useTranslations("stats");
  const [bgError, setBgError] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { raw: s("projects"), label: s("projectsLabel") },
    { raw: s("offshore"), label: s("offshoreLabel") },
    { raw: s("onshore"), label: s("onshoreLabel") },
    { raw: s("publications"), label: s("publicationsLabel") },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 md:pt-20 bg-primary"
      aria-label="Hero"
    >
      {/* Background image with dark overlay — bg-primary is the CSS fallback */}
      {!bgError && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/nicholas-doherty-UMgb7Z2Yi3E-unsplash.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
            onError={() => setBgError(true)}
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/55 to-primary/80" />
        </div>
      )}
      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Small label */}
        <span className="mb-6 text-2xl font-semibold tracking-normal text-white">
          Prof. Dr.-Ing. em. Heinrich Brakelmann
        </span>

        {/* Main title — company name */}
        <h1 className="font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
          <span className="text-accent">BCC </span>
          <span className="text-white">Cable Consulting</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-lg text-accent/90 md:text-xl">
          {t("subtitle")}
        </p>

        {/* Tagline */}
        <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
          {t("tagline")}
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            onClick={() => scrollTo("contact")}
            className="bg-accent px-8 text-base font-semibold text-primary hover:bg-accent/90 border-0"
          >
            {t("cta")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo("services")}
            className="border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-4xl md:mt-20">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat) => {
            const { num, suffix } = parseStatValue(stat.raw);
            return (
              <div key={stat.label} className="flex justify-center py-4">
                <StatCounter value={num} label={stat.label} suffix={suffix} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/40 transition-colors hover:text-accent"
        aria-label="Scroll down to about section"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
