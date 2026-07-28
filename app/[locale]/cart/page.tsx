"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Plus, Minus, Trash2, Lock, Truck, RotateCcw, ChevronRight } from "lucide-react"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getDictionary } from "@/lib/dictionaries"
import {
  formatCartPrice,
  FREE_SHIPPING_THRESHOLD,
  useCart,
} from "@/lib/cart-context"
import { buildWhatsAppCheckoutUrl } from "@/lib/whatsapp-checkout"
import type { Locale } from "@/lib/i18n"

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function CartPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || "es"
  const dict = getDictionary(locale)

  const { items: cartItems, subtotal, updateQuantity, removeItem } = useCart()
  const [city, setCity] = useState("")

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return
    const url = buildWhatsAppCheckoutUrl(cartItems, city)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : null
  const total = subtotal + (shipping ?? 0)
  const progressToFreeShipping = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  const texts = {
    cart: "Carrito",
    home: "Inicio",
    continueShopping: "Seguir Comprando",
    emptyCart: "Tu carrito está vacío",
    startShopping: "Empezar a Comprar",
    addMore: `Te faltan ${formatCartPrice(amountToFreeShipping)} para envío gratis`,
    unlocked: "¡Has desbloqueado envío gratis!",
    orderSummary: "Resumen del Pedido",
    subtotal: "Subtotal",
    shipping: "Envío",
    shippingPending: "A coordinar",
    free: "GRATIS",
    total: "Total",
    checkout: "Finalizar pedido por WhatsApp",
    secureCheckout: "Pedido seguro",
    easyReturns: "Devoluciones en 8 días",
    fastShipping: "Envío coordinado contigo",
    trustMessage: "Te contactaremos para confirmar tu compra",
  }

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <nav className="flex items-center gap-2 text-sm text-[#B8A89C] mb-8">
            <Link href={`/${locale}`} className="hover:text-[#6B4F43]">
              {texts.home}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1E1E1E]">{texts.cart}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
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

              {cartItems.length > 0 && (
                <div className="bg-white p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-[#6B4F43]" />
                    <span className="text-sm">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? texts.unlocked : texts.addMore}
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
                    <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4">
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
                            <h3 className="font-medium text-[#1E1E1E]">{item.name}</h3>
                            <p className="text-sm text-[#B8A89C] mt-0.5">{item.color}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-[#B8A89C] hover:text-[#1E1E1E] transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center border border-[#E5E0D8] rounded">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-[#F7F3EE] transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-[#F7F3EE] transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-[#1E1E1E]">
                              {item.price > 0
                                ? formatCartPrice(item.price * item.quantity)
                                : "Precio por confirmar"}
                            </p>
                            {item.price > 0 && item.quantity > 1 && (
                              <p className="text-xs text-[#B8A89C]">
                                {formatCartPrice(item.price)} c/u
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="lg:w-[380px]">
                <div className="bg-white rounded-lg p-6 sticky top-24">
                  <h2 className="font-semibold text-lg text-[#1E1E1E] mb-4">
                    {texts.orderSummary}
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#B8A89C]">{texts.subtotal}</span>
                      <span className="text-[#1E1E1E]">{formatCartPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8A89C]">{texts.shipping}</span>
                      <span className="text-[#1E1E1E]">
                        {shipping === 0 ? texts.free : texts.shippingPending}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>{texts.total}</span>
                    <span>{formatCartPrice(total)}</span>
                  </div>

                  <div className="bg-[#F7F3EE] rounded-lg p-4 mb-4">
                    <p className="text-sm text-[#6B4F43] text-center font-medium mb-1">
                      {texts.secureCheckout}
                    </p>
                    <p className="text-xs text-[#B8A89C] text-center">{texts.trustMessage}</p>
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
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white"
                    size="lg"
                  >
                    <WhatsAppIcon />
                    {texts.checkout}
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
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
