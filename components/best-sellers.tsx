import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBestSellers } from "@/lib/products"
import { toHomeProductCard } from "@/lib/home-products"
import type { Locale } from "@/lib/i18n"

interface BestSellersProps {
  locale: Locale
}

export function BestSellers({ locale }: BestSellersProps) {
  const bestSellers = getBestSellers()
    .slice(0, 4)
    .map((product) => toHomeProductCard(product, "Mas Vendido"))

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16 gap-4">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
              Mas Vendidos
            </h2>
            <p className="mt-3 text-muted-foreground">
              Las prendas favoritas de nuestras clientas
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full self-start sm:self-auto">
            <Link href={`/${locale}/mas-vendidos`}>Ver todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((product) => (
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
      </div>
    </section>
  )
}
