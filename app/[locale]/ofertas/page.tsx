import type { Locale } from "@/lib/i18n"

export default async function OfertasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  await params

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-2xl">
        <p className="text-sm tracking-widest uppercase text-stone-500 mb-4">BAMTAE</p>
        <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6">Ofertas</h1>
        <p className="text-stone-600 text-lg leading-relaxed">
          Próximamente. Estamos preparando algo especial para ti.
        </p>
      </div>
    </div>
  )
}
