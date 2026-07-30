import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

interface LifestyleProps {
  locale: Locale
}

export function Lifestyle({ locale }: LifestyleProps) {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(120deg, #F7F3EE 0%, #F0E2D0 50%, #E8D4BC 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <ScrollReveal variant="left">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-[#C9A961]/30 shadow-[0_20px_50px_rgba(61,40,28,0.12)]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0479aO6hhL8ZHpq1oEDNwaVIJxjRbi.png"
                alt="Estilo de vida BAMTAE"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                loading="lazy"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cacao/20 via-transparent to-mustard/10" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={REVEAL_STAGGER_MS * 2} className="lg:pl-8">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#AF6D4E] mb-4">
              El estilo de vida BAMTAE
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-medium text-cacao leading-tight text-balance">
              Disenado para moverte contigo. Hecho para favorecerte.
            </h2>
            <p className="mt-6 text-lg text-cacao/75 leading-relaxed">
              Cada pieza de nuestra coleccion esta pensada para celebrar tu figura.
              Desde bodys esculturales hasta conjuntos coordinados, BAMTAE crea
              esenciales que te hacen sentir tan bien como te ves.
            </p>
            <p className="mt-4 text-lg text-cacao/75 leading-relaxed">
              Ya sea para tu dia a dia o para una salida especial, nuestras telas
              premium se mueven contigo, nunca en tu contra.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full px-8 bg-terracotta text-terracotta-foreground hover:bg-[#a84528]"
            >
              <Link href={`/${locale}/novedades`}>Descubre la coleccion</Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
