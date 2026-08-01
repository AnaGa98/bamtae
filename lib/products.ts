import catalogoData from "@/lib/catalogo.json"

type Catalogo = typeof catalogoData

export type CatalogCategory = Catalogo["categories"][number]
export type Product = Catalogo["products"][number] & { slug: string }

const productsFromCatalog = catalogoData.products

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

function toProduct(product: Catalogo["products"][number]): Product {
  return {
    ...product,
    slug: normalizeSlug(product.id),
  }
}

const products: Product[] = productsFromCatalog.map(toProduct)

/** Old purchase-name / legacy slugs → current sale-name slug */
const SLUG_ALIASES: Record<string, string> = {
  anastasia: "venus",
  anastacia: "venus",
  "duo-esmeralda": "esmeralda-set",
  "estrella-manga-c": "star",
  mafe: "alma",
  croptop: "nova",
  cloe: "siena",
  sofia: "lia",
  isa: "aura",
  "estrella-manga-l": "galaxy",
  extraple: "curve",
  rosita: "rose",
  elena: "daisy",
  emily: "bloom",
  danna: "nube",
  sindy: "mia",
  "vestido-extraple": "velvet",
  cruzado: "icon",
  susan: "honey",
  "body-de-manga": "soft",
  caido: "flow",
  "blusa-pico": "vibe",
  corazon: "amour",
  jade: "olive",
  "vestido-laura": "luxe",
  "blusita-caida": "air",
  ana: "pure",
  sasha: "diva",
  "sasha-manga-corta": "zafira",
  diva: "zafira",
  "hermoso-k": "elite",
  hermoso: "elite",
  "body-angel": "celeste",
  angel: "celeste",
  pamela: "aria",
  magaly: "aurora",
  deysi: "perla",
  mono: "coquette",
  martina: "naia",
  "body-ck": "essential",
  "body-strapless": "atenea",
  countour: "contour",
  "set-michael": "monaco-set",
  "set-juliana": "eclipse-set",
  costillero: "fit",
  mariposa: "butterfly",
  karina: "glow",
  mav: "sky",
  "conjunto-trio": "queen-set",
  "conjunto-body": "muse-set",
  "body-2-piezas": "harmony-set",
  "conjunto-ck": "urban-set",
  "set-adara": "adara-set",
  "body-celeste-plus": "moon",
  "body-paola-plus": "amelia-plus",
  "body-susana-plus": "selene-plus",
  "body-monica-plus": "majestic-plus",
  "body-calvin-klein": "silhouette",
  "corset-plus": "empress-corset",
}

export function getAllProducts(): Product[] {
  return products
}

/** Includes current slugs plus legacy purchase-name aliases for static routes. */
export function getAllProductSlugs(): string[] {
  const current = products.map((product) => product.slug)
  const aliases = Object.keys(SLUG_ALIASES)
  return [...new Set([...current, ...aliases])]
}

export function getProductBySlug(slug: string): Product | undefined {
  const normalizedSlug = normalizeSlug(slug)
  const resolvedSlug = SLUG_ALIASES[normalizedSlug] ?? normalizedSlug
  return products.find((product) => product.slug === resolvedSlug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.is_best_seller)
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.is_new)
}

export function formatPriceCop(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
