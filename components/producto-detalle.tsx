"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPriceCop, Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { buildWhatsAppProductInquiryUrl } from "@/lib/whatsapp-checkout"

interface ProductoDetalleProps {
  locale: string
  product: Product
  images: string[]
  imagesByColor: Record<string, string[]>
}

export function ProductoDetalle({
  locale,
  product,
  images,
  imagesByColor,
}: ProductoDetalleProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "")
  const [activeImage, setActiveImage] = useState(0)
  const { addItem, setIsOpen } = useCart()
  const hasListedPrice = product.price > 0
  const inquiryColor = selectedColor || product.colors[0] || "Único"

  const galleryImages = useMemo(() => {
    const colorImages = imagesByColor[selectedColor] ?? []
    return colorImages.length > 0 ? colorImages : images
  }, [images, imagesByColor, selectedColor])

  const hasImages = galleryImages.length > 0

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-xs text-muted-foreground mb-5">
        <Link href={`/${locale}`} className="hover:text-foreground">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href={`/${locale}/${product.category}`} className="hover:text-foreground capitalize">
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
        <div>
          {hasImages ? (
            <div className="grid gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#F7F3EE]">
                <Image
                  src={galleryImages[activeImage] ?? galleryImages[0]}
                  alt={product.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-[3/4] overflow-hidden rounded border ${
                      activeImage === index ? "border-[#8B6F47]" : "border-border"
                    }`}
                    aria-label={`Imagen ${index + 1} de ${product.name}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] rounded-lg bg-gray-300 flex items-center justify-center p-6 text-center">
              <p className="text-lg font-medium text-gray-700">{product.name}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-serif text-3xl text-foreground">{product.name}</h1>
            <p className="mt-3 text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {!hasListedPrice ? (
                <span className="text-lg font-medium text-[#AF6D4E]">Precio por confirmar</span>
              ) : product.compare_at_price && product.compare_at_price > product.price ? (
                <span className="inline-flex items-baseline gap-3">
                  <span className="text-wine">${formatPriceCop(product.price)}</span>
                  <span className="text-lg font-normal text-stone-400 line-through">
                    ${formatPriceCop(product.compare_at_price)}
                  </span>
                  <span className="text-sm font-medium text-wine">
                    -
                    {Math.round(
                      ((product.compare_at_price - product.price) / product.compare_at_price) * 100
                    )}
                    %
                  </span>
                </span>
              ) : (
                `$${formatPriceCop(product.price)}`
              )}
            </p>
          </div>

          <div>
            <p className="text-sm mb-3">
              Color: <span className="font-medium">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => {
                const hasColorPhotos = (imagesByColor[color]?.length ?? 0) > 0
                const isSelected = selectedColor === color

                return (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color)
                      setActiveImage(0)
                    }}
                    className={`px-3 py-2 text-sm rounded border transition-colors ${
                      isSelected
                        ? "border-[#8B6F47] bg-[#F7F3EE] text-foreground"
                        : "border-border hover:border-[#8B6F47]"
                    }`}
                  >
                    {color}
                    {hasColorPhotos ? " *" : ""}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">* Color con fotos disponibles</p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-sm mb-4">
            <span className="font-medium">Talla única</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-500">Se adapta de XS a L</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {hasListedPrice ? (
              <Button
                className="h-12 bg-terracotta hover:bg-[#a84528] text-terracotta-foreground"
                onClick={() => {
                  if (product.colors.length > 1 && !selectedColor) {
                    alert("Por favor selecciona un color")
                    return
                  }

                  const color = inquiryColor
                  const image =
                    galleryImages[activeImage] ??
                    galleryImages[0] ??
                    images[0] ??
                    "/placeholder.svg"

                  addItem({
                    productId: product.id,
                    name: product.name,
                    color,
                    price: product.price,
                    image,
                  })
                  setIsOpen(true)
                }}
              >
                Añadir al carrito
              </Button>
            ) : (
              <Button
                className="h-12 bg-terracotta hover:bg-[#a84528] text-terracotta-foreground"
                asChild
              >
                <a
                  href={buildWhatsAppProductInquiryUrl(product.name, inquiryColor)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Consultar precio
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="h-12 border-cacao text-cacao hover:border-terracotta hover:bg-terracotta/10 hover:text-terracotta"
            >
              <a
                href={buildWhatsAppProductInquiryUrl(product.name, inquiryColor)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
