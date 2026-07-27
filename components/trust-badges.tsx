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

const badges = [
  {
    icon: Truck,
    title: "Envíos Seguros",
    description: "1-4 días hábiles a toda Colombia",
  },
  {
    icon: RotateCcw,
    title: "Devoluciones Fáciles",
    description: "8 días para cambios sin complicaciones",
  },
  {
    icon: MapPin,
    title: "Hecho en Medellín",
    description: "Diseñado por mujeres, para mujeres",
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
    <section className="py-16 md:py-20 bg-[#F7F3EE]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#EFE7DD] flex items-center justify-center mb-5">
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 text-[#3D2817]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-2">
                  {badge.title}
                </h3>
                <p className="text-stone-600 text-sm md:text-base max-w-xs">
                  {badge.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 md:mt-14 pt-10 border-t border-[#3D2817]/10">
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
                    <span className="w-11 h-11 rounded-md border border-[#3D2817]/15 bg-white/70 flex items-center justify-center text-[#3D2817]">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-stone-500">
                      {method.label}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="inline-flex items-center justify-center gap-2 self-center lg:self-auto px-4 py-2.5 rounded-full border border-[#3D2817]/15 bg-[#EFE7DD]/80 text-[#3D2817]">
              <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="text-xs sm:text-sm font-medium tracking-wide">
                Compra 100% segura
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
