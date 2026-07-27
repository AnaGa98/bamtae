import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface HeroProps {
  dict: Dictionary
  locale: Locale
}

/** Placeholder social proof — update when real customer/review totals are available. */
const SOCIAL_PROOF = {
  customersLabel: "+5.000 mujeres en Colombia ya confían en BAMTAE",
  rating: 4.8,
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
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-6 text-balance">
              Bodys esculturales que realzan tu figura. Esculpe tu confianza.
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-md mb-5">
              Nuestros bodys de lujo realzan tu silueta y te acompañan sin esfuerzo del día a
              la noche. Encuentra tu ajuste perfecto.
            </p>

            {/* Placeholder: replace rating/customer count with real metrics when available */}
            <p
              className="flex flex-wrap items-center gap-2 text-sm text-[#3D2817] mb-8"
              title="Placeholder — actualizar con número real de clientas/reseñas"
            >
              <span className="inline-flex items-center gap-0.5 text-mustard" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.floor(SOCIAL_PROOF.rating)
                        ? "fill-current"
                        : "fill-mustard/30 text-mustard/40"
                    }`}
                  />
                ))}
              </span>
              <span className="font-medium">{SOCIAL_PROOF.rating}</span>
              <span className="text-stone-500">·</span>
              <span>{SOCIAL_PROOF.customersLabel}</span>
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
