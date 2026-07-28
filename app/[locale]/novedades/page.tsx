import type { Metadata } from "next"
import catalogoData from "@/lib/catalogo.json"
import { CatalogoPage } from "@/components/catalogo-page"
import { getProductImageMap } from "@/lib/catalogo-page-data"
import { getNewArrivals } from "@/lib/products"
import type { Locale } from "@/lib/i18n"
import { buildCatalogMetadata } from "@/lib/seo/catalog-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const esDescription =
    catalogoData.categories.find((category) => category.slug === "novedades")?.description ??
    "Novedades BAMTAE."

  return buildCatalogMetadata(locale, "novedades", {
    es: { title: "Novedades | BAMTAE", description: esDescription },
    en: {
      title: "New In | BAMTAE",
      description:
        "Discover BAMTAE new arrivals: sculpting bodys and elevated essentials from Medellín.",
    },
  })
}

export default async function NovedadesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const products = getNewArrivals()
  const productImages = getProductImageMap(products)
  const description =
    catalogoData.categories.find((category) => category.slug === "novedades")?.description ??
    "Novedades BAMTAE."

  return (
    <CatalogoPage
      locale={locale}
      title="Novedades"
      description={description}
      products={products}
      productImages={productImages}
    />
  )
}
