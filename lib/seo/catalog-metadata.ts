import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"
import {
  buildPageAlternates,
  openGraphLocale,
} from "@/lib/seo/locale-metadata"

type LocaleCopy = {
  title: string
  description: string
}

export function buildCatalogMetadata(
  locale: Locale,
  slug: string,
  copy: Record<Locale, LocaleCopy>
): Metadata {
  const page = copy[locale]
  const path = `/${slug}`

  return {
    title: page.title,
    description: page.description,
    alternates: buildPageAlternates(locale, path),
    openGraph: {
      title: page.title,
      description: page.description,
      locale: openGraphLocale(locale),
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      type: "website",
      url: `/${locale}${path}`,
    },
  }
}
