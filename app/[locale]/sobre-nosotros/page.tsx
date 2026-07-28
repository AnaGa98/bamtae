import Link from "next/link"
import {
  HeartHandshake,
  Home,
  Scissors,
  Users,
} from "lucide-react"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { Button } from "@/components/ui/button"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { buildPageAlternates, openGraphLocale } from "@/lib/seo/locale-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const title = locale === "en" ? "About Us | BAMTAE" : "Sobre Nosotros | BAMTAE"
  const description =
    locale === "en"
      ? "Family-made in Medellín. BAMTAE designs sculpting pieces so every woman feels confident in her own skin."
      : "Hecho en familia en Medellín. BAMTAE diseña prendas que esculpen para que cada mujer se sienta segura en su propia piel."

  return {
    title,
    description,
    alternates: buildPageAlternates(locale, "/sobre-nosotros"),
    openGraph: {
      title,
      description,
      locale: openGraphLocale(locale),
      type: "website",
      url: `/${locale}/sobre-nosotros`,
    },
  }
}

const differentiators = [
  {
    icon: Scissors,
    title: "Calidad artesanal",
    description:
      "Cada prenda se confecciona con cuidado en nuestro taller en Medellín, con telas premium seleccionadas para que el ajuste dure todo el día.",
  },
  {
    icon: Users,
    title: "Diversidad e inclusión",
    description:
      "Diseñamos para todo tipo de figura. Nuestras modelos, nuestras clientas y nuestras tallas reflejan la diversidad real de las mujeres colombianas.",
  },
  {
    icon: Home,
    title: "Hecho en familia",
    description:
      "Somos un negocio familiar desde el primer día: dos hermanas, sus padres, y un equipo que crece con el mismo cariño con el que empezamos.",
  },
  {
    icon: HeartHandshake,
    title: "Cercanía real",
    description:
      "Detrás de cada pedido hay personas reales que quieren que te sientas bien con lo que usas — no una fábrica anónima.",
  },
] as const

export default async function SobreNosotrosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const collectionHref = `/${locale}/novedades`

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen overflow-hidden">
        {/* Hero */}
        <section className="relative py-20 lg:py-28">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 20% 10%, rgba(240, 213, 184, 0.65) 0%, transparent 55%), linear-gradient(165deg, #F8F4EE 0%, #F3E8DC 45%, #EED9C4 100%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-4">
                Nuestra historia
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-cacao leading-[1.15] text-balance">
                Hecho en familia. Pensado para esculpir tu confianza.
              </h1>
            </ScrollReveal>
          </div>
        </section>

        {/* Origin */}
        <section className="relative py-16 lg:py-20 bg-[#F7F3EE]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-serif text-2xl lg:text-3xl text-cacao mb-6">
                Historia de origen
              </h2>
              <div className="space-y-5 text-lg text-cacao/75 leading-relaxed">
                <p>
                  Bamtae nació en 2025, cuando dos hermanas decidieron montar un
                  pequeño taller de confección junto a sus padres en Medellín. Lo
                  que empezó como un proyecto familiar, cosiendo prenda por
                  prenda con sus propias manos, se convirtió en un negocio que
                  hoy acompaña a miles de mujeres en toda Colombia.
                </p>
                <p>
                  Seguimos siendo una empresa familiar. Cada body que sale de
                  nuestro taller pasa por el mismo cuidado con el que empezamos:
                  calidad de tela, buen ajuste y atención al detalle, porque así
                  fue como aprendimos a hacer las cosas desde el primer día.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(120deg, #F0E2D0 0%, #F7F3EE 50%, #E8D4BC 100%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
                Nuestra misión
              </p>
              <p className="font-serif text-2xl lg:text-3xl text-cacao leading-snug text-balance">
                Creemos que toda mujer merece sentirse segura en su propia piel,
                sin importar su talla o su tipo de cuerpo. Por eso diseñamos cada
                pieza pensando en realzar la figura natural de quien la usa, no
                en imponer un solo molde de belleza.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Differentiators */}
        <section className="relative py-16 lg:py-24 bg-[#F7F3EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12 lg:mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
                Lo que nos hace diferentes
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-10 lg:gap-14">
              {differentiators.map((item, index) => (
                <ScrollReveal
                  key={item.title}
                  delay={index * REVEAL_STAGGER_MS}
                >
                  <div className="flex gap-5">
                    <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-mustard/25 text-[#8B6914] ring-1 ring-[#C9A961]/30">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-cacao mb-2">
                        {item.title}
                      </h3>
                      <p className="text-cacao/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(201, 169, 97, 0.18) 0%, transparent 60%), linear-gradient(180deg, #F3E8DC, #F7F3EE)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal variant="scale">
              <blockquote className="font-serif text-2xl lg:text-3xl text-cacao leading-snug text-balance">
                &ldquo;Empezamos cosiendo bodys en la sala de la casa de nuestros
                padres. Hoy seguimos haciendo lo mismo: prendas pensadas para que
                cada mujer se sienta segura en su piel.&rdquo;
              </blockquote>
              <footer className="mt-6 text-sm uppercase tracking-[0.18em] text-[#AF6D4E]">
                — Fundadoras de Bamtae
              </footer>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 lg:py-24 bg-[#F7F3EE]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <p className="text-lg lg:text-xl text-cacao/80 leading-relaxed text-balance mb-8">
                Desde nuestro taller familiar hasta tu clóset, cada pieza Bamtae
                está hecha para acompañarte con confianza, todos los días.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-terracotta text-terracotta-foreground hover:bg-[#a84528]"
              >
                <Link href={collectionHref}>Descubre la colección →</Link>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
