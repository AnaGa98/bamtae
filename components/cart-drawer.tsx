"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { X, Plus, Minus, Trash2, ShoppingBag, Lock, Truck, RotateCcw } from "lucide-react"
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
import type { Locale } from "@/lib/i18n"

interface CartItem {
  id: string
  name: string
  color: string
  size: string
  price: number
  quantity: number
  image: string
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Off-Shoulder Ruched Body",
    color: "Cream",
    size: "S",
    price: 78,
    quantity: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
  },
  {
    id: "2",
    name: "Mesh Corset Bodysuit",
    color: "Black",
    size: "M",
    price: 85,
    quantity: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
  },
]

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

const FREE_SHIPPING_THRESHOLD = 150

export function CartDrawer() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'es'
  
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isOpen, setIsOpen] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  const texts = locale === 'es' ? {
    yourBag: "Tu Carrito",
    emptyBag: "Tu carrito esta vacio",
    emptySubtext: "Descubre nuestros esenciales disenados para ajustarse perfectamente a ti.",
    shopNow: "Comprar Ahora",
    awayFromFree: "Te faltan",
    forFreeShipping: "para envio gratis",
    unlockedFreeShipping: "Has desbloqueado envio gratis!",
    completeYourLook: "Completa Tu Look",
    quickAdd: "Agregar",
    subtotal: "Subtotal",
    secureOrder: "Pedido seguro",
    contactMessage: "Te contactaremos para confirmar tu compra",
    secure: "Seguro",
    returns: "Devoluciones",
    fastShipping: "Envio Rapido",
    finishOrder: "Finalizar Pedido",
    continueShopping: "Seguir Comprando",
    orderPath: "/es/finalizar-pedido",
    shopPath: "/es/bodys",
  } : {
    yourBag: "Your Bag",
    emptyBag: "Your bag is empty",
    emptySubtext: "Discover our sculpting essentials designed to fit you perfectly.",
    shopNow: "Shop Now",
    awayFromFree: "You're",
    forFreeShipping: "away from free shipping",
    unlockedFreeShipping: "You've unlocked free shipping!",
    completeYourLook: "Complete Your Look",
    quickAdd: "Quick Add",
    subtotal: "Subtotal",
    secureOrder: "Secure order",
    contactMessage: "We will contact you to confirm your purchase",
    secure: "Secure",
    returns: "Returns",
    fastShipping: "Fast Shipping",
    finishOrder: "Complete Order",
    continueShopping: "Continue Shopping",
    orderPath: "/en/complete-order",
    shopPath: "/en/bodys",
  }

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
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
          <span className="sr-only">Cart</span>
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
            {/* Free Shipping Progress */}
            <div className="px-6 py-4 bg-secondary/30">
              {amountToFreeShipping > 0 ? (
                <>
                  <p className="text-sm text-foreground mb-2">
                    {texts.awayFromFree} <span className="font-semibold">${amountToFreeShipping.toFixed(0)}</span> {texts.forFreeShipping}
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

            {/* Cart Items */}
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
                        {item.color} / {item.size}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-1">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* You May Also Like */}
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
                      <p className="text-xs text-muted-foreground">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-6 bg-background">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-foreground">{texts.subtotal}</span>
                <span className="text-base font-semibold text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              
              {/* Trust Signals for Manual Order */}
              <div className="bg-[#F7F3EE] rounded-lg p-3 mb-4">
                <p className="text-xs text-[#6B4F43] text-center mb-2 font-medium">
                  {texts.secureOrder}
                </p>
                <p className="text-xs text-[#B8A89C] text-center">
                  {texts.contactMessage}
                </p>
              </div>

              {/* Trust Signals */}
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

              <Button asChild className="w-full rounded-full h-12 text-sm tracking-wide mb-3">
                <Link href={texts.orderPath}>{texts.finishOrder}</Link>
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
