import Image from "next/image"
import Link from "next/link"
import { getAllProducts, getBestSellers } from "@/lib/products"
import { getPrimaryProductImage } from "@/lib/product-images"
import type { Locale } from "@/lib/i18n"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

interface CategoriesProps {
  locale: Locale
}

export function Categories({ locale }: CategoriesProps) {
  const allProducts = getAllProducts()
  const bestSellers = getBestSellers()
  const firstProduct = allProducts[0]

  const getCategoryImage = (category: "bodys" | "conjuntos" | "vestidos"): string => {
    const product = allProducts.find((item) => item.category === category) ?? firstProduct
    return product ? getPrimaryProductImage(product) : "/placeholder.svg"
  }

  const categories = [
    {
      name: "Bodys",
      image: getCategoryImage("bodys"),
      href: `/${locale}/bodys`,
    },
    {
      name: "Conjuntos",
      image: getCategoryImage("conjuntos"),
      href: `/${locale}/conjuntos`,
    },
    {
      name: "Vestidos",
      image: getCategoryImage("vestidos"),
      href: `/${locale}/vestidos`,
    },
    {
      name: "Mas Vendidos",
      image: bestSellers[0] ? getPrimaryProductImage(bestSellers[0]) : "/placeholder.svg",
      href: `/${locale}/mas-vendidos`,
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, #F6E6D8 0%, transparent 60%), #F7F3EE",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
            Colecciones
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
            Compra por categoria
          </h2>
          <p className="mt-4 text-cacao/60">
            Explora nuestras colecciones principales
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <ScrollReveal key={category.name} delay={index * REVEAL_STAGGER_MS} variant="scale">
              <Link
                href={category.href}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#EFE0D0] block ring-1 ring-[#C9A961]/25 shadow-[0_12px_32px_rgba(61,40,28,0.08)] transition-shadow hover:shadow-[0_16px_40px_rgba(193,81,47,0.14)] hover:ring-mustard/50"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cacao/75 via-cacao/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                  <h3 className="font-serif text-lg lg:text-xl text-white font-medium">
                    {category.name}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-mustard group-hover:text-white transition-colors">
                    Ver categoria →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
