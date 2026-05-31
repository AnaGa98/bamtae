"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatPriceCop } from "@/lib/products"

interface ProductCardProps {
  id: string
  name: string
  price: number
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

export function ProductCard({
  name,
  price,
  image,
  hoverImage,
  colors,
  badge,
  href = "#",
}: ProductCardProps) {
  const [showSecond, setShowSecond] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [secondaryAvailable, setSecondaryAvailable] = useState(true)

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

  const imageTransitionClass = "absolute inset-0 object-cover transition-opacity duration-300 ease-in-out"

  return (
    <div className="group">
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
            className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs tracking-wide rounded-full ${
              badge === "Mas Vendido"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none md:pointer-events-auto">
          <Button asChild className="w-full rounded-full pointer-events-auto" size="sm">
            <Link href={href}>Ver producto</Link>
          </Button>
        </div>
      </div>

      <Link href={href} className="block space-y-2">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground">${formatPriceCop(price)}</p>
      </Link>
      <p className="text-xs text-muted-foreground mt-2">{colors.join(" · ")}</p>
    </div>
  )
}
