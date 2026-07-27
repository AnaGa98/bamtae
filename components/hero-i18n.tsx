import Image from "next/image"
import Link from "next/link"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface HeroProps {
  dict: Dictionary
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  return (
    <section className="min-h-[70vh] lg:min-h-[80vh] bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-1">
            <p className="text-sm uppercase tracking-widest text-[#3D2817] mb-6">
              NUEVA COLECCIÓN
            </p>
            <h1 className="font-serif font-bold text-5xl lg:text-7xl uppercase text-[#1A1A1A] leading-tight mb-6">
              ESCULPE TU CONFIANZA
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-md mb-8">
              Nuestros bodys de lujo realzan tu silueta y te acompañan sin esfuerzo del día a
              la noche. Encuentra tu ajuste perfecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/novedades`}
                className="inline-flex items-center justify-center px-8 py-4 bg-terracotta text-terracotta-foreground text-sm uppercase tracking-wider font-medium transition-colors hover:bg-[#a84528]"
              >
                VER COLECCIÓN
              </Link>
              <Link
                href={`/${locale}/mas-vendidos`}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-cacao text-cacao text-sm uppercase tracking-wider font-medium transition-colors hover:border-terracotta hover:bg-terracotta/10 hover:text-terracotta"
              >
                MÁS VENDIDOS
              </Link>
            </div>
          </div>

          <div className="order-2 relative w-full flex items-center justify-center min-h-[320px] lg:min-h-[480px]">
            <svg
              className="absolute inset-0 w-[90%] h-[90%] mx-auto pointer-events-none opacity-60 z-0"
              viewBox="0 0 400 480"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 70 460 L 70 220 Q 70 60 200 60 Q 330 60 330 220 L 330 460"
                stroke="#C9A961"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Image
              src="/hero/hero-modelos-transparentes.png"
              alt="Modelos diversas usando bodys BAMTAE"
              width={754}
              height={876}
              priority
              className="relative z-10 w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
