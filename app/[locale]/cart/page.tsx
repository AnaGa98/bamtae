"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Plus, Minus, Trash2, Lock, Truck, RotateCcw, ChevronRight, Heart } from "lucide-react"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface CartItem {
  id: string
  name: string
  color: string
  size: string
  price: number
  originalPrice?: number
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
    quantity: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
  },
]

const recommendedProducts = [
  {
    id: "r1",
    name: "Twist Front Mesh Body",
    price: 74,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
    colors: ["#1E1E1E", "#6B4F43"],
  },
  {
    id: "r2",
    name: "Halter Cut-Out Body",
    price: 82,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ONt1UYQRwsTPDfGaXza53BV74O0BgM.png",
    colors: ["#1E1E1E"],
  },
  {
    id: "r3",
    name: "Strapless Mesh Body",
    price: 76,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ckpPkv30oqVjPcWhN4u8HYxlKuk19.png",
    colors: ["#1E1E1E", "#6B4F43"],
  },
  {
    id: "r4",
    name: "Sheer Mesh Body",
    price: 74,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KGzGTpR0nTXbHM74Alg7PtnWlMwiMD.png",
    colors: ["#F5E6A0", "#FFFFFF", "#1E1E1E"],
  },
]

const FREE_SHIPPING_THRESHOLD = 150

export default function CartPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'es'
  const dict = getDictionary(locale)
  
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12
  const total = subtotal + shipping
  const progressToFreeShipping = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  )
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  const texts = locale === 'es' ? {
    cart: "Carrito",
    home: "Inicio",
    continueShopping: "Seguir Comprando",
    emptyCart: "Tu carrito esta vacio",
    startShopping: "Empezar a Comprar",
    freeShipping: "Envio gratis en pedidos de $150+",
    addMore: `Agrega $${amountToFreeShipping} mas para envio gratis`,
    unlocked: "Envio gratis desbloqueado",
    saveWishlist: "Guardar en favoritos",
    orderSummary: "Resumen del Pedido",
    subtotal: "Subtotal",
    shipping: "Envio",
    free: "GRATIS",
    total: "Total",
    checkout: "Finalizar Pedido",
    secureCheckout: "Pedido seguro",
    easyReturns: "Devoluciones en 30 dias",
    fastShipping: "Envio coordinado contigo",
    alsoLike: "Tambien Te Puede Gustar",
    quickAdd: "Agregar Rapido",
    trustMessage: "Te contactaremos para confirmar tu compra",
    checkoutPath: "/es/finalizar-pedido",
  } : {
    cart: "Cart",
    home: "Home",
    continueShopping: "Continue Shopping",
    emptyCart: "Your cart is empty",
    startShopping: "Start Shopping",
    freeShipping: "Free shipping on orders $150+",
    addMore: `Add $${amountToFreeShipping} more for free shipping`,
    unlocked: "Free shipping unlocked",
    saveWishlist: "Save to Wishlist",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "FREE",
    total: "Total",
    checkout: "Complete Order",
    secureCheckout: "Secure Order",
    easyReturns: "Easy 30-Day Returns",
    fastShipping: "Shipping coordinated with you",
    alsoLike: "You May Also Like",
    quickAdd: "Quick Add",
    trustMessage: "We will contact you to confirm your purchase",
    checkoutPath: "/en/complete-order",
  }

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#B8A89C] mb-8">
            <Link href={`/${locale}`} className="hover:text-[#6B4F43]">
              {texts.home}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1E1E1E]">{texts.cart}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E]">
                  {texts.cart} ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h1>
                <Link
                  href={`/${locale}/bodys`}
                  className="text-sm text-[#6B4F43] hover:underline"
                >
                  {texts.continueShopping}
                </Link>
              </div>

              {/* Free Shipping Progress */}
              {cartItems.length > 0 && (
                <div className="bg-white p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-[#6B4F43]" />
                    <span className="text-sm">
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? texts.unlocked
                        : texts.addMore}
                    </span>
                  </div>
                  <Progress value={progressToFreeShipping} className="h-2" />
                </div>
              )}

              {cartItems.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center">
                  <p className="text-[#B8A89C] mb-6">{texts.emptyCart}</p>
                  <Button asChild>
                    <Link href={`/${locale}/bodys`}>{texts.startShopping}</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 flex gap-4"
                    >
                      <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-[#1E1E1E]">
                              {item.name}
                            </h3>
                            <p className="text-sm text-[#B8A89C] mt-0.5">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#B8A89C] hover:text-[#1E1E1E] transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center border border-[#E5E0D8] rounded">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-[#F7F3EE] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-[#F7F3EE] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-[#1E1E1E]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-[#B8A89C]">
                                ${item.price} c/u
                              </p>
                            )}
                          </div>
                        </div>

                        <button className="mt-3 flex items-center gap-1 text-xs text-[#B8A89C] hover:text-[#6B4F43]">
                          <Heart className="w-3 h-3" />
                          {texts.saveWishlist}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:w-[380px]">
                <div className="bg-white rounded-lg p-6 sticky top-24">
                  <h2 className="font-semibold text-lg text-[#1E1E1E] mb-4">
                    {texts.orderSummary}
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#B8A89C]">{texts.subtotal}</span>
                      <span className="text-[#1E1E1E]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8A89C]">{texts.shipping}</span>
                      <span className="text-[#1E1E1E]">
                        {shipping === 0 ? texts.free : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>{texts.total}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Trust Message */}
                  <div className="bg-[#F7F3EE] rounded-lg p-4 mb-4">
                    <p className="text-sm text-[#6B4F43] text-center font-medium mb-1">
                      {texts.secureCheckout}
                    </p>
                    <p className="text-xs text-[#B8A89C] text-center">
                      {texts.trustMessage}
                    </p>
                  </div>

                  <Button asChild className="w-full" size="lg">
                    <Link href={texts.checkoutPath}>{texts.checkout}</Link>
                  </Button>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#B8A89C]">
                      <Lock className="w-4 h-4" />
                      <span>{texts.secureCheckout}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#B8A89C]">
                      <RotateCcw className="w-4 h-4" />
                      <span>{texts.easyReturns}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#B8A89C]">
                      <Truck className="w-4 h-4" />
                      <span>{texts.fastShipping}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {cartItems.length > 0 && (
            <section className="mt-16">
              <h2 className="font-serif text-xl lg:text-2xl text-[#1E1E1E] mb-6">
                {texts.alsoLike}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-[3/4] bg-[#F7F3EE] rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-top"
                      />
                      <button className="absolute inset-x-0 bottom-0 bg-white/90 py-2.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {texts.quickAdd}
                      </button>
                    </div>
                    <h3 className="text-sm text-[#1E1E1E] mb-1">{product.name}</h3>
                    <p className="font-semibold text-sm">${product.price}</p>
                    <div className="flex gap-1 mt-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className="w-3 h-3 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
