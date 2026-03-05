"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const t = useTranslations("contact");
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-primary px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        {/* Unified container */}
        <div
          ref={contentRef}
          className="reveal-hidden relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-surface-card/70 via-surface-card/50 to-surface-card/30 shadow-2xl shadow-black/30 backdrop-blur-sm"
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="relative flex flex-col lg:flex-row">
            {/* Contact Form — left side (60%) */}
            <div className="p-6 md:p-10 lg:w-3/5">
              <ContactForm />
            </div>

            {/* Horizontal divider (mobile) */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent lg:hidden" />

            {/* Vertical divider (desktop) */}
            <div className="hidden lg:block absolute top-10 bottom-10 left-[60%] w-px bg-gradient-to-b from-white/[0.03] via-white/[0.10] to-white/[0.03]" aria-hidden="true" />

            {/* Contact Info — right side (40%) */}
            <div className="relative p-6 md:p-10 lg:w-2/5 flex items-center">
              {/* Subtle glow behind contact info */}
              <div
                className="pointer-events-none absolute inset-0 rounded-r-2xl bg-gradient-to-br from-accent/[0.02] to-transparent"
                aria-hidden="true"
              />
              <div className="relative">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
