"use client"

import { useRef } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { HomeProductCard } from "@/lib/home-products"
import type { Locale } from "@/lib/i18n"

interface NewArrivalsProps {
  locale: Locale
  products: HomeProductCard[]
}

export function NewArrivals({ locale, products }: NewArrivalsProps) {
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

  const mobileProducts = products.slice(0, 4)
  const desktopProducts = products.slice(0, 8)

  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
              Novedades
            </h2>
            <p className="mt-3 text-muted-foreground">
              Lo mas nuevo de BAMTAE para tu closet
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden lg:flex"
              onClick={() => scroll("left")}
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden lg:flex"
              onClick={() => scroll("right")}
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href={`/${locale}/novedades`}>Ver todo</Link>
            </Button>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-2 gap-6">
          {mobileProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              colors={product.colors}
              badge={product.badge}
              rating={product.rating}
              reviewCount={product.reviewCount}
              href={`/${locale}/producto/${product.slug}`}
            />
          ))}
        </div>

        <div
          ref={scrollRef}
          className="hidden lg:flex gap-8 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {desktopProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px]" style={{ scrollSnapAlign: "start" }}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                colors={product.colors}
                badge={product.badge}
                rating={product.rating}
                reviewCount={product.reviewCount}
                href={`/${locale}/producto/${product.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
