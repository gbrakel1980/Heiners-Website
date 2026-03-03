import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

type Params = Promise<{ locale: string }>;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bcc-cable-consulting.de";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "BCC Cable Consulting",
      images: [
        {
          url: "/images/brakelmann.png",
          width: 480,
          height: 600,
          alt: "Prof. Dr.-Ing. Heinrich Brakelmann — BCC Cable Consulting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brakelmann.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased bg-primary text-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
