import type { Metadata } from "next"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { buildPageAlternates, openGraphLocale } from "@/lib/seo/locale-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const title = locale === "en" ? "Sale | BAMTAE" : "Ofertas | BAMTAE"
  const description =
    locale === "en"
      ? "BAMTAE sale pieces and limited offers. Coming soon."
      : "Ofertas y piezas en promoción BAMTAE. Próximamente."

  return {
    title,
    description,
    alternates: buildPageAlternates(locale, "/ofertas"),
    openGraph: {
      title,
      description,
      locale: openGraphLocale(locale),
      type: "website",
      url: `/${locale}/ofertas`,
    },
  }
}

export default async function OfertasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isEn = locale === "en"

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-[#F7F3EE]">
        <div className="text-center max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-4">
            BAMTAE
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-cacao mb-6">
            {isEn ? "Sale" : "Ofertas"}
          </h1>
          <p className="text-cacao/70 text-lg leading-relaxed">
            {isEn
              ? "Coming soon. We are preparing something special for you."
              : "Próximamente. Estamos preparando algo especial para ti."}
          </p>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
