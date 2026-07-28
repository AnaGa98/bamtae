import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBestSellers } from "@/lib/products"
import { toHomeProductCard } from "@/lib/home-products"
import type { Locale } from "@/lib/i18n"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

interface BestSellersProps {
  locale: Locale
}

export function BestSellers({ locale }: BestSellersProps) {
  const bestSellers = getBestSellers()
    .slice(0, 4)
    .map((product) => toHomeProductCard(product, "Mas Vendido"))

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(160deg, #FBF7F1 0%, #F5EBDD 40%, #F0E2D0 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
              Favoritos
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
              Mas Vendidos
            </h2>
            <p className="mt-3 text-cacao/60">
              Las prendas favoritas de nuestras clientas
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full self-start sm:self-auto border-cacao/40 text-cacao hover:bg-mustard/20 hover:border-mustard hover:text-cacao"
          >
            <Link href={`/${locale}/mas-vendidos`}>Ver todos</Link>
          </Button>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * REVEAL_STAGGER_MS} variant="scale">
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
      </div>
    </section>
  )
}
