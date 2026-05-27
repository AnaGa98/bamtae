import Image from "next/image"
import Link from "next/link"
import { getAllProducts, getBestSellers } from "@/lib/products"
import { getPrimaryProductImage } from "@/lib/product-images"
import type { Locale } from "@/lib/i18n"

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
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Compra por categoria
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explora nuestras colecciones principales
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="font-serif text-lg lg:text-xl text-white font-medium">
                  {category.name}
                </h3>
                <span className="mt-1 inline-block text-sm text-white/80 group-hover:underline">
                  Ver categoria
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
