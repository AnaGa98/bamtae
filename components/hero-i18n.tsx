import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface HeroProps {
  dict: Dictionary
  locale: Locale
}

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7fSmmrR7ahwEl2TJ2fIsP9QmaFFN4K.png"
          alt="BAMTAE premium activewear"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          <span className="inline-block text-sm uppercase tracking-widest text-primary mb-4">
            {dict.hero.tagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6 text-balance">
            {dict.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {dict.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="px-8">
              <Link href={`/${locale}/bodys`}>{dict.hero.shopCollection}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href={`/${locale}/best-sellers`}>{dict.hero.shopBestSellers}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
