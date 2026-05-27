import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "The Sculpt Seamless Body is absolutely incredible. It smooths everything out while still being comfortable enough to wear all day. I've bought it in every color!",
    product: "Sculpt Seamless Body",
  },
  {
    id: 2,
    name: "Emma L.",
    rating: 5,
    text: "Finally found leggings that actually stay in place during my workouts. The Contour Fit Leggings are a game changer. Squat-proof and so flattering!",
    product: "Contour Fit Leggings",
  },
  {
    id: 3,
    name: "Jessica R.",
    rating: 5,
    text: "I wear BAMTAE from morning yoga to coffee dates. The quality is unmatched and I love how elegant everything looks. Truly elevated basics.",
    product: "Soft Motion Set",
  },
]

export function Reviews() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Loved by Women Everywhere
          </h2>
          <p className="mt-4 text-muted-foreground">
            Don&apos;t just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
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
                  Verified Purchase — {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
