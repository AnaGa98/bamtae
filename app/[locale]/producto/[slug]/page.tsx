import { notFound } from "next/navigation"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { ProductoDetalle } from "@/components/producto-detalle"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { getAllProducts, getProductBySlug } from "@/lib/products"
import { getProductImages } from "@/lib/product-images"

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Producto no encontrado | BAMTAE",
    }
  }

  return {
    title: `${product.name} | BAMTAE`,
    description: product.description,
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

  return (
    <>
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
