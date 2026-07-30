import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { HeroModelsMount } from "@/components/hero-models-mount"

interface HeroProps {
  dict: Dictionary
  locale: Locale
}

const SOCIAL_PROOF = {
  es: {
    customersLabel: "+5.000 mujeres en Colombia ya confían en BAMTAE",
    rating: 4.8,
  },
  en: {
    customersLabel: "+5,000 women in Colombia already trust BAMTAE",
    rating: 4.8,
  },
} as const

/** Mobile watermark — soft enough for type, visible enough to fill the frame. */
const MOBILE_HERO_CAROUSEL_OPACITY = 0.3

export function Hero({ locale }: HeroProps) {
  const proof = SOCIAL_PROOF[locale]
  const isEn = locale === "en"

  return (
    <section
      className="relative overflow-hidden max-lg:min-h-[calc(100svh-9.5rem)] max-lg:flex max-lg:flex-col lg:min-h-[82vh]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 70% 45%, #F6E6D8 0%, transparent 55%), linear-gradient(135deg, #F8F4EE 0%, #F3E8DC 48%, #EFDAC8 100%)",
        }}
      />

      {/* Mobile: watermark fills the entire hero frame */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-[-8%] bottom-0 top-[8%] flex items-end justify-center"
          style={{ opacity: MOBILE_HERO_CAROUSEL_OPACITY }}
        >
          <div className="h-full w-full max-w-none">
            <HeroModelsMount variant="mobile" />
          </div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(248 244 238 / 0.72) 0%, rgb(248 244 238 / 0.28) 38%, rgb(248 244 238 / 0.18) 68%, rgb(248 244 238 / 0.45) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col max-w-7xl mx-auto w-full px-6 md:px-12 max-lg:py-8 lg:py-20 xl:py-24">
        <div className="relative grid flex-1 lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-12 max-lg:content-center lg:items-center">
          <div
            className="relative z-20 order-1 max-w-xl hero-enter max-lg:flex max-lg:flex-col max-lg:justify-center"
            style={{ ["--hero-delay" as string]: "80ms" }}
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#AF6D4E] mb-4 sm:mb-5 font-medium max-lg:hero-type-glow">
              {isEn ? "NEW COLLECTION" : "NUEVA COLECCIÓN"}
            </p>

            <h1 className="font-serif font-medium text-[2.05rem] sm:text-5xl lg:text-[3.35rem] text-cacao leading-[1.12] mb-4 sm:mb-6 text-balance max-lg:hero-type-glow">
              {isEn ? (
                <>
                  Sculpting bodys that enhance your figure.{" "}
                  <span className="font-[family-name:var(--font-script)] text-terracotta italic font-normal text-[1.15em] leading-none px-0.5">
                    Sculpt
                  </span>{" "}
                  your confidence.
                </>
              ) : (
                <>
                  Bodys esculturales que realzan tu figura.{" "}
                  <span className="font-[family-name:var(--font-script)] text-terracotta italic font-normal text-[1.15em] leading-none px-0.5">
                    Esculpe
                  </span>{" "}
                  tu confianza.
                </>
              )}
            </h1>

            <p className="text-[15px] md:text-base text-cacao/85 lg:text-cacao/70 leading-relaxed max-w-md mb-4 sm:mb-6 max-lg:hero-type-glow">
              {isEn
                ? "Our luxury bodys enhance your silhouette and take you effortlessly from day to night. Find your perfect fit."
                : "Nuestros bodys de lujo realzan tu silueta y te acompañan sin esfuerzo del día a la noche. Encuentra tu ajuste perfecto."}
            </p>

            <p
              className="flex flex-wrap items-center gap-2 text-sm text-cacao mb-7 sm:mb-9 max-lg:hero-type-glow"
              title="Placeholder — actualizar con número real de clientas/reseñas"
            >
              <span className="inline-flex items-center gap-0.5 text-mustard" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.floor(proof.rating)
                        ? "fill-current"
                        : "fill-mustard/30 text-mustard/40"
                    }`}
                  />
                ))}
              </span>
              <span className="font-medium">{proof.rating}</span>
              <span className="text-cacao/40">·</span>
              <span className="text-cacao/80">{proof.customersLabel}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={`/${locale}/novedades`}
                className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-3.5 bg-terracotta text-terracotta-foreground text-sm uppercase tracking-wider font-medium transition-colors hover:bg-[#a84528] shadow-sm"
              >
                {isEn ? "SHOP COLLECTION" : "VER COLECCIÓN"}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/mas-vendidos`}
                className="inline-flex items-center justify-center rounded-md px-8 py-3.5 bg-[#F8F4EE]/95 lg:bg-transparent border border-cacao/70 text-cacao text-sm uppercase tracking-wider font-medium transition-colors hover:border-terracotta hover:bg-terracotta/10 hover:text-terracotta"
              >
                {isEn ? "BEST SELLERS" : "MÁS VENDIDOS"}
              </Link>
            </div>
          </div>

          {/* Desktop only — original side carousel, unchanged */}
          <div
            className="hidden lg:block order-2 lg:-mr-4 xl:-mr-8 hero-enter-right"
            style={{ ["--hero-delay" as string]: "220ms" }}
          >
            <HeroModelsMount variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  )
}
