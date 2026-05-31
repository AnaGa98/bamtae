"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"

const PHONE = "573045754727"

function getMessage(pathname: string): string {
  const cleanPath = pathname.replace(/^\/(es|en)/, "")

  if (cleanPath.match(/^\/producto/)) {
    return "Hola BAMTAE, me interesa este body que vi en su tienda. ¿Está disponible? 💚"
  }

  if (cleanPath.match(/^\/(carrito|checkout|pedido)/)) {
    return "Hola BAMTAE, estoy lista para hacer mi compra y necesito ayuda para finalizar el pedido 💚"
  }

  return "Hola BAMTAE ✨ Vi su tienda y me gustaría saber más sobre sus prendas"
}

export function WhatsAppButton() {
  const pathname = usePathname()
  const [showTooltip, setShowTooltip] = useState(false)

  const message = getMessage(pathname)
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-stone-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg transition-opacity duration-200 pointer-events-none ${
          showTooltip ? "opacity-100" : "opacity-0"
        }`}
      >
        Escríbenos por WhatsApp
      </span>

      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

      <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] shadow-lg shadow-green-500/30 transition-transform hover:scale-110 active:scale-95">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7 md:w-8 md:h-8"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998 2.696.001-.003 7.031-1.712a.969.969 0 00-.539-.085z" />
          <path d="M12.004 2a9.996 9.996 0 00-8.716 14.93l-1.178 4.302 4.407-1.155A9.978 9.978 0 0012.004 22a9.996 9.996 0 000-19.998z" />
        </svg>
      </span>
    </a>
  )
}
