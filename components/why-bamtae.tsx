import { Sparkles, Feather, Move, Heart } from "lucide-react"

const benefits = [
  {
    icon: Sparkles,
    title: "Sculpting Fits",
    description: "Designed to flatter and enhance your natural silhouette",
  },
  {
    icon: Feather,
    title: "Soft Premium Fabrics",
    description: "Luxuriously soft materials that feel like a second skin",
  },
  {
    icon: Move,
    title: "Designed for Movement",
    description: "Engineered for comfort whether you're working out or working from home",
  },
  {
    icon: Heart,
    title: "Everyday Confidence",
    description: "Feel beautiful and empowered in everything you wear",
  },
]

export function WhyBamtae() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Why BAMTAE
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We believe every woman deserves to feel confident in her own skin
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/50 text-primary mb-5">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
