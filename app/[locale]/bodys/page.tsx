import type { Metadata } from "next"
import catalogoData from "@/lib/catalogo.json"
import { CatalogoPage } from "@/components/catalogo-page"
import { getProductImageMap } from "@/lib/catalogo-page-data"
import { getProductsByCategory } from "@/lib/products"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}): Promise<Metadata> {
  const { locale } = await params
  const description =
    catalogoData.categories.find((category) => category.slug === "bodys")?.description ??
    "Coleccion de Bodys BAMTAE."

  return {
    title: "Bodys | BAMTAE",
    description,
    alternates: {
      canonical: `/${locale}/bodys`,
      languages: {
        es: "/es/bodys",
        en: "/en/bodys",
      },
    },
  }
}

export default async function BodysPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const products = getProductsByCategory("bodys")
  const productImages = getProductImageMap(products)
  const description =
    catalogoData.categories.find((category) => category.slug === "bodys")?.description ??
    "Coleccion de Bodys BAMTAE."

  return <CatalogoPage locale={locale} title="Bodys" description={description} products={products} productImages={productImages} />
}
