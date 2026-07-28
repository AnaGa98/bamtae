"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden text-cream">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 70% 40%, #5C4033 0%, transparent 55%), linear-gradient(135deg, #3B2A21 0%, #4A3428 45%, #6B4F43 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-mustard/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-terracotta/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mustard mb-3">
            Comunidad
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-[#F3EEE6]">
            Unete a la comunidad BAMTAE
          </h2>
          <p className="mt-4 text-[#F3EEE6]/80">
            Se la primera en enterarte de novedades, mas vendidos y lanzamientos
            exclusivos. Ademas, recibe 10% de descuento en tu primera compra.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 rounded-full bg-[#F3EEE6]/10 border-[#C9A961]/40 placeholder:text-[#F3EEE6]/50 text-[#F3EEE6]"
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-8 h-12 bg-mustard text-mustard-foreground hover:bg-[#c49235]"
            >
              Suscribirse
            </Button>
          </form>

          <p className="mt-4 text-sm text-[#F3EEE6]/55">
            Al suscribirte, aceptas recibir correos de marketing de BAMTAE.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
