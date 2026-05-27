"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronRight, Lock, Truck, MessageCircle, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import type { Locale } from "@/lib/i18n"

interface OrderItem {
  id: string
  name: string
  color: string
  size: string
  price: number
  quantity: number
  image: string
}

const orderItems: OrderItem[] = [
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

export default function FinalizarPedidoPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'es'
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    address: "",
    email: "",
    city: "",
    notes: "",
  })

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const texts = locale === 'es' ? {
    title: "Finalizar Pedido",
    home: "Inicio",
    cart: "Carrito",
    subtitle: "Completa tus datos y te contactaremos para confirmar tu pedido",
    orderSummary: "Resumen del Pedido",
    subtotal: "Subtotal",
    shipping: "Envio",
    toConfirm: "Por confirmar",
    total: "Total estimado",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Tu nombre completo",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "+52 1 55 1234 5678",
    address: "Direccion de envio",
    addressPlaceholder: "Calle, numero, colonia, CP",
    email: "Correo electronico (opcional)",
    emailPlaceholder: "tu@email.com",
    city: "Ciudad (opcional)",
    cityPlaceholder: "Tu ciudad",
    notes: "Notas del pedido (opcional)",
    notesPlaceholder: "Instrucciones especiales, preferencias de entrega, etc.",
    submitButton: "Enviar Pedido",
    secureOrder: "Pedido seguro",
    contactMessage: "Te contactaremos por WhatsApp para confirmar tu compra",
    shippingMessage: "Envio y pago coordinados directamente contigo",
    // Confirmation texts
    confirmTitle: "Tu pedido ha sido recibido",
    confirmSubtitle: "En breve te contactaremos para confirmar los detalles y ayudarte a finalizar tu compra.",
    confirmOrderNumber: "Numero de referencia",
    confirmItems: "Productos solicitados",
    confirmContact: "Te contactaremos al",
    backToStore: "Volver a la Tienda",
    whatsappContact: "Contactar por WhatsApp",
  } : {
    title: "Complete Order",
    home: "Home",
    cart: "Cart",
    subtitle: "Fill in your details and we will contact you to confirm your order",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    toConfirm: "To be confirmed",
    total: "Estimated total",
    fullName: "Full name",
    fullNamePlaceholder: "Your full name",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "+1 555 123 4567",
    address: "Shipping address",
    addressPlaceholder: "Street, number, city, ZIP",
    email: "Email (optional)",
    emailPlaceholder: "you@email.com",
    city: "City (optional)",
    cityPlaceholder: "Your city",
    notes: "Order notes (optional)",
    notesPlaceholder: "Special instructions, delivery preferences, etc.",
    submitButton: "Submit Order",
    secureOrder: "Secure order",
    contactMessage: "We will contact you via WhatsApp to confirm your purchase",
    shippingMessage: "Shipping and payment coordinated directly with you",
    // Confirmation texts
    confirmTitle: "Your order has been received",
    confirmSubtitle: "We will contact you shortly to confirm the details and help you complete your purchase.",
    confirmOrderNumber: "Reference number",
    confirmItems: "Requested products",
    confirmContact: "We will contact you at",
    backToStore: "Back to Store",
    whatsappContact: "Contact via WhatsApp",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    // For now, we just show the confirmation
    setIsSubmitted(true)
  }

  const generateOrderReference = () => {
    return `BT-${Date.now().toString(36).toUpperCase()}`
  }

  const orderReference = generateOrderReference()

  // Confirmation Screen
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#F7F3EE]">
        {/* Header */}
        <header className="bg-white border-b border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center">
            <Link href={`/${locale}`}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sophisticated%20Logo%20for%20Women%27s%20Brand%20%27bamtae%27%202-jZzQj4boJB03EYzzWjmH8IyfKgMd9C.png"
                alt="BAMTAE"
                width={100}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-12 lg:py-20">
          <div className="bg-white rounded-2xl p-8 lg:p-12 text-center shadow-sm">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#6B4F43] rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E] mb-3">
              {texts.confirmTitle}
            </h1>
            <p className="text-[#B8A89C] mb-8 max-w-md mx-auto">
              {texts.confirmSubtitle}
            </p>

            {/* Order Reference */}
            <div className="bg-[#F7F3EE] rounded-lg p-4 mb-8">
              <p className="text-xs text-[#B8A89C] mb-1">{texts.confirmOrderNumber}</p>
              <p className="font-mono text-lg text-[#6B4F43] font-semibold">{orderReference}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-[#F7F3EE] rounded-lg p-4 mb-8">
              <p className="text-xs text-[#B8A89C] mb-1">{texts.confirmContact}</p>
              <p className="text-[#1E1E1E] font-medium">{formData.whatsapp}</p>
            </div>

            {/* Order Summary */}
            <div className="text-left mb-8">
              <h3 className="text-sm font-medium text-[#1E1E1E] mb-4">{texts.confirmItems}</h3>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1E1E1E]">{item.name}</p>
                      <p className="text-xs text-[#B8A89C]">{item.color} / {item.size}</p>
                      <p className="text-xs text-[#B8A89C]">Cant: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-sm">
                <span className="text-[#B8A89C]">{texts.subtotal}</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href={`/${locale}`}>{texts.backToStore}</Link>
              </Button>
              <Button variant="outline" asChild className="w-full" size="lg">
                <a 
                  href={`https://wa.me/521234567890?text=Hola! Acabo de hacer un pedido con referencia ${orderReference}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {texts.whatsappContact}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Order Form Screen
  return (
    <main className="min-h-screen bg-[#F7F3EE]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sophisticated%20Logo%20for%20Women%27s%20Brand%20%27bamtae%27%202-jZzQj4boJB03EYzzWjmH8IyfKgMd9C.png"
              alt="BAMTAE"
              width={100}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2 text-sm text-[#B8A89C]">
            <Lock className="w-4 h-4" />
            <span>{texts.secureOrder}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#B8A89C] mb-8">
          <Link href={`/${locale}`} className="hover:text-[#6B4F43]">
            {texts.home}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/cart`} className="hover:text-[#6B4F43]">
            {texts.cart}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1E1E1E]">{texts.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Form */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-6 lg:p-8">
              <h1 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E] mb-2">
                {texts.title}
              </h1>
              <p className="text-[#B8A89C] mb-8">
                {texts.subtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-[#1E1E1E]">
                    {texts.fullName} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={texts.fullNamePlaceholder}
                    required
                    className="mt-2 h-12 border-[#E5E0D8] focus:border-[#6B4F43] focus:ring-[#6B4F43]"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-[#1E1E1E]">
                    {texts.whatsapp} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder={texts.whatsappPlaceholder}
                    required
                    className="mt-2 h-12 border-[#E5E0D8] focus:border-[#6B4F43] focus:ring-[#6B4F43]"
                  />
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-[#1E1E1E]">
                    {texts.address} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={texts.addressPlaceholder}
                    required
                    className="mt-2 min-h-[80px] border-[#E5E0D8] focus:border-[#6B4F43] focus:ring-[#6B4F43]"
                  />
                </div>

                {/* Email & City Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-[#1E1E1E]">
                      {texts.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={texts.emailPlaceholder}
                      className="mt-2 h-12 border-[#E5E0D8] focus:border-[#6B4F43] focus:ring-[#6B4F43]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-[#1E1E1E]">
                      {texts.city}
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder={texts.cityPlaceholder}
                      className="mt-2 h-12 border-[#E5E0D8] focus:border-[#6B4F43] focus:ring-[#6B4F43]"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-[#1E1E1E]">
                    {texts.notes}
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={texts.notesPlaceholder}
                    className="mt-2 min-h-[100px] border-[#E5E0D8] focus:border-[#6B4F43] focus:ring-[#6B4F43]"
                  />
                </div>

                {/* Trust Messages */}
                <div className="bg-[#F7F3EE] rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-[#6B4F43]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E]">{texts.contactMessage}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-[#6B4F43]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E]">{texts.shippingMessage}</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-base"
                  disabled={!formData.fullName || !formData.whatsapp || !formData.address}
                >
                  {texts.submitButton}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[380px]">
            <div className="bg-white rounded-xl p-6 sticky top-8">
              <h2 className="font-semibold text-lg text-[#1E1E1E] mb-6">
                {texts.orderSummary}
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#F7F3EE] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B4F43] text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#1E1E1E] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#B8A89C] mt-0.5">
                        {item.color} / {item.size}
                      </p>
                      <p className="text-sm font-medium text-[#1E1E1E] mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#B8A89C]">{texts.subtotal}</span>
                  <span className="text-[#1E1E1E]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B8A89C]">{texts.shipping}</span>
                  <span className="text-[#6B4F43] text-xs">{texts.toConfirm}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>{texts.total}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-[#E5E0D8]">
                <div className="flex items-center gap-2 text-xs text-[#B8A89C] mb-2">
                  <Lock className="w-4 h-4" />
                  <span>{texts.secureOrder}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#B8A89C]">
                  <Check className="w-4 h-4" />
                  <span>{texts.contactMessage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
