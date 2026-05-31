import { Sparkles, Feather, Move, Heart } from "lucide-react"

const benefits = [
  {
    icon: Sparkles,
    title: "Cortes que Esculpen",
    description: "Diseñados para realzar tu silueta natural",
  },
  {
    icon: Feather,
    title: "Telas Premium Suaves",
    description: "Materiales lujosamente suaves que se sienten como una segunda piel",
  },
  {
    icon: Move,
    title: "Pensados para Moverte",
    description: "Cómodos para todo tu día, desde el trabajo hasta tu rutina favorita",
  },
  {
    icon: Heart,
    title: "Confianza Cada Día",
    description: "Siéntete hermosa y empoderada en todo lo que uses",
  },
]

export function WhyBamtae() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Por qué BAMTAE
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Creemos que toda mujer merece sentirse segura en su propia piel
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
