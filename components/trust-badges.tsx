import { Truck, RotateCcw, MapPin } from "lucide-react"

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
      </div>
    </section>
  )
}
