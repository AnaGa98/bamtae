import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            New Collection
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground text-balance">
            Elevated Essentials for the Modern Woman
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-lg">
            Designed for women who want to feel confident, sculpted, and effortlessly stylish. 
            Every day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
              <Link href="/new-in">Shop New In</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-foreground/30 hover:bg-foreground/5">
              <Link href="/best-sellers">Explore Best Sellers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
