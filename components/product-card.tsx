import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatPriceCop } from "@/lib/products"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  badge?: "Mas Vendido" | "Nuevo"
  href?: string
}

export function ProductCard({
  id,
  name,
  price,
  image,
  colors,
  badge,
  href = "#",
}: ProductCardProps) {
  return (
    <div className="group">
      <Link href={href} className="block relative aspect-[3/4] overflow-hidden rounded-lg bg-card mb-4">
        <Image
          src={image}
          alt={name}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs tracking-wide rounded-full ${
            badge === "Mas Vendido" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
          }`}>
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full rounded-full" size="sm">
            Ver producto
          </Button>
        </div>
      </Link>
      <div className="space-y-2">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground">${formatPriceCop(price)}</p>
        <p className="text-xs text-muted-foreground">{colors.join(" · ")}</p>
      </div>
    </div>
  )
}
