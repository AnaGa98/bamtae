import Link from "next/link"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface HeroProps {
  dict: Dictionary
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  return (
    <section className="min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-[#F7F3EE] via-[#F7F3EE] to-[#EDE6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texto */}
          <div className="order-1">
            <p className="text-sm uppercase tracking-widest text-[#8B6F47] mb-4">
              NUEVA COLECCIÓN
            </p>
            <h1 className="font-serif font-bold text-5xl lg:text-7xl uppercase text-[#1A1A1A] leading-[1.05] mb-6">
              ESCULPE TU CONFIANZA
            </h1>
            <p className="text-base lg:text-lg text-[#6B6B6B] leading-relaxed max-w-lg mb-8">
              Nuestros bodys de lujo realzan tu silueta y te acompañan sin esfuerzo del día a
              la noche. Encuentra tu ajuste perfecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/novedades`}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3D2817] text-[#F7F3EE] text-sm uppercase tracking-wider font-medium transition-opacity hover:opacity-90"
              >
                VER COLECCIÓN
              </Link>
              <Link
                href={`/${locale}/mas-vendidos`}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F7F3EE] border border-[#3D2817] text-[#3D2817] text-sm uppercase tracking-wider font-medium transition-opacity hover:opacity-90"
              >
                MÁS VENDIDOS
              </Link>
            </div>
          </div>

          {/* Imagen + arco decorativo */}
          <div className="order-2 relative flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
              viewBox="0 0 400 500"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 200 40 A 160 200 0 0 1 200 460 A 160 200 0 0 1 200 40"
                stroke="#C9A961"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 w-full max-w-md aspect-[4/5] bg-stone-200 flex items-center justify-center p-8 text-center">
              <p className="text-stone-600 text-sm leading-relaxed">
                Imagen Hero — 3 modelos diversas usando bodys BAMTAE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
