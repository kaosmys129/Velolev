import {languageNames} from "../lib/languages.mjs";
// Single source of truth for all locale logic in the velolev site.
// astro.config.mjs imports `defaultLocale` / `locales` from here.

export const defaultLocale = "en" as const;

export const locales = ["en", "es", "fr", "pt", "vi", "th", "id"] as const;

export type Locale = (typeof locales)[number];

/** Display names for the language switcher. */
export const localeNames: Record<Locale, string> = languageNames;

/** BCP-47 language tags used for the <html lang> attribute. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  pt: "pt",
  vi: "vi",
  th: "th",
  id: "id",
};

/** Non-default locales (the ones that get a URL prefix). */
export const otherLocales: Locale[] = locales.filter((l) => l !== defaultLocale);

/**
 * Map a browser/navigator language (e.g. "es-MX", "pt-BR", "zh-CN") to a
 * supported locale. Falls back to the default locale when nothing matches.
 */
export function detectLocale(acceptLangs: string[]): Locale {
  const map: Record<string, Locale> = {
    es: "es",
    ca: "es",
    fr: "fr",
    pt: "pt",
    vi: "vi",
    th: "th",
    id: "id",
    ms: "id",
  };
  for (const raw of acceptLangs) {
    const l = raw.toLowerCase();
    if (map[l]) return map[l];
    const base = l.split("-")[0];
    if (map[base]) return map[base];
  }
  return defaultLocale;
}

export const isLocale = (s: string): s is Locale =>
  (locales as readonly string[]).includes(s);

/** URL prefix (with leading slash) for a locale, or "" for the default locale. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}
