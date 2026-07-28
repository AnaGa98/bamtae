"use client"

import { useRef } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { HomeProductCard } from "@/lib/home-products"
import type { Locale } from "@/lib/i18n"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

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
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, #F3E8DC 0%, #F8F4EE 45%, #FBF7F1 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
              Recién llegados
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
              Novedades
            </h2>
            <p className="mt-3 text-cacao/60">
              Lo mas nuevo de BAMTAE para tu closet
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden lg:flex border-mustard/50 text-cacao hover:bg-mustard/20"
              onClick={() => scroll("left")}
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden lg:flex border-mustard/50 text-cacao hover:bg-mustard/20"
              onClick={() => scroll("right")}
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-cacao/40 text-cacao hover:bg-mustard/20 hover:border-mustard"
            >
              <Link href={`/${locale}/novedades`}>Ver todo</Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="lg:hidden grid grid-cols-2 gap-6">
          {mobileProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * REVEAL_STAGGER_MS}>
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
            </ScrollReveal>
          ))}
        </div>

        <div
          ref={scrollRef}
          className="hidden lg:flex gap-8 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {desktopProducts.map((product, index) => (
            <ScrollReveal
              key={product.id}
              delay={index * REVEAL_STAGGER_MS}
              className="flex-shrink-0 w-[280px]"
            >
              <div style={{ scrollSnapAlign: "start" }}>
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
