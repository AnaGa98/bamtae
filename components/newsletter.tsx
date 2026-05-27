"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium">
            Unete a la comunidad BAMTAE
          </h2>
          <p className="mt-4 text-primary-foreground/80">
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
              className="flex-1 h-12 rounded-full bg-primary-foreground/10 border-primary-foreground/30 placeholder:text-primary-foreground/50 text-primary-foreground"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="rounded-full px-8 h-12"
            >
              Suscribirse
            </Button>
          </form>

          <p className="mt-4 text-sm text-primary-foreground/60">
            Al suscribirte, aceptas recibir correos de marketing de BAMTAE.
          </p>
        </div>
      </div>
    </section>
  )
}
