import type { Metadata } from "next"
import catalogoData from "@/lib/catalogo.json"
import { CatalogoPage } from "@/components/catalogo-page"
import { getProductImageMap } from "@/lib/catalogo-page-data"
import { getProductsByCategory } from "@/lib/products"
import type { Locale } from "@/lib/i18n"
import { buildCatalogMetadata } from "@/lib/seo/catalog-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const esDescription =
    catalogoData.categories.find((category) => category.slug === "conjuntos")?.description ??
    "Coleccion de Conjuntos BAMTAE."

  return buildCatalogMetadata(locale, "conjuntos", {
    es: { title: "Conjuntos | BAMTAE", description: esDescription },
    en: {
      title: "Matching Sets | BAMTAE",
      description: "BAMTAE matching sets for a complete, polished look.",
    },
  })
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
