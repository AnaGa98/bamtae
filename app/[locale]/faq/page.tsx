import catalogoData from "@/lib/catalogo.json"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { JsonLd, getFaqPageJsonLd } from "@/lib/seo/json-ld"
import { buildPageAlternates, openGraphLocale } from "@/lib/seo/locale-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const title = locale === "en" ? "FAQ | BAMTAE" : "Preguntas frecuentes | BAMTAE"
  const description =
    locale === "en"
      ? "Answers about shipping, payments, sizing and returns at BAMTAE."
      : "Respuestas sobre envíos, pagos, tallas, cambios y cuidado de prendas BAMTAE."

  return {
    title,
    description,
    alternates: buildPageAlternates(locale, "/faq"),
    openGraph: {
      title,
      description,
      locale: openGraphLocale(locale),
      type: "website",
      url: `/${locale}/faq`,
    },
  }
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const faqSections = catalogoData.faq

  return (
    <>
      <JsonLd id="faq-jsonld" data={getFaqPageJsonLd(faqSections)} />
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen bg-[#F7F3EE]">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-sm tracking-widest uppercase text-stone-500 mb-4">BAMTAE</p>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Preguntas frecuentes
          </h1>
          <p className="text-stone-600 mb-12 max-w-2xl">
            Todo lo que necesitas saber sobre tallas, pagos, envíos, cambios y cuidado de tus
            prendas.
          </p>

          <div className="space-y-12">
            {faqSections.map((section) => (
              <div key={section.section}>
                <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-[#3D2817]/10 pb-3">
                  {section.section}
                </h2>
                <div className="space-y-6">
                  {section.items.map((faq) => (
                    <article key={faq.q} className="pb-2">
                      <h3 className="font-medium text-lg text-stone-900 mb-2">{faq.q}</h3>
                      <p className="text-stone-600 leading-relaxed">{faq.a}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
