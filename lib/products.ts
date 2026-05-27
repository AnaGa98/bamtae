// Catalogo de productos BAMTAE
export interface ProductColor {
  name: string
  hex: string
  value: string
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  images?: string[]
  colors: ProductColor[]
  badge?: "new" | "bestseller" | "sale" | "low-stock"
  category: "bodys" | "sets" | "conjuntos"
  description?: string
}

// Colores disponibles
export const COLORS = {
  negro: { name: "Negro", hex: "#1E1E1E", value: "negro" },
  blanco: { name: "Blanco", hex: "#FFFFFF", value: "blanco" },
  cafe: { name: "Cafe", hex: "#6B4F43", value: "cafe" },
  amarillo: { name: "Amarillo", hex: "#F5E6A0", value: "amarillo" },
  rojo: { name: "Rojo", hex: "#C41E3A", value: "rojo" },
  azul: { name: "Azul", hex: "#87CEEB", value: "azul" },
  vinotinto: { name: "Vinotinto", hex: "#722F37", value: "vinotinto" },
  lila: { name: "Lila", hex: "#C8A2C8", value: "lila" },
  rosado: { name: "Rosado", hex: "#FFB6C1", value: "rosado" },
}

// Catalogo completo
export const products: Product[] = [
  // 1. Body Venus (Anastasia) - $72.000
  {
    id: "venus",
    name: "Body Venus",
    slug: "body-venus",
    price: 72000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SVGhG53SBGKXr8seo9uA8LrsHQ2ciM.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OMnmQfXz4ImWzuMvCQCpkEaFVShp90.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SVGhG53SBGKXr8seo9uA8LrsHQ2ciM.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OMnmQfXz4ImWzuMvCQCpkEaFVShp90.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2pzSAc4xeavgcPdH1OCLkon29GninJ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0XAyfCIaVh1uw0hZeezmVy1F4sh9x5.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XhDyhNjkVnxCrGx1Jlbr4sfRpJCnmR.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYPI9wg6zKRvr6ow13XMFaONaPhlbR.png",
    ],
    colors: [
      COLORS.amarillo,
      COLORS.cafe,
      COLORS.negro,
      COLORS.blanco,
      COLORS.rojo,
      COLORS.azul,
    ],
    badge: "bestseller",
    category: "bodys",
    description: "Body estilo corset con paneles de mesh, ruffle en escote, broches frontales, cut-outs laterales y espalda abierta con tirantes ajustables.",
  },
  // 2. Body Butterfly (Mariposa) - $68.000
  {
    id: "butterfly",
    name: "Body Butterfly",
    slug: "body-butterfly",
    price: 68000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ieizIl1EHOt6squ6b9bxrb4VR5lncf.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-06NzMcbAe0zfUzhKOzZ7FoEO3juPfV.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ieizIl1EHOt6squ6b9bxrb4VR5lncf.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-06NzMcbAe0zfUzhKOzZ7FoEO3juPfV.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6NgMb4PNq4b1EsO5XB6FmciUWEdomO.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TxCVX6AYcivdzdkkD63oWIZDG5a5w3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.43.15%E2%80%AFAM-Klbv48ZtqkatWlNM3HR1BupxwdWUSn.png",
    ],
    colors: [
      COLORS.negro,
      COLORS.rojo,
    ],
    badge: "new",
    category: "bodys",
    description: "Body con escote halter asimetrico, detalles de mesh transparente y cut-outs laterales sensuales.",
  },
  // 3. Body Glow (Karina) - $63.000
  {
    id: "glow",
    name: "Body Glow",
    slug: "body-glow",
    price: 63000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-19QcbD7KoRru4NWBSjECQAUfDwrIuD.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dgAzJhigktMpYLgpF2iAIZKHEzoful.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-19QcbD7KoRru4NWBSjECQAUfDwrIuD.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dgAzJhigktMpYLgpF2iAIZKHEzoful.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qoUbZ3YXgdDVLMI47SpvUtBsyOhCnJ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ni4a1JIqodohTyjZ2jyYlJAffu0xKe.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ali3utwZ3Y4C7osxW7gbKycrsZOjTv.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FfDkzZtUiIrLN1dprmAXuiSPhcxK80.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cpqFyUalSV1xvoCTVv29IEtAOIOjS5.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vfJc55VLiIS7uni7iN4xdbXnql0YnV.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r683HQ8nfbu1kaLegA7cWDHfCos879.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-88gftsgLouMFXRHaWv4lz2r657Yjh4.png",
    ],
    colors: [
      COLORS.negro,
      COLORS.blanco,
      COLORS.amarillo,
      COLORS.vinotinto,
      COLORS.cafe,
    ],
    badge: "bestseller",
    category: "bodys",
    description: "Body off-shoulder estilo corset con mangas de mesh drapeadas y silueta favorecedora.",
  },
  // 4. Body Diva (Sasha) - $63.000
  {
    id: "diva",
    name: "Body Diva",
    slug: "body-diva",
    price: 63000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8dVouYJJYQ0Kov32ROmIes0D4SpnJI.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p1NqJVI2HIWMUa1YNPc2Gj61dHe828.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8dVouYJJYQ0Kov32ROmIes0D4SpnJI.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p1NqJVI2HIWMUa1YNPc2Gj61dHe828.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1svRYzfCr9SqLmfLs3tR5sK4jqueLx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K6rW4jwXBvaHpkJf8zWb43nZkydygf.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8aRxIQmDnqE5bloud8GIffrhyrPBca.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JCDRLzrr8bufX6O7PV8KwnGrR7C0xa.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qfy7f4Mlt3zG384PlpwmuQ1vCSRxpt.png",
    ],
    colors: [
      COLORS.blanco,
      COLORS.amarillo,
      COLORS.negro,
      COLORS.cafe,
    ],
    badge: "new",
    category: "bodys",
    description: "Body off-shoulder con detalle de twist frontal y cuerpo/mangas de mesh transparente elegante.",
  },
  // 5. Conjunto Moon - $90.000
  {
    id: "moon",
    name: "Conjunto Moon",
    slug: "conjunto-moon",
    price: 90000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.41.06%E2%80%AFAM-Jwgmg8QTxyvrN2uCwu3EGVrxlCrlP1.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.41.34%E2%80%AFAM-TPCUrlCKj3zA1n0R2nAoXv4FtR9kTj.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.41.06%E2%80%AFAM-Jwgmg8QTxyvrN2uCwu3EGVrxlCrlP1.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.41.26%E2%80%AFAM-178rHX6L04Fm1AR0O8Kgzy6z6ZwrZP.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.41.34%E2%80%AFAM-TPCUrlCKj3zA1n0R2nAoXv4FtR9kTj.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-29%20at%208.41.45%E2%80%AFAM-7VQFCQMrwR7JfgqKd1q3XriDONBYYb.png",
    ],
    colors: [
      COLORS.lila,
      COLORS.cafe,
      COLORS.negro,
    ],
    badge: "new",
    category: "sets",
    description: "Conjunto de tank top con borde contraste y joggers comodos. Perfecto para el dia a dia con estilo.",
  },
]

// Funciones de utilidad
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.badge === "bestseller")
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.badge === "new")
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
