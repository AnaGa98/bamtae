import type { CartItem } from "@/lib/cart-context"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context"

export const WHATSAPP_NUMBER = "573045754727"
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatLinePrice(price: number) {
  return price > 0 ? formatCOP(price) : "precio por confirmar"
}

export function buildWhatsAppCheckoutUrl(items: CartItem[], city: string) {
  if (items.length === 0) return ""

  const productLines = items
    .map(
      (item) =>
        `• ${item.name} - ${item.color} (${formatLinePrice(item.price)}) x${item.quantity}`
    )
    .join("\n")

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const hasUnpriced = items.some((item) => item.price <= 0)
  const isFreeShipping = subtotal > 0 && subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingLine = isFreeShipping ? "🚚 Envío: ¡Gratis!" : "🚚 Envío: Por confirmar"
  const cityLine = city.trim() ? `📍 Ciudad: ${city.trim()}\n` : ""
  const totalLine = hasUnpriced
    ? "💰 Total: por confirmar (hay productos sin precio)"
    : `💰 Total: ${formatCOP(subtotal)}`

  const message = `Hola BAMTAE 💚 Quiero hacer este pedido:

🛍️ Mi pedido:
${productLines}

${cityLine}📦 Subtotal: ${hasUnpriced ? "por confirmar" : formatCOP(subtotal)}
${shippingLine}
${totalLine}

¿Me ayudan a finalizar la compra?`

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
}

export function buildWhatsAppProductInquiryUrl(productName: string, color: string) {
  const message = `Hola, quiero consultar por ${productName} en color ${color || "Único"}.`
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
}
