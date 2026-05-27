"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorOption {
  name: string
  hex: string
  value: string
}

interface CollectionProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  colors: ColorOption[]
  badge?: "bestseller" | "new" | "sale" | "low-stock"
  href: string
}

export function CollectionProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  colors,
  badge,
  href,
}: CollectionProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isWishlisted, setIsWishlisted] = useState(false)

  const badgeStyles = {
    bestseller: "bg-primary text-primary-foreground",
    new: "bg-foreground text-background",
    sale: "bg-red-600 text-white",
    "low-stock": "bg-amber-600 text-white",
  }

  const badgeLabels = {
    bestseller: "Best Seller",
    new: "New",
    sale: "Sale",
    "low-stock": "Low Stock",
  }

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <article className="group">
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-accent/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={href} className="absolute inset-0">
          <Image
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            fill
            className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {badge && (
          <div
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 text-xs font-medium tracking-wide uppercase rounded",
              badgeStyles[badge]
            )}
          >
            {badgeLabels[badge]}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && !badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium tracking-wide uppercase rounded bg-red-600 text-white">
            -{discount}%
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm transition-all duration-200",
            isWishlisted
              ? "text-red-500"
              : "text-foreground/60 hover:text-foreground"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("w-4 h-4", isWishlisted && "fill-current")}
          />
        </button>

        {/* Quick add overlay */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button
            className="w-full bg-background text-foreground hover:bg-background/90 font-medium"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-4">
        {/* Color options */}
        <div className="flex items-center gap-1.5 mb-2">
          {colors.slice(0, 5).map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-4 h-4 rounded-full border transition-all",
                selectedColor.value === color.value
                  ? "border-primary ring-1 ring-primary/50"
                  : "border-border/50 hover:border-primary/50"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
          {colors.length > 5 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{colors.length - 5}
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={href}>
          <h3 className="text-sm font-medium text-foreground leading-snug hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-foreground">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
