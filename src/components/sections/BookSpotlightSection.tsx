"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BOOK_URL =
  "https://buchshop.bod.de/erdkabel-fuer-den-netzausbau-heinrich-brakelmann-9783748121039";

export default function BookSpotlightSection() {
  const t = useTranslations("book");

  return (
    <section
      id="book"
      className="relative overflow-hidden bg-primary py-24 md:py-32"
      aria-label={t("sectionLabel")}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, transparent, #D4A845 30%, #D4A845 70%, transparent)",
        }}
      />

      {/* Fine engineering grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#D4A845 1px, transparent 1px), linear-gradient(90deg, #D4A845 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Atmospheric glow — centered on book side */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-2/3"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 25% 50%, rgba(212,168,69,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-[1px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,168,69,0.35) 40%, rgba(212,168,69,0.35) 60%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">

          {/* ── Book cover with 3-D tilt ── */}
          <div className="group flex-shrink-0 lg:w-64 xl:w-72" style={{ perspective: "900px" }}>
            {/* Layered glow shadows */}
            <div className="relative mx-auto w-52 lg:w-full">
              <div
                className="pointer-events-none absolute -inset-6 rounded-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, rgba(212,168,69,0.22) 0%, transparent 70%)",
                  filter: "blur(16px)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 translate-y-4 scale-90 rounded-md opacity-50 transition-all duration-500 group-hover:translate-y-6 group-hover:opacity-70"
                aria-hidden="true"
                style={{
                  background: "rgba(212,168,69,0.25)",
                  filter: "blur(20px)",
                }}
              />

              {/* The book image with perspective tilt */}
              <div
                className="relative overflow-hidden rounded-md border border-warm-accent/25 shadow-2xl transition-transform duration-700 ease-out group-hover:[transform:rotateY(0deg)_rotateX(0deg)]"
                style={{
                  transform: "rotateY(-10deg) rotateX(3deg)",
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,69,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <Image
                  src="/Erdkabel_für_den_Netzausbau.avif"
                  alt="Erdkabel für den Netzausbau — Buchcover"
                  width={400}
                  height={566}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-1 flex-col text-center lg:text-left">

            {/* Badge */}
            <div className="mb-5 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-warm-accent/40 bg-warm-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-accent">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h2
              className="mb-2 font-display font-bold leading-[1.05] text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {t("title")}
            </h2>

            {/* Subtitle & authors */}
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-warm-accent/70">
              {t("subtitle")}
            </p>
            <p className="mb-7 text-sm text-white/50">
              {t("author1")}
              <span className="mx-2 text-warm-accent/30">·</span>
              {t("author2")}
            </p>
            {/* Gold divider */}
            <div
              className="mb-6 h-px mx-auto lg:mx-0 w-12"
              style={{ background: "linear-gradient(to right, #D4A845, transparent)" }}
            />

            {/* Description */}
            <p className="mb-6 max-w-lg text-sm leading-[1.75] text-white/65 mx-auto lg:mx-0">
              {t("description")}
            </p>

            {/* Publisher */}
            <p className="mb-8 text-[11px] font-medium uppercase tracking-wider text-white/30">
              {t("publisher")}
            </p>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="group/btn bg-warm-accent font-semibold text-primary shadow-lg shadow-warm-accent/25 transition-all hover:bg-warm-accent-dark hover:shadow-warm-accent/40"
              >
                <a href={BOOK_URL} target="_blank" rel="noopener noreferrer">
                  {t("cta")}
                  <ExternalLink
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
