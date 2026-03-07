import { useTranslations } from "next-intl";

export default function ImpressumPage() {
  const t = useTranslations("impressum");

  return (
    <main className="min-h-screen bg-light pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <h1 className="font-display text-3xl font-bold text-light-text md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-light-text-muted">
          {t("subtitle")}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-light-text-body">
          {/* Contact details */}
          <section>
            <h2 className="font-display text-lg font-semibold text-light-text">
              {t("contactHeading")}
            </h2>
            <div className="mt-3 space-y-1">
              <p>Prof. Dr.-Ing. em. Heinrich Brakelmann</p>
              <p>Schwalbenweg 8</p>
              <p>47495 Rheinberg</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-light-text">
              {t("representedBy")}
            </h2>
            <p className="mt-3">Prof. Dr.-Ing. em. Heinrich Brakelmann</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-light-text">
              {t("contactLabel")}
            </h2>
            <div className="mt-3 space-y-1">
              <p>{t("phone")}: +49-2843-6391</p>
              <p>{t("emailLabel")}: brakelmann.heinrich@gmail.com</p>
            </div>
          </section>

          {/* Disclaimers */}
          <hr className="border-light-border" />

          <section>
            <h2 className="font-display text-lg font-semibold text-light-text">
              {t("disclaimerHeading")}
            </h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-light-text">
                  {t("contentLiabilityHeading")}
                </h3>
                <p className="mt-2">
                  {t("contentLiabilityText")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-light-text">
                  {t("linkLiabilityHeading")}
                </h3>
                <p className="mt-2">
                  {t("linkLiabilityText")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
