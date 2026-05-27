import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

const socialImages = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png", alt: "BAMTAE customer style" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BrZCZQdFnnzUdEhPGXx3X663IRiAFs.png", alt: "BAMTAE activewear" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TZZscSspYMSrzQbRQKxjqIAHHvH9BG.png", alt: "BAMTAE lifestyle" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MH7XIhsnkuh3TtXEmp7TDCnOsOoPGz.png", alt: "BAMTAE look" },
]

export function Social() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Join the Community
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tag us @bamtae to be featured
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {socialImages.map((image, index) => (
            <Link
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
