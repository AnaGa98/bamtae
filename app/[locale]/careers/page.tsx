import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { CareersForm } from "@/components/careers-form"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  return {
    title:
      locale === "en" ? "Work with us | BAMTAE" : "Trabaja con Nosotros | BAMTAE",
    description:
      locale === "en"
        ? "Join the BAMTAE family workshop in Medellín. Tell us who you are and which machines you use."
        : "Únete al taller familiar de BAMTAE en Medellín. Cuéntanos quién eres y qué máquinas sabes usar.",
  }
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen overflow-hidden">
        <section className="relative py-16 lg:py-24">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 0%, rgba(240, 213, 184, 0.6) 0%, transparent 55%), linear-gradient(165deg, #F8F4EE 0%, #F3E8DC 50%, #EED9C4 100%)",
            }}
          />

          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 lg:mb-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
                BAMTAE
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-cacao text-balance">
                Trabaja con nosotros
              </h1>
              <p className="mt-4 text-cacao/70 leading-relaxed">
                Somos un taller familiar en Medellín. Si sabes coser y quieres
                sumarte al equipo, déjanos tus datos y te escribimos por
                WhatsApp.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 backdrop-blur-sm ring-1 ring-[#C9A961]/25 p-6 sm:p-8 shadow-[0_16px_40px_rgba(61,40,28,0.08)]">
              <CareersForm />
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
