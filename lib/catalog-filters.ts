import type { Product } from "@/lib/products"

export type SortOption = "novedades" | "precio-menor" | "precio-mayor"

export type PriceRangeId = "0-50000" | "50001-80000" | "80001+"

export type CatalogFilters = {
  colors: string[]
  prices: PriceRangeId[]
  sortBy: SortOption
}

export const PRICE_RANGES: {
  id: PriceRangeId
  label: string
  min: number
  max: number
}[] = [
  { id: "0-50000", label: "Hasta $50.000", min: 0, max: 50000 },
  { id: "50001-80000", label: "$50.001 a $80.000", min: 50001, max: 80000 },
  { id: "80001+", label: "Mayor a $80.000", min: 80001, max: Number.POSITIVE_INFINITY },
]

export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  colors: [],
  prices: [],
  sortBy: "novedades",
}

/** Effective sell price — treats missing/invalid as 0. */
export function getProductPrice(product: Product): number {
  const raw = Number(product.price)
  if (!Number.isFinite(raw) || raw < 0) return 0
  return Math.round(raw)
}

export function productHasListedPrice(product: Product): boolean {
  return getProductPrice(product) > 0
}

export function toPriceRangeId(price: number): PriceRangeId | null {
  if (!Number.isFinite(price) || price < 0) return null
  for (const range of PRICE_RANGES) {
    if (price >= range.min && price <= range.max) return range.id
  }
  return null
}

export function productInPriceRanges(
  product: Product,
  selectedPrices: PriceRangeId[]
): boolean {
  if (selectedPrices.length === 0) return true

  const price = getProductPrice(product)
  // Products without a real price should not match price filters
  if (price <= 0) return false

  return selectedPrices.some((id) => {
    const range = PRICE_RANGES.find((r) => r.id === id)
    if (!range) return false
    return price >= range.min && price <= range.max
  })
}

export type PriceFilterOption = {
  id: PriceRangeId
  label: string
  count: number
}

/** Price ranges with counts for the current product list (only listed prices). */
export function getAvailablePriceOptions(products: Product[]): PriceFilterOption[] {
  const counts: Record<PriceRangeId, number> = {
    "0-50000": 0,
    "50001-80000": 0,
    "80001+": 0,
  }

  for (const product of products) {
    const price = getProductPrice(product)
    if (price <= 0) continue
    const id = toPriceRangeId(price)
    if (id) counts[id] += 1
  }

  return PRICE_RANGES.map((range) => ({
    id: range.id,
    label: range.label,
    count: counts[range.id],
  }))
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products]
  sorted.sort((a, b) => {
    const priceA = getProductPrice(a)
    const priceB = getProductPrice(b)

    if (sortBy === "precio-menor" || sortBy === "precio-mayor") {
      const aListed = priceA > 0
      const bListed = priceB > 0
      // Unpriced products always sink to the bottom
      if (aListed !== bListed) return aListed ? -1 : 1
      if (sortBy === "precio-menor") return priceA - priceB
      return priceB - priceA
    }

    if (a.is_new === b.is_new) return a.name.localeCompare(b.name, "es")
    return a.is_new ? -1 : 1
  })
  return sorted
}

export function filterAndSortProducts(
  products: Product[],
  filters: CatalogFilters
): Product[] {
  const filtered = products.filter((product) =>
    productInPriceRanges(product, filters.prices)
  )
  return sortProducts(filtered, filters.sortBy)
}

export function toggleFilterValue<T extends string>(selected: T[], value: T): T[] {
  return selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value]
}

export function hasActiveCatalogFilters(filters: CatalogFilters): boolean {
  return filters.prices.length > 0
}
