"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_BASE_URL } from "@/lib/whatsapp-checkout"

type CareersFormState = {
  name: string
  machines: string
  phone: string
  city: string
}

const INITIAL: CareersFormState = {
  name: "",
  machines: "",
  phone: "",
  city: "",
}

function buildCareersWhatsAppUrl(data: CareersFormState) {
  const message = `Hola BAMTAE 💚 Quiero trabajar con ustedes.

👤 Nombre: ${data.name.trim()}
🧵 Máquinas que sé usar: ${data.machines.trim()}
📱 Teléfono: ${data.phone.trim()}
📍 Dónde vivo: ${data.city.trim()}

¿Me pueden contar sobre las vacantes?`

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
}

export function CareersForm() {
  const [form, setForm] = useState<CareersFormState>(INITIAL)
  const [error, setError] = useState("")

  const update = (field: keyof CareersFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (error) setError("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !form.name.trim() ||
      !form.machines.trim() ||
      !form.phone.trim() ||
      !form.city.trim()
    ) {
      setError("Por favor completa todos los campos.")
      return
    }

    const url = buildCareersWhatsAppUrl(form)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const fieldClass =
    "w-full px-4 py-3 rounded-lg border border-[#E5D9CC] bg-white text-cacao placeholder:text-cacao/40 focus:outline-none focus:ring-2 focus:ring-[#3D2817]/25 focus:border-[#3D2817]/40 text-sm"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="careers-name" className="block text-sm text-cacao mb-2">
          Nombre
        </label>
        <input
          id="careers-name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          placeholder="Tu nombre completo"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="careers-machines" className="block text-sm text-cacao mb-2">
          ¿Qué máquinas sabes usar?
        </label>
        <textarea
          id="careers-machines"
          rows={3}
          value={form.machines}
          onChange={update("machines")}
          placeholder="Ej: plana, overlock, coverstitch, fileteadora..."
          className={`${fieldClass} resize-y min-h-[96px]`}
        />
      </div>

      <div>
        <label htmlFor="careers-phone" className="block text-sm text-cacao mb-2">
          Número de teléfono
        </label>
        <input
          id="careers-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="Ej: 300 123 4567"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="careers-city" className="block text-sm text-cacao mb-2">
          ¿Dónde vives?
        </label>
        <input
          id="careers-city"
          type="text"
          autoComplete="address-level2"
          value={form.city}
          onChange={update("city")}
          placeholder="Ciudad o barrio"
          className={fieldClass}
        />
      </div>

      {error ? <p className="text-sm text-wine">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full h-12 bg-[#25D366] hover:bg-[#1ebe5b] text-white"
      >
        Enviar por WhatsApp
      </Button>

      <p className="text-xs text-cacao/50 text-center">
        Al enviar se abre WhatsApp con tus datos para hablar con el equipo Bamtae.
      </p>
    </form>
  )
}
