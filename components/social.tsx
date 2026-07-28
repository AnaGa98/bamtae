import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { ScrollReveal, REVEAL_STAGGER_MS } from "@/components/scroll-reveal"

const socialImages = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png", alt: "BAMTAE customer style" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BrZCZQdFnnzUdEhPGXx3X663IRiAFs.png", alt: "BAMTAE activewear" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TZZscSspYMSrzQbRQKxjqIAHHvH9BG.png", alt: "BAMTAE lifestyle" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MH7XIhsnkuh3TtXEmp7TDCnOsOoPGz.png", alt: "BAMTAE look" },
]

export function Social() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "linear-gradient(180deg, #F8F4EE 0%, #F3E8DC 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-3">
            Instagram
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cacao">
            Join the Community
          </h2>
          <p className="mt-4 text-cacao/60">
            Tag us @bamtae to be featured
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {socialImages.map((image, index) => (
            <ScrollReveal key={index} delay={index * REVEAL_STAGGER_MS}>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl block ring-1 ring-[#C9A961]/25"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-cacao/0 group-hover:bg-cacao/35 transition-colors flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-mustard opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
