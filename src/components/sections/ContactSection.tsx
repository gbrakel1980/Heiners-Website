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
      {/* Subtle radial gradient for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        <div ref={contentRef} className="reveal-hidden grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-b from-surface-card/80 to-surface-card/40 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-b from-surface-card/80 to-surface-card/40 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
