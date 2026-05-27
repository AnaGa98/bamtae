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
    catalogoData.categories.find((category) => category.slug === "vestidos")?.description ??
    "Coleccion de Vestidos BAMTAE."

  return {
    title: "Vestidos | BAMTAE",
    description,
    alternates: {
      canonical: `/${locale}/vestidos`,
      languages: {
        es: "/es/vestidos",
        en: "/en/vestidos",
      },
    },
  }
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
