"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Smartphone, MapPin, Building2 } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {t("infoHeading")}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {t("infoSubheading")}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <a
          href="mailto:gerrit.brakelmann@gmail.com"
          className="group flex items-start gap-3 text-white/80 hover:text-accent transition-colors"
          aria-label={t("emailLabel")}
        >
          <Mail className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
          <span className="text-sm">gerrit.brakelmann@gmail.com</span>
        </a>

        <a
          href="tel:+4928436391"
          className="group flex items-start gap-3 text-white/80 hover:text-accent transition-colors"
          aria-label={t("phoneLabel")}
        >
          <Phone className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
          <span className="text-sm">+49 2843 6391</span>
        </a>

        <a
          href="tel:+491743224725"
          className="group flex items-start gap-3 text-white/80 hover:text-accent transition-colors"
          aria-label={t("mobileLabel")}
        >
          <Smartphone className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
          <span className="text-sm">+49 174 3224725</span>
        </a>

        <div className="flex items-start gap-3 text-white/80">
          <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
          <div className="text-sm leading-relaxed">
            <p>Schwalbenweg 8</p>
            <p>D-47495 Rheinberg, Germany</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-white/80">
          <Building2 className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-white/90">
              {t("universityLabel")}
            </p>
            <p>Universität Duisburg-Essen</p>
            <p>IW/ETS, Bismarckstr. 81</p>
            <p>D-47048 Duisburg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
