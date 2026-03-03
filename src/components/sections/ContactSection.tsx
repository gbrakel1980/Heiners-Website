"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="bg-primary px-4 py-20 md:py-28"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={t("sectionLabel")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact Form - takes 3/5 of the grid on desktop */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-white/10 bg-surface-card/50 p-6 md:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info - takes 2/5 of the grid on desktop */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-surface-card/50 p-6 md:p-8 lg:sticky lg:top-24">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
