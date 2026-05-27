"use client"

import { useMemo, useState } from "react"
import { Product } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

type SortOption = "novedades" | "precio-menor" | "precio-mayor"

interface CatalogoGridProps {
  locale: string
  products: Product[]
  productImages: Record<string, string>
}

function toPriceRange(price: number): "0-50000" | "50001-80000" | "80001+" {
  if (price <= 50000) return "0-50000"
  if (price <= 80000) return "50001-80000"
  return "80001+"
}

export function CatalogoGrid({ locale, products, productImages }: CatalogoGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("novedades")

  const availableSizes = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.sizes))).sort(),
    [products]
  )
  const availableColors = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.colors))).sort(),
    [products]
  )

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchSize =
        selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))
      const matchColor =
        selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color))
      const matchPrice =
        selectedPrices.length === 0 || selectedPrices.includes(toPriceRange(product.price))

      return matchSize && matchColor && matchPrice
    })

    return filtered.sort((a, b) => {
      if (sortBy === "precio-menor") return a.price - b.price
      if (sortBy === "precio-mayor") return b.price - a.price

      if (a.is_new === b.is_new) return a.name.localeCompare(b.name, "es")
      return a.is_new ? -1 : 1
    })
  }, [products, selectedSizes, selectedColors, selectedPrices, sortBy])

  const toggleFilter = (
    value: string,
    selected: string[],
    setter: (nextValues: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value))
      return
    }
    setter([...selected, value])
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredProducts.length}</span> productos
        </p>
        <label className="text-sm flex items-center gap-2">
          Ordenar por:
          <select
            className="border border-border rounded px-3 py-2 bg-background"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <option value="novedades">Novedades</option>
            <option value="precio-menor">Precio menor</option>
            <option value="precio-mayor">Precio mayor</option>
          </select>
        </label>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="border border-border rounded-lg p-4 h-fit">
          <h3 className="font-medium mb-4">Filtros</h3>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium mb-2">Talla</p>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                    className={`px-3 py-1.5 text-sm rounded border ${
                      selectedSizes.includes(size)
                        ? "border-[#8B6F47] bg-[#F7F3EE]"
                        : "border-border hover:border-[#8B6F47]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
                    className={`px-3 py-1.5 text-sm rounded border ${
                      selectedColors.includes(color)
                        ? "border-[#8B6F47] bg-[#F7F3EE]"
                        : "border-border hover:border-[#8B6F47]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Precio</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Hasta $50.000", value: "0-50000" },
                  { label: "$50.001 a $80.000", value: "50001-80000" },
                  { label: "Mayor a $80.000", value: "80001+" },
                ].map((range) => (
                  <label key={range.value} className="text-sm flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(range.value)}
                      onChange={() => toggleFilter(range.value, selectedPrices, setSelectedPrices)}
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={productImages[product.id] ?? "/placeholder.svg"}
              colors={product.colors}
              badge={product.is_best_seller ? "Mas Vendido" : product.is_new ? "Nuevo" : undefined}
              href={`/${locale}/producto/${product.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
