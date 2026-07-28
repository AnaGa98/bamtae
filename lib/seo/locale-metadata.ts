import type { Metadata } from "next"
import { defaultLocale, locales, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo/json-ld"

export { SITE_URL }

/** Path without locale prefix, e.g. `/novedades` or `/` */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/")
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    const rest = segments.slice(2).join("/")
    return rest ? `/${rest}` : "/"
  }
  return pathname || "/"
}

export function localizedPath(locale: Locale, pathWithoutLocale = "/"): string {
  const normalized =
    !pathWithoutLocale || pathWithoutLocale === "/"
      ? ""
      : pathWithoutLocale.startsWith("/")
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`
  return `/${locale}${normalized}`
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

/** Canonical + hreflang so ES and EN can rank as separate URLs. */
export function buildPageAlternates(
  locale: Locale,
  pathWithoutLocale = "/"
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {}
  for (const loc of locales) {
    languages[loc] = absoluteUrl(localizedPath(loc, pathWithoutLocale))
  }
  languages["x-default"] = absoluteUrl(
    localizedPath(defaultLocale, pathWithoutLocale)
  )

  return {
    canonical: absoluteUrl(localizedPath(locale, pathWithoutLocale)),
    languages,
  }
}

export function openGraphLocale(locale: Locale): string {
  return locale === "en" ? "en_US" : "es_CO"
}
