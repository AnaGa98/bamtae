import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Lifestyle() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0479aO6hhL8ZHpq1oEDNwaVIJxjRbi.png"
              alt="BAMTAE lifestyle"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The BAMTAE Feeling
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-medium text-foreground leading-tight text-balance">
              Designed to Move with You. Made to Flatter.
            </h2>
            <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
              Every piece in our collection is thoughtfully crafted to celebrate the 
              female form. From seamless bodys to sculpting leggings, BAMTAE creates 
              essentials that make you feel as good as you look.
            </p>
            <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
              Whether you&apos;re conquering your workout or conquering your day, 
              our premium fabrics move with you — never against you.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-8">
              <Link href="/new-in">Discover the Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
