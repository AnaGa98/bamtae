import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Bodys",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
    href: "/bodys",
  },
  {
    name: "Activewear",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IFtpVrEegkFZ58efUAiIqq8HWQ7ZXY.png",
    href: "/activewear",
  },
  {
    name: "Matching Sets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wlI6X4aP1SdeV2QC6EjlxtAA2tPNag.png",
    href: "/sets",
  },
  {
    name: "Dresses",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5EWAoLGQtly0mII5QnUtbhZzCg4rs1.png",
    href: "/dresses",
  },
  {
    name: "Best Sellers",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
    href: "/best-sellers",
  },
]

export function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground">
            Shop by Category
          </h2>
          <p className="mt-4 text-muted-foreground">
            Find your perfect fit
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="font-serif text-lg lg:text-xl text-white font-medium">
                  {category.name}
                </h3>
                <span className="mt-1 inline-block text-sm text-white/80 group-hover:underline">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
