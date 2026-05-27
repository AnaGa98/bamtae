"use client"

import { useRef } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const newArrivals = [
  {
    id: "5",
    name: "Strapless Mesh Body",
    price: 76,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ckpPkv30oqVjPcWhN4u8HYxlKuk19.png",
    colors: ["#1E1E1E", "#6B4F43", "#F5F0E8"],
    badge: "New" as const,
  },
  {
    id: "6",
    name: "Halter Cut-Out Body",
    price: 82,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ONt1UYQRwsTPDfGaXza53BV74O0BgM.png",
    colors: ["#1E1E1E"],
    badge: "New" as const,
  },
  {
    id: "7",
    name: "Sheer Mesh Long Sleeve Body",
    price: 74,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KGzGTpR0nTXbHM74Alg7PtnWlMwiMD.png",
    colors: ["#F5E6A0", "#F5F0E8", "#1E1E1E"],
    badge: "New" as const,
  },
  {
    id: "8",
    name: "Ribbed Turtleneck Top",
    price: 58,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ObqqjBgkSyxuFtTNlAlpNCdgg0lvyT.png",
    colors: ["#F5F0E8", "#1E1E1E", "#6B4F43"],
    badge: "New" as const,
  },
]

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
              New Arrivals
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fresh drops to elevate your wardrobe
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden lg:flex"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden lg:flex"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/new-in">View All</Link>
            </Button>
          </div>
        </div>

        {/* Mobile: Grid, Desktop: Scrollable */}
        <div className="lg:hidden grid grid-cols-2 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div
          ref={scrollRef}
          className="hidden lg:flex gap-8 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {newArrivals.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px]" style={{ scrollSnapAlign: "start" }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
