import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { HeroModelsVisual } from "@/components/hero-models-visual"

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
    <section className="relative min-h-[70vh] lg:min-h-[82vh] overflow-hidden">
      {/* Cream → soft peach atmosphere (reference composition) */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 70% 45%, #F6E6D8 0%, transparent 55%), linear-gradient(135deg, #F8F4EE 0%, #F3E8DC 48%, #EFDAC8 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-12 items-center">
          <div className="order-1 max-w-xl hero-enter" style={{ ["--hero-delay" as string]: "80ms" }}>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#AF6D4E] mb-5">
              NUEVA COLECCIÓN
            </p>

            <h1 className="font-serif font-medium text-[2.15rem] sm:text-5xl lg:text-[3.35rem] text-cacao leading-[1.12] mb-6 text-balance">
              Bodys esculturales que realzan tu figura.{" "}
              <span className="font-[family-name:var(--font-script)] text-terracotta italic font-normal text-[1.15em] leading-none px-0.5">
                Esculpe
              </span>{" "}
              tu confianza.
            </h1>

            <p className="text-[15px] md:text-base text-cacao/70 leading-relaxed max-w-md mb-6">
              Nuestros bodys de lujo realzan tu silueta y te acompañan sin esfuerzo del día a
              la noche. Encuentra tu ajuste perfecto.
            </p>

            {/* Placeholder: replace rating/customer count with real metrics when available */}
            <p
              className="flex flex-wrap items-center gap-2 text-sm text-cacao mb-9"
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
              <span className="text-cacao/40">·</span>
              <span className="text-cacao/80">{SOCIAL_PROOF.customersLabel}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={`/${locale}/novedades`}
                className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-3.5 bg-terracotta text-terracotta-foreground text-sm uppercase tracking-wider font-medium transition-colors hover:bg-[#a84528]"
              >
                VER COLECCIÓN
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/mas-vendidos`}
                className="inline-flex items-center justify-center rounded-md px-8 py-3.5 bg-transparent border border-cacao/70 text-cacao text-sm uppercase tracking-wider font-medium transition-colors hover:border-terracotta hover:bg-terracotta/10 hover:text-terracotta"
              >
                MÁS VENDIDOS
              </Link>
            </div>
          </div>

          <div
            className="order-2 lg:-mr-4 xl:-mr-8 hero-enter-right"
            style={{ ["--hero-delay" as string]: "220ms" }}
          >
            <HeroModelsVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
