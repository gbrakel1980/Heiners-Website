import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "de")) {
    locale = routing.defaultLocale;
  }

  // Load English as base, then overlay the requested locale.
  // Any key missing in the locale file falls back to English.
  const fallbackMessages = (await import("../../messages/en.json")).default;
  const localeMessages =
    locale !== "en"
      ? (await import(`../../messages/${locale}.json`)).default
      : fallbackMessages;

  return {
    locale,
    messages: { ...fallbackMessages, ...localeMessages },
  };
});
