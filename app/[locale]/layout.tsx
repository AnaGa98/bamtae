import type { Metadata } from "next"
import { locales, type Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/dictionaries"
import {
  buildPageAlternates,
  openGraphLocale,
} from "@/lib/seo/locale-metadata"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords:
      locale === "es"
        ? [
            "ropa deportiva mujer",
            "bodys esculturales",
            "leggings premium",
            "activewear de lujo",
            "moda femenina Medellín",
          ]
        : [
            "women activewear",
            "sculpting bodysuits",
            "premium leggings",
            "luxury activewear",
            "feminine fashion Medellin",
          ],
    alternates: buildPageAlternates(locale, "/"),
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: openGraphLocale(locale),
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      type: "website",
      siteName: "BAMTAE",
      url: `/${locale}`,
    },
  }
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  return children
}
