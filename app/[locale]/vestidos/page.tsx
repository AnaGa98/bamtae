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
    catalogoData.categories.find((category) => category.slug === "vestidos")?.description ??
    "Coleccion de Vestidos BAMTAE."

  return buildCatalogMetadata(locale, "vestidos", {
    es: { title: "Vestidos | BAMTAE", description: esDescription },
    en: {
      title: "Dresses | BAMTAE",
      description:
        "BAMTAE dresses with a flattering silhouette and all-day comfort.",
    },
  })
}

export default async function VestidosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const products = getProductsByCategory("vestidos")
  const productImages = getProductImageMap(products)
  const description =
    catalogoData.categories.find((category) => category.slug === "vestidos")?.description ??
    "Coleccion de Vestidos BAMTAE."

  return (
    <CatalogoPage
      locale={locale}
      title="Vestidos"
      description={description}
      products={products}
      productImages={productImages}
    />
  )
}
