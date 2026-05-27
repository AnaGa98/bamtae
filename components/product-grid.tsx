"use client"

import { useState } from "react"
import { SlidersHorizontal, Grid2X2, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CollectionProductCard } from "@/components/collection-product-card"
import { SortDropdown } from "@/components/sort-dropdown"
import { FilterSidebar } from "@/components/filter-sidebar"
import { cn } from "@/lib/utils"

const products = [
  {
    id: "1",
    name: "Off-Shoulder Ruched Bodysuit",
    price: 78,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7fSmmrR7ahwEl2TJ2fIsP9QmaFFN4K.png",
    colors: [
      { name: "Cream", hex: "#F5F0E8", value: "cream" },
      { name: "Mocha", hex: "#6B4F43", value: "mocha" },
      { name: "Black", hex: "#1E1E1E", value: "black" },
    ],
    badge: "bestseller" as const,
    href: "/product",
  },
  {
    id: "2",
    name: "Mesh Corset Bodysuit",
    price: 85,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ONt1UYQRwsTPDfGaXza53BV74O0BgM.png",
    colors: [
      { name: "Black", hex: "#1E1E1E", value: "black" },
      { name: "Nude", hex: "#D8B7A4", value: "nude" },
    ],
    badge: "new" as const,
    href: "/product",
  },
  {
    id: "3",
    name: "White Off-Shoulder Body",
    price: 72,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
    colors: [
      { name: "White", hex: "#FFFFFF", value: "white" },
      { name: "Cream", hex: "#F5F0E8", value: "cream" },
    ],
    href: "/product",
  },
  {
    id: "4",
    name: "Halter Cut-Out Bodysuit",
    price: 82,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ONt1UYQRwsTPDfGaXza53BV74O0BgM.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
    colors: [
      { name: "Black", hex: "#1E1E1E", value: "black" },
    ],
    href: "/product",
  },
  {
    id: "5",
    name: "Strapless Mesh Sleeve Body",
    price: 76,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ckpPkv30oqVjPcWhN4u8HYxlKuk19.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
    colors: [
      { name: "Black", hex: "#1E1E1E", value: "black" },
      { name: "Mocha", hex: "#6B4F43", value: "mocha" },
    ],
    badge: "bestseller" as const,
    href: "/product",
  },
  {
    id: "6",
    name: "Twist Front Mesh Body",
    price: 65,
    originalPrice: 85,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ckpPkv30oqVjPcWhN4u8HYxlKuk19.png",
    colors: [
      { name: "Black", hex: "#1E1E1E", value: "black" },
      { name: "Mocha", hex: "#6B4F43", value: "mocha" },
    ],
    badge: "sale" as const,
    href: "/product",
  },
  {
    id: "7",
    name: "Sheer Mesh Long Sleeve Body",
    price: 74,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KGzGTpR0nTXbHM74Alg7PtnWlMwiMD.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png",
    colors: [
      { name: "Yellow", hex: "#F5E6A0", value: "yellow" },
      { name: "White", hex: "#FFFFFF", value: "white" },
      { name: "Black", hex: "#1E1E1E", value: "black" },
    ],
    badge: "new" as const,
    href: "/product",
  },
  {
    id: "8",
    name: "Contrast Trim Bodysuit",
    price: 68,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LvS4sHUtr1sLErQxDvExZu2niGVfcN.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IFtpVrEegkFZ58efUAiIqq8HWQ7ZXY.png",
    colors: [
      { name: "Black/White", hex: "#1E1E1E", value: "black-white" },
    ],
    badge: "low-stock" as const,
    href: "/product",
  },
  {
    id: "9",
    name: "Mocha Off-Shoulder Body",
    price: 78,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7fSmmrR7ahwEl2TJ2fIsP9QmaFFN4K.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
    colors: [
      { name: "Mocha", hex: "#6B4F43", value: "mocha" },
      { name: "Cream", hex: "#F5F0E8", value: "cream" },
    ],
    href: "/product",
  },
  {
    id: "10",
    name: "Ribbed Turtleneck Crop Top",
    price: 58,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ObqqjBgkSyxuFtTNlAlpNCdgg0lvyT.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IFtpVrEegkFZ58efUAiIqq8HWQ7ZXY.png",
    colors: [
      { name: "White", hex: "#FFFFFF", value: "white" },
      { name: "Black", hex: "#1E1E1E", value: "black" },
      { name: "Mocha", hex: "#6B4F43", value: "mocha" },
    ],
    href: "/product",
  },
  {
    id: "11",
    name: "Corset Top Set",
    price: 70,
    originalPrice: 88,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wlI6X4aP1SdeV2QC6EjlxtAA2tPNag.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BrZCZQdFnnzUdEhPGXx3X663IRiAFs.png",
    colors: [
      { name: "White", hex: "#FFFFFF", value: "white" },
      { name: "Cream", hex: "#F5F0E8", value: "cream" },
    ],
    badge: "sale" as const,
    href: "/product",
  },
  {
    id: "12",
    name: "Activewear Tank Bodysuit",
    price: 62,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IFtpVrEegkFZ58efUAiIqq8HWQ7ZXY.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LvS4sHUtr1sLErQxDvExZu2niGVfcN.png",
    colors: [
      { name: "White/Brown", hex: "#F5F0E8", value: "white-brown" },
      { name: "Black", hex: "#1E1E1E", value: "black" },
    ],
    href: "/product",
  },
]

export function ProductGrid() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [gridCols, setGridCols] = useState<2 | 3>(3)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div className="flex items-center gap-4">
          {/* Mobile filter button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* Product count */}
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{products.length}</span> products
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Grid toggle (desktop only) */}
          <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-1">
            <button
              onClick={() => setGridCols(2)}
              className={cn(
                "p-1.5 rounded transition-colors",
                gridCols === 2
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="2 columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={cn(
                "p-1.5 rounded transition-colors",
                gridCols === 3
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="3 columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          <SortDropdown />
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-8 lg:gap-12">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <h2 className="font-medium mb-4">Filters</h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div
            className={cn(
              "grid gap-4 sm:gap-6",
              gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-2 lg:grid-cols-3"
            )}
          >
            {products.map((product) => (
              <CollectionProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Load more */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Load More
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/50 z-50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background z-50 lg:hidden overflow-y-auto">
            <FilterSidebar
              isMobile
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </>
      )}
    </section>
  )
}
