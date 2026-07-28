import { Sparkles, Feather, Move, Heart } from "lucide-react"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

const benefits = [
  {
    icon: Sparkles,
    title: "Cortes que Esculpen",
    description: "Diseñados para realzar tu silueta natural",
    ring: "bg-mustard/25 text-[#8B6914]",
  },
  {
    icon: Feather,
    title: "Telas Premium Suaves",
    description: "Materiales lujosamente suaves que se sienten como una segunda piel",
    ring: "bg-terracotta/15 text-terracotta",
  },
  {
    icon: Move,
    title: "Pensados para Moverte",
    description: "Cómodos para todo tu día, desde el trabajo hasta tu rutina favorita",
    ring: "bg-[#C9A961]/25 text-cacao",
  },
  {
    icon: Heart,
    title: "Confianza Cada Día",
    description: "Siéntete hermosa y empoderada en todo lo que uses",
    ring: "bg-wine/15 text-wine",
  },
]

export function WhyBamtae() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(240, 213, 184, 0.55) 0%, transparent 55%), linear-gradient(180deg, #F8F4EE, #F3E8DC)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
            Nuestra historia
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
            Por qué BAMTAE
          </h2>
          <p className="mt-4 text-cacao/60 max-w-2xl mx-auto">
            Creemos que toda mujer merece sentirse segura en su propia piel
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * REVEAL_STAGGER_MS}>
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full ring-1 ring-[#C9A961]/30 mb-5 ${benefit.ring}`}
                >
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-cacao mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-cacao/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={REVEAL_STAGGER_MS * 4} className="mt-14 lg:mt-16">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto text-center border-t border-[#C9A961]/30 pt-10">
            {[
              { value: "+5.000", label: "Clientas felices" },
              { value: "4.8/5", label: "Calificación promedio" },
              { value: "8 días", label: "Cambios sin dramas" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl md:text-3xl text-cacao">{stat.value}</p>
                <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#AF6D4E]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
