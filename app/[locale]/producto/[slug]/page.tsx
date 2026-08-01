import { notFound } from "next/navigation"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { ProductoDetalle } from "@/components/producto-detalle"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { getAllProductSlugs, getProductBySlug } from "@/lib/products"
import { getPrimaryProductImage, getProductImages } from "@/lib/product-images"
import { JsonLd, getProductJsonLd } from "@/lib/seo/json-ld"
import {
  buildPageAlternates,
  openGraphLocale,
} from "@/lib/seo/locale-metadata"

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: locale === "en" ? "Product not found | BAMTAE" : "Producto no encontrado | BAMTAE",
    }
  }

  const title = `${product.name} | BAMTAE`
  const description = product.description

  return {
    title,
    description,
    alternates: buildPageAlternates(locale, `/producto/${slug}`),
    openGraph: {
      title,
      description,
      locale: openGraphLocale(locale),
      type: "website",
      url: `/${locale}/producto/${slug}`,
    },
  }
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = getDictionary(locale)
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const { allImages, imagesByColor } = getProductImages(product)
  const primaryImage = getPrimaryProductImage(product)
  const rating = "rating" in product ? Number(product.rating) : 4.8
  const reviewCount = "reviewCount" in product ? Number(product.reviewCount) : 120

  const productJsonLd = getProductJsonLd({
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    in_stock: product.in_stock,
    rating,
    reviewCount,
    image: allImages.length > 0 ? allImages : primaryImage,
    locale,
  })

  return (
    <>
      <JsonLd id={`product-jsonld-${product.slug}`} data={productJsonLd} />
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen bg-white">
        <ProductoDetalle
          locale={locale}
          product={product}
          images={allImages}
          imagesByColor={imagesByColor}
        />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
