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
    catalogoData.categories.find((category) => category.slug === "blusas")?.description ??
    "Coleccion de Blusas BAMTAE."

  return buildCatalogMetadata(locale, "blusas", {
    es: { title: "Blusas | BAMTAE", description: esDescription },
    en: {
      title: "Tops | BAMTAE",
      description: "BAMTAE tops and elevated everyday pieces.",
    },
  })
}

export default async function BlusasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const products = getProductsByCategory("blusas")
  const productImages = getProductImageMap(products)
  const description =
    catalogoData.categories.find((category) => category.slug === "blusas")?.description ??
    "Coleccion de Blusas BAMTAE."

  return (
    <CatalogoPage
      locale={locale}
      title="Blusas"
      description={description}
      products={products}
      productImages={productImages}
    />
  )
}
