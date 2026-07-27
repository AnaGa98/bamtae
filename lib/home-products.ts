import { getPrimaryProductImage } from "@/lib/product-images"
import { Product } from "@/lib/products"

export type HomeProductCard = {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number | null
  colors: string[]
  image: string
  badge?: "Mas Vendido" | "Nuevo"
}

export function toHomeProductCard(
  product: Product,
  badge?: HomeProductCard["badge"]
): HomeProductCard {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    originalPrice: product.compare_at_price,
    colors: product.colors,
    image: getPrimaryProductImage(product),
    badge,
  }
}
