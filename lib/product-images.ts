import "server-only"

import fs from "node:fs"
import path from "node:path"
import { Product } from "@/lib/products"

const VALID_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"])
const PRODUCTS_PUBLIC_DIR = path.join(process.cwd(), "public", "products")
let cachedProductFiles: string[] | null = null

function normalizeValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

function getImageIndex(filename: string): number {
  const match = filename.match(/-(\d+)\.[a-z0-9]+$/i)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

function toPublicPath(filename: string): string {
  return `/products/${filename}`
}

function getProductFiles(): string[] {
  if (cachedProductFiles) {
    return cachedProductFiles
  }

  if (!fs.existsSync(PRODUCTS_PUBLIC_DIR)) {
    cachedProductFiles = []
    return []
  }

  cachedProductFiles = fs
    .readdirSync(PRODUCTS_PUBLIC_DIR)
    .filter((filename) => VALID_IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase()))

  return cachedProductFiles
}

export interface ProductImagesResult {
  allImages: string[]
  imagesByColor: Record<string, string[]>
}

export function getProductImages(product: Product): ProductImagesResult {
  const files = getProductFiles()
  const imagesByColor: Record<string, string[]> = {}
  const productId = normalizeValue(product.id)

  for (const color of product.colors) {
    const normalizedColor = normalizeValue(color)
    const prefix = `${productId}-${normalizedColor}-`
    const images = files
      .filter((filename) => filename.startsWith(prefix))
      .sort((a, b) => getImageIndex(a) - getImageIndex(b))
      .map(toPublicPath)

    imagesByColor[color] = images
  }

  const colorImages = Object.values(imagesByColor).flat()
  const fallbackImages = files
    .filter((filename) => filename.startsWith(`${productId}-`))
    .sort((a, b) => getImageIndex(a) - getImageIndex(b))
    .map(toPublicPath)

  const jsonImages = product.images.filter((image) => image.startsWith("/products/"))
  const allImages = Array.from(new Set([...colorImages, ...fallbackImages, ...jsonImages]))

  return { allImages, imagesByColor }
}

export function getPrimaryProductImage(product: Product): string {
  const { allImages } = getProductImages(product)
  return allImages[0] ?? "/placeholder.svg"
}
