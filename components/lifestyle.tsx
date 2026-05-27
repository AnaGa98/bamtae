import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"

interface LifestyleProps {
  locale: Locale
}

export function Lifestyle({ locale }: LifestyleProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0479aO6hhL8ZHpq1oEDNwaVIJxjRbi.png"
              alt="Estilo de vida BAMTAE"
              fill
              loading="lazy"
              className="object-cover object-top"
            />
          </div>

          <div className="lg:pl-8">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              El estilo de vida BAMTAE
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-medium text-foreground leading-tight text-balance">
              Disenado para moverte contigo. Hecho para favorecerte.
            </h2>
            <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
              Cada pieza de nuestra coleccion esta pensada para celebrar tu figura.
              Desde bodys esculturales hasta conjuntos coordinados, BAMTAE crea
              esenciales que te hacen sentir tan bien como te ves.
            </p>
            <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
              Ya sea para tu dia a dia o para una salida especial, nuestras telas
              premium se mueven contigo, nunca en tu contra.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-8">
              <Link href={`/${locale}/novedades`}>Descubre la coleccion</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
