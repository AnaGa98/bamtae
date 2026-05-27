import type { Metadata } from "next"
import catalogoData from "@/lib/catalogo.json"
import { CatalogoPage } from "@/components/catalogo-page"
import { getProductImageMap } from "@/lib/catalogo-page-data"
import { getProductsByCategory } from "@/lib/products"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const description =
    catalogoData.categories.find((category) => category.slug === "conjuntos")?.description ??
    "Coleccion de Conjuntos BAMTAE."

  return {
    title: "Conjuntos | BAMTAE",
    description,
    alternates: {
      canonical: `/${locale}/conjuntos`,
      languages: {
        es: "/es/conjuntos",
        en: "/en/conjuntos",
      },
    },
  }
}

export default async function ConjuntosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const products = getProductsByCategory("conjuntos")
  const productImages = getProductImageMap(products)
  const description =
    catalogoData.categories.find((category) => category.slug === "conjuntos")?.description ??
    "Coleccion de Conjuntos BAMTAE."

  return (
    <CatalogoPage
      locale={locale}
      title="Conjuntos"
      description={description}
      products={products}
      productImages={productImages}
    />
  )
}
