import { getPrimaryProductImage } from "@/lib/product-images"
import { Product } from "@/lib/products"

export function getProductImageMap(products: Product[]): Record<string, string> {
  return products.reduce<Record<string, string>>((acc, product) => {
    acc[product.id] = getPrimaryProductImage(product)
    return acc
  }, {})
}
