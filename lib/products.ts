import catalogoData from "@/lib/catalogo.json"

type Catalogo = typeof catalogoData

export type CatalogCategory = Catalogo["categories"][number]
export type Product = Catalogo["products"][number] & { slug: string }

const productsFromCatalog = catalogoData.products

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

function toProduct(product: Catalogo["products"][number]): Product {
  return {
    ...product,
    slug: normalizeSlug(product.id),
  }
}

const products: Product[] = productsFromCatalog.map(toProduct)

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  const normalizedSlug = normalizeSlug(slug)
  return products.find((product) => product.slug === normalizedSlug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.is_best_seller)
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.is_new)
}

export function formatPriceCop(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
