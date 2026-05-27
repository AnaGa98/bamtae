import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { CatalogoGrid } from "@/components/catalogo-grid"
import { getDictionary } from "@/lib/dictionaries"
import { Locale } from "@/lib/i18n"
import { Product } from "@/lib/products"

interface CatalogoPageProps {
  locale: Locale
  title: string
  description: string
  products: Product[]
  productImages: Record<string, string>
}

export function CatalogoPage({
  locale,
  title,
  description,
  products,
  productImages,
}: CatalogoPageProps) {
  const dict = getDictionary(locale)

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <section className="bg-[#F7F3EE] border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground">{title}</h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">{description}</p>
          </div>
        </section>
        <CatalogoGrid locale={locale} products={products} productImages={productImages} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
