import { Star } from "lucide-react"
import catalogoData from "@/lib/catalogo.json"

export function Reviews() {
  const reviews = catalogoData.testimonials.slice(0, 3)

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Lo que dicen nuestras clientas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Historias reales de mujeres que aman BAMTAE
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="bg-background p-6 lg:p-8 rounded-lg"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                &quot;{review.text}&quot;
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.city} — {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
