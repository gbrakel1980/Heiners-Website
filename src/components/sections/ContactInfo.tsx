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
    <div className="group/item flex items-center gap-4 rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/[0.04]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/[0.08] ring-1 ring-accent/[0.12] transition-all duration-300 group-hover/item:bg-accent/[0.14] group-hover/item:ring-accent/[0.2]">
        <Icon className="h-[18px] w-[18px] text-accent/80" aria-hidden="true" />
      </div>
      <div className="min-w-0 text-sm leading-relaxed break-all">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="text-white/70 transition-colors duration-300 hover:text-white"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return <div className="text-white/70">{content}</div>;
}

export function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8">
        <h3 className="font-display text-xl font-semibold text-white mb-3">
          {t("infoHeading")}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed">
          {t("infoSubheading")}
        </p>
      </div>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-accent/15 via-white/[0.06] to-transparent mb-6" />

      <div className="flex flex-col gap-2">
        <ContactItem
          icon={Mail}
          href="mailto:brakelmann.heinrich@gmail.com"
          label={t("emailLabel")}
        >
          brakelmann.heinrich@gmail.com
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
          <p className="text-white/40">D-47495 Rheinberg, Germany</p>
        </ContactItem>
      </div>

      {/* Spacer to vertically center content on desktop */}
      <div className="hidden lg:block mt-auto" aria-hidden="true" />
    </div>
  );
}
