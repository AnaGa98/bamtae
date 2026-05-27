import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const bestSellers = [
  {
    id: "1",
    name: "Off-Shoulder Ruched Body",
    price: 78,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
    colors: ["#F5F0E8", "#6B4F43", "#1E1E1E"],
    badge: "Best Seller" as const,
  },
  {
    id: "2",
    name: "Mesh Corset Bodysuit",
    price: 85,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
    colors: ["#1E1E1E", "#F5F0E8"],
    badge: "Best Seller" as const,
  },
  {
    id: "3",
    name: "Twist Front Mesh Body",
    price: 72,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
    colors: ["#1E1E1E", "#6B4F43", "#F5F0E8"],
  },
  {
    id: "4",
    name: "Contrast Trim Bodysuit",
    price: 68,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LvS4sHUtr1sLErQxDvExZu2niGVfcN.png",
    colors: ["#1E1E1E", "#F5F0E8"],
    badge: "New" as const,
  },
]

export function BestSellers() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
              Best Sellers
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our most loved pieces, chosen by you
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full self-start sm:self-auto">
            <Link href="/best-sellers">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
