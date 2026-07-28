import type { Metadata } from "next"
import catalogoData from "@/lib/catalogo.json"
import { CatalogoPage } from "@/components/catalogo-page"
import { getProductImageMap } from "@/lib/catalogo-page-data"
import { getBestSellers } from "@/lib/products"
import type { Locale } from "@/lib/i18n"
import { buildCatalogMetadata } from "@/lib/seo/catalog-metadata"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const esDescription =
    catalogoData.categories.find((category) => category.slug === "mas-vendidos")?.description ??
    "Productos mas vendidos BAMTAE."

  return buildCatalogMetadata(locale, "mas-vendidos", {
    es: { title: "Más Vendidos | BAMTAE", description: esDescription },
    en: {
      title: "Best Sellers | BAMTAE",
      description: "BAMTAE best sellers loved by customers across Colombia.",
    },
  })
}

export default async function MasVendidosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const products = getBestSellers()
  const productImages = getProductImageMap(products)
  const description =
    catalogoData.categories.find((category) => category.slug === "mas-vendidos")?.description ??
    "Productos mas vendidos BAMTAE."

  return (
    <CatalogoPage
      locale={locale}
      title="Mas Vendidos"
      description={description}
      products={products}
      productImages={productImages}
    />
  )
}
