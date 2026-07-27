"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { formatPriceCop } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number | null
  image: string
  hoverImage?: string
  colors: string[]
  badge?: "Mas Vendido" | "Nuevo"
  href?: string
}

function getSecondaryImageSrc(primaryImage: string): string | null {
  if (!primaryImage.startsWith("/products/")) {
    return null
  }

  const match = primaryImage.match(/^(.*-)(1)(\.(jpg|jpeg|png|webp))$/i)
  if (!match) {
    return null
  }

  return `${match[1]}2${match[3]}`
}

function capitalizeColor(color: string): string {
  return color
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  colors,
  badge,
  href = "#",
}: ProductCardProps) {
  const [showSecond, setShowSecond] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [secondaryAvailable, setSecondaryAvailable] = useState(true)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { addItem, setIsOpen } = useCart()

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0
  const hasDiscount = discountPercent > 0

  const secondaryImage = useMemo(
    () => hoverImage ?? getSecondaryImageSrc(image),
    [hoverImage, image]
  )

  const hasSecondary = Boolean(secondaryImage && secondaryAvailable)
  const showSecondary = hasSecondary && (isHovered || showSecond)

  const handleImageTap = (event: React.MouseEvent) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (hasSecondary) {
      setShowSecond((current) => !current)
    }
  }

  const addToCart = (color: string) => {
    addItem({
      productId: id,
      name,
      color,
      price,
      image,
    })
    setShowColorPicker(false)
    setIsOpen(true)
  }

  const handleQuickAdd = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (colors.length === 1) {
      addToCart(colors[0])
      return
    }

    if (colors.length > 1) {
      setShowColorPicker(true)
    }
  }

  const handleColorSelect = (color: string) => {
    addToCart(color)
  }

  const imageTransitionClass =
    "absolute inset-0 object-cover transition-opacity duration-300 ease-in-out"

  return (
    <div className="group relative">
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card mb-4 cursor-pointer md:cursor-default"
        onClick={handleImageTap}
        onMouseEnter={() => {
          setIsHovered(true)
          setShowSecond(false)
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image}
          alt={name}
          fill
          loading="lazy"
          className={`${imageTransitionClass} ${showSecondary ? "opacity-0" : "opacity-100"}`}
        />

        {secondaryImage && secondaryAvailable && (
          <Image
            src={secondaryImage}
            alt={`${name} - vista alternativa`}
            fill
            loading="lazy"
            className={`${imageTransitionClass} ${showSecondary ? "opacity-100" : "opacity-0"}`}
            onError={() => setSecondaryAvailable(false)}
          />
        )}

        {badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs tracking-wide uppercase rounded-full ${
              badge === "Mas Vendido"
                ? "bg-terracotta text-terracotta-foreground"
                : "bg-mustard text-mustard-foreground"
            }`}
          >
            {badge === "Mas Vendido" ? "Más vendido" : "Nuevo"}
          </span>
        )}

        {hasDiscount && (
          <span className="absolute top-3 right-3 z-10 px-2.5 py-1 text-xs tracking-wide font-medium rounded-full bg-wine text-wine-foreground">
            -{discountPercent}%
          </span>
        )}

        {showColorPicker && (
          <div className="absolute inset-x-2 bottom-2 bg-white border border-stone-200 rounded-lg shadow-lg p-3 z-20">
            <p className="text-xs text-stone-600 mb-2 text-center">Elige un color:</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    handleColorSelect(color)
                  }}
                  className="px-2.5 py-1 text-xs border border-stone-300 rounded hover:border-[#3D2817] hover:bg-stone-50"
                >
                  {capitalizeColor(color)}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setShowColorPicker(false)
              }}
              className="text-xs text-stone-400 mt-2 w-full text-center"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Link href={href} className="block">
          <h3 className="font-medium text-foreground group-hover:text-terracotta transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <p className={hasDiscount ? "text-wine font-medium" : "text-muted-foreground"}>
              ${formatPriceCop(price)}
            </p>
            {hasDiscount && originalPrice && (
              <p className="text-sm text-stone-400 line-through">
                ${formatPriceCop(originalPrice)}
              </p>
            )}
          </div>
        </Link>
        <p className="text-xs text-muted-foreground">{colors.join(" · ")}</p>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Link
            href={href}
            className="text-center py-2.5 text-xs uppercase tracking-wider border border-cacao text-cacao rounded transition-colors hover:border-terracotta hover:bg-terracotta/10 hover:text-terracotta"
          >
            <span className="sm:hidden">Ver</span>
            <span className="hidden sm:inline">Ver producto</span>
          </Link>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex items-center justify-center gap-1.5 py-2.5 text-xs uppercase tracking-wider bg-terracotta text-terracotta-foreground rounded hover:bg-[#a84528] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
