"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Smartphone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function ContactItem({
  icon: Icon,
  children,
  href,
  label,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  href?: string;
  label?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg p-3 -mx-3 transition-all duration-200 hover:bg-white/[0.04]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-200 group-hover:bg-accent/20">
        <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group text-white/80 transition-colors hover:text-white"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return <div className="group text-white/80">{content}</div>;
}

export function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-white mb-2">
          {t("infoHeading")}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed">
          {t("infoSubheading")}
        </p>
      </div>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-accent/20 via-white/10 to-transparent" />

      <div className="flex flex-col gap-1">
        <ContactItem
          icon={Mail}
          href="mailto:gerrit.brakelmann@gmail.com"
          label={t("emailLabel")}
        >
          gerrit.brakelmann@gmail.com
        </ContactItem>

        <ContactItem
          icon={Phone}
          href="tel:+4928436391"
          label={t("phoneLabel")}
        >
          +49 2843 6391
        </ContactItem>

        <ContactItem
          icon={Smartphone}
          href="tel:+491743224725"
          label={t("mobileLabel")}
        >
          +49 174 3224725
        </ContactItem>

        <ContactItem icon={MapPin}>
          <p>Schwalbenweg 8</p>
          <p className="text-white/50">D-47495 Rheinberg, Germany</p>
        </ContactItem>

      </div>
    </div>
  );
}
