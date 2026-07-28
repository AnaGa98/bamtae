import {
  Truck,
  RotateCcw,
  MapPin,
  CreditCard,
  Landmark,
  Smartphone,
  Banknote,
  ShieldCheck,
  Wallet,
} from "lucide-react"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

const badges = [
  {
    icon: Truck,
    title: "Envíos Seguros",
    description: "1-4 días hábiles a toda Colombia",
    ring: "bg-mustard/25",
    iconClass: "text-cacao",
  },
  {
    icon: RotateCcw,
    title: "Devoluciones Fáciles",
    description: "8 días para cambios sin complicaciones",
    ring: "bg-terracotta/15",
    iconClass: "text-terracotta",
  },
  {
    icon: MapPin,
    title: "Hecho en Medellín",
    description: "Diseñado por mujeres, para mujeres",
    ring: "bg-[#C9A961]/25",
    iconClass: "text-[#8B6914]",
  },
]

/** Placeholder icons — swap for official brand logos when available. */
const paymentMethods = [
  { label: "Débito", icon: CreditCard },
  { label: "Crédito", icon: CreditCard },
  { label: "PSE", icon: Landmark },
  { label: "Nequi", icon: Smartphone },
  { label: "Contraentrega", icon: Banknote },
  { label: "Wompi", icon: Wallet },
]

export function TrustBadges() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, #F8F4EE 0%, #F3E8DC 55%, #EFE0D0 100%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <ScrollReveal key={badge.title} delay={index * REVEAL_STAGGER_MS}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${badge.ring} ring-1 ring-[#C9A961]/35 flex items-center justify-center mb-5 shadow-[0_8px_24px_rgba(61,40,28,0.06)]`}
                  >
                    <Icon
                      className={`w-7 h-7 md:w-8 md:h-8 ${badge.iconClass}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-cacao mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-cacao/65 text-sm md:text-base max-w-xs">
                    {badge.description}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal
          delay={REVEAL_STAGGER_MS * 3}
          className="mt-12 md:mt-14 pt-10 border-t border-[#C9A961]/30"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.label}
                    className="flex flex-col items-center gap-1.5 min-w-[4.5rem]"
                    title={`${method.label} (logo placeholder)`}
                  >
                    <span className="w-11 h-11 rounded-md border border-mustard/40 bg-white/80 flex items-center justify-center text-cacao hover:border-terracotta/50 hover:bg-mustard/10 transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-cacao/55">
                      {method.label}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="inline-flex items-center justify-center gap-2 self-center lg:self-auto px-4 py-2.5 rounded-full border border-mustard/40 bg-mustard/20 text-cacao">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#8B6914]" strokeWidth={1.75} />
              <span className="text-xs sm:text-sm font-medium tracking-wide">
                Compra 100% segura
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
