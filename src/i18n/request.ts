import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const key of Object.keys(override)) {
    if (
      typeof override[key] === "object" &&
      override[key] !== null &&
      typeof base[key] === "object" &&
      base[key] !== null
    ) {
      result[key] = deepMerge(base[key] as Messages, override[key] as Messages);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "de")) {
    locale = routing.defaultLocale;
  }

  // Load English as base, then deep-merge the requested locale.
  // Any key missing in the locale file falls back to English.
  const fallbackMessages = (await import("../../messages/en.json")).default as Messages;
  const localeMessages =
    locale !== "en"
      ? ((await import(`../../messages/${locale}.json`)).default as Messages)
      : fallbackMessages;

  return {
    locale,
    messages: deepMerge(fallbackMessages, localeMessages),
  };
});
