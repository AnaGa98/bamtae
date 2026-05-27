import Image from "next/image"

interface CollectionHeroProps {
  title: string
  description: string
  image: string
  productCount: number
}

export function CollectionHero({ title, description, image, productCount }: CollectionHeroProps) {
  return (
    <section className="relative h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <p className="text-background/80 text-sm tracking-widest uppercase mb-3">
          Collection
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-background tracking-tight text-balance">
          {title}
        </h1>
        <p className="mt-4 text-background/90 text-base sm:text-lg max-w-xl leading-relaxed">
          {description}
        </p>
        <p className="mt-6 text-background/70 text-sm">
          {productCount} Products
        </p>
      </div>
    </section>
  )
}
