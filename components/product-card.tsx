import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  badge?: "Best Seller" | "New"
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
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs tracking-wide rounded-full ${
            badge === "Best Seller" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
          }`}>
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full rounded-full" size="sm">
            Quick Add
          </Button>
        </div>
      </Link>
      <div className="space-y-2">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground">${price.toFixed(2)}</p>
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-5 h-5 rounded-full border-2 border-border hover:border-primary transition-colors"
              style={{ backgroundColor: color }}
              aria-label={`Color option ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
