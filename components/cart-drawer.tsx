"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Plus, Minus, Trash2, ShoppingBag, Lock, Truck, RotateCcw } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  formatCartPrice,
  FREE_SHIPPING_THRESHOLD,
  useCart,
} from "@/lib/cart-context"
import type { Locale } from "@/lib/i18n"
import type { CartItem } from "@/lib/cart-context"

const WHATSAPP_NUMBER = "573045754727"

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount)
}

function buildWhatsAppCheckoutUrl(items: CartItem[], city: string) {
  if (items.length === 0) return ""

  const productLines = items
    .map(
      (item) =>
        `• ${item.name} - ${item.color} (${formatCOP(item.price)}) x${item.quantity}`
    )
    .join("\n")

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingLine = isFreeShipping ? "🚚 Envío: ¡Gratis!" : "🚚 Envío: Por confirmar"
  const cityLine = city.trim() ? `📍 Ciudad: ${city.trim()}\n` : ""

  const message = `Hola BAMTAE 💚 Quiero hacer este pedido:

🛍️ Mi pedido:
${productLines}

${cityLine}📦 Subtotal: ${formatCOP(subtotal)}
${shippingLine}
💰 Total: ${formatCOP(subtotal)}

¿Me ayudan a finalizar la compra?`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const recommendedProducts = [
  {
    id: "r1",
    name: "Twist Front Mesh Body",
    price: 74,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
  },
  {
    id: "r2",
    name: "Halter Cut-Out Body",
    price: 82,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ONt1UYQRwsTPDfGaXza53BV74O0BgM.png",
  },
]

export function CartDrawer() {
  const params = useParams()
  const locale = (params.locale as Locale) || "es"

  const {
    items: cartItems,
    itemCount,
    subtotal,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
  } = useCart()

  const [city, setCity] = useState("")

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return
    const url = buildWhatsAppCheckoutUrl(cartItems, city)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  const texts = {
    yourBag: "Tu Carrito",
    emptyBag: "Tu carrito está vacío",
    emptySubtext: "Descubre nuestros esenciales diseñados para ajustarse perfectamente a ti.",
    shopNow: "Comprar Ahora",
    awayFromFree: "Te faltan",
    forFreeShipping: "para envío gratis",
    unlockedFreeShipping: "¡Has desbloqueado envío gratis!",
    completeYourLook: "Completa Tu Look",
    quickAdd: "Agregar",
    subtotal: "Subtotal",
    secureOrder: "Pedido seguro",
    contactMessage: "Te contactaremos para confirmar tu compra",
    secure: "Seguro",
    returns: "Devoluciones",
    fastShipping: "Envío Rápido",
    finishOrder: "Finalizar pedido por WhatsApp",
    continueShopping: "Seguir Comprando",
    shopPath: `/${locale}/bodys`,
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 relative">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-serif text-xl tracking-wide">
            {texts.yourBag} ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <p className="text-lg font-serif text-foreground mb-2">{texts.emptyBag}</p>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              {texts.emptySubtext}
            </p>
            <SheetClose asChild>
              <Button asChild className="rounded-full px-8">
                <Link href={texts.shopPath}>{texts.shopNow}</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 bg-secondary/30">
              {amountToFreeShipping > 0 ? (
                <>
                  <p className="text-sm text-foreground mb-2">
                    {texts.awayFromFree}{" "}
                    <span className="font-semibold">{formatCartPrice(amountToFreeShipping)}</span>{" "}
                    {texts.forFreeShipping}
                  </p>
                  <Progress value={freeShippingProgress} className="h-1.5 bg-border" />
                </>
              ) : (
                <p className="text-sm text-foreground flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>{texts.unlockedFreeShipping}</span>
                </p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.color}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-1">
                        {formatCartPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Separator className="mb-6" />
                <h4 className="font-serif text-base mb-4">{texts.completeYourLook}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="group">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button className="absolute bottom-2 left-2 right-2 bg-background/95 backdrop-blur-sm text-foreground text-xs font-medium py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          {texts.quickAdd}
                        </button>
                      </div>
                      <p className="text-xs text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCartPrice(product.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border px-6 py-6 bg-background">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-foreground">{texts.subtotal}</span>
                <span className="text-base font-semibold text-foreground">
                  {formatCartPrice(subtotal)}
                </span>
              </div>

              <div className="bg-[#F7F3EE] rounded-lg p-3 mb-4">
                <p className="text-xs text-[#6B4F47] text-center mb-2 font-medium">
                  {texts.secureOrder}
                </p>
                <p className="text-xs text-[#B8A89C] text-center">{texts.contactMessage}</p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" /> {texts.secure}
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> {texts.returns}
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> {texts.fastShipping}
                </span>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-stone-700 mb-2">
                  Ciudad de envío (opcional)
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej: Medellín, Bogotá, Cali..."
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#3D2817] focus:border-transparent text-sm"
                />
              </div>

              <Button
                type="button"
                disabled={cartItems.length === 0}
                onClick={handleWhatsAppCheckout}
                className="w-full rounded-full h-12 text-sm tracking-wide mb-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white"
              >
                <WhatsAppIcon />
                {texts.finishOrder}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="w-full rounded-full h-10 text-sm">
                  {texts.continueShopping}
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
