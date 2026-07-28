"use client"

import { useMemo, useState } from "react"
import { X } from "lucide-react"
import type { Product } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import {
  EMPTY_CATALOG_FILTERS,
  filterAndSortProducts,
  getAvailablePriceOptions,
  toggleFilterValue,
  type CatalogFilters,
  type PriceRangeId,
  type SortOption,
} from "@/lib/catalog-filters"

interface CatalogoGridProps {
  locale: string
  products: Product[]
  productImages: Record<string, string>
}

export function CatalogoGrid({ locale, products, productImages }: CatalogoGridProps) {
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_CATALOG_FILTERS)

  const priceOptions = useMemo(() => getAvailablePriceOptions(products), [products])

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, filters),
    [products, filters]
  )

  const active = filters.prices.length > 0

  const setSortBy = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }

  const togglePrice = (value: PriceRangeId) => {
    setFilters((prev) => ({
      ...prev,
      prices: toggleFilterValue(prev.prices, value),
    }))
  }

  const clearFilters = () => {
    setFilters((prev) => ({ ...EMPTY_CATALOG_FILTERS, sortBy: prev.sortBy }))
  }

  const removePrice = (value: PriceRangeId) => {
    setFilters((prev) => ({
      ...prev,
      prices: prev.prices.filter((p) => p !== value),
    }))
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
        <p className="text-sm text-cacao/65">
          <span className="font-medium text-cacao">{filteredProducts.length}</span>
          {filteredProducts.length === 1 ? " producto" : " productos"}
          {active ? " con estos filtros" : ""}
        </p>
        <label className="text-sm text-cacao flex items-center gap-2">
          Ordenar por:
          <select
            className="border border-[#C9A961]/35 rounded-md px-3 py-2 bg-white/80 text-cacao focus:outline-none focus:ring-2 focus:ring-mustard/40"
            value={filters.sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <option value="novedades">Novedades</option>
            <option value="precio-menor">Precio menor</option>
            <option value="precio-mayor">Precio mayor</option>
          </select>
        </label>
      </div>

      {active && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {filters.prices.map((priceId) => {
            const range = priceOptions.find((r) => r.id === priceId)
            return (
              <button
                key={`chip-price-${priceId}`}
                type="button"
                onClick={() => removePrice(priceId)}
                className="inline-flex items-center gap-1.5 rounded-full border border-cacao/20 bg-[#F7F3EE] px-3 py-1 text-xs text-cacao hover:border-terracotta/40"
              >
                {range?.label ?? priceId}
                <X className="h-3 w-3 opacity-60" />
              </button>
            )
          })}
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs uppercase tracking-wide text-[#AF6D4E] hover:text-terracotta"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="border border-[#C9A961]/25 rounded-xl bg-white/70 p-5 h-fit shadow-[0_8px_24px_rgba(61,40,28,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-medium text-cacao">Filtros</h3>
            {active && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#AF6D4E] hover:text-terracotta"
              >
                Limpiar
              </button>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-cacao mb-3">Precio</p>
            <div className="flex flex-col gap-2.5">
              {priceOptions.map((range) => {
                const checked = filters.prices.includes(range.id)
                const disabled = range.count === 0
                return (
                  <label
                    key={range.id}
                    className={`text-sm flex items-center gap-2.5 ${
                      disabled
                        ? "text-cacao/35 cursor-not-allowed"
                        : "text-cacao/80 cursor-pointer hover:text-cacao"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => togglePrice(range.id)}
                      className="h-4 w-4 rounded border-cacao/30 text-terracotta focus:ring-mustard/40 disabled:opacity-40"
                    />
                    <span className="flex-1">{range.label}</span>
                    <span className="text-xs text-cacao/45">({range.count})</span>
                  </label>
                )
              })}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-cacao/45">
              Los productos sin precio publicado no aparecen al filtrar por rango.
            </p>
          </div>
        </aside>

        <div>
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#C9A961]/40 bg-[#F7F3EE]/60 px-6 py-16 text-center">
              <p className="font-serif text-xl text-cacao mb-2">No hay productos con estos filtros</p>
              <p className="text-sm text-cacao/60 mb-5">Prueba otro rango de precio.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex rounded-md bg-terracotta px-5 py-2.5 text-sm uppercase tracking-wider text-terracotta-foreground hover:bg-[#a84528]"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.compare_at_price}
                  image={productImages[product.id] ?? "/placeholder.svg"}
                  colors={product.colors}
                  badge={
                    product.is_best_seller ? "Mas Vendido" : product.is_new ? "Nuevo" : undefined
                  }
                  rating={"rating" in product ? Number(product.rating) : 4.8}
                  reviewCount={"reviewCount" in product ? Number(product.reviewCount) : 120}
                  href={`/${locale}/producto/${product.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
