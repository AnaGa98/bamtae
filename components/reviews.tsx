import { Star } from "lucide-react"
import catalogoData from "@/lib/catalogo.json"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

export function Reviews() {
  const reviews = catalogoData.testimonials.slice(0, 3)

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 30%, #F6E6D8 0%, transparent 55%), #F7F3EE",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
            Testimonios
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
            Lo que dicen nuestras clientas
          </h2>
          <p className="mt-4 text-cacao/60">
            Historias reales de mujeres que aman BAMTAE
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ScrollReveal key={`${review.name}-${index}`} delay={index * REVEAL_STAGGER_MS} variant="up">
              <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-xl h-full ring-1 ring-[#C9A961]/25 shadow-[0_12px_32px_rgba(61,40,28,0.06)]">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-mustard text-mustard"
                    />
                  ))}
                </div>
                <p className="text-cacao/80 leading-relaxed mb-4">
                  &quot;{review.text}&quot;
                </p>
                <div className="border-t border-[#C9A961]/25 pt-4">
                  <p className="font-medium text-cacao">{review.name}</p>
                  <p className="text-sm text-cacao/55">
                    {review.city} — {review.product}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
