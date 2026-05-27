import type { Metadata } from "next"
import { Header } from "@/components/header-i18n"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductReviews } from "@/components/product-reviews"
import { CompleteTheLook } from "@/components/complete-the-look"
import { RelatedProducts } from "@/components/related-products"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer-i18n"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}): Promise<Metadata> {
  const { locale } = await params
  
  if (locale === 'es') {
    return {
      title: "Body Off-Shoulder con Fruncido | BAMTAE",
      description: "Nuestro body off-shoulder con fruncido diseñado para esculpir y favorecer. Mangas de malla premium con ajuste escultor para un look diario elevado.",
      alternates: {
        canonical: '/es/product',
        languages: {
          'es': '/es/product',
          'en': '/en/product',
        },
      },
    }
  }
  
  return {
    title: "Off-Shoulder Ruched Body | BAMTAE",
    description: "Our signature off-shoulder ruched bodysuit designed to sculpt and flatter. Premium mesh sleeves with body-contouring fit for an elevated everyday look.",
    alternates: {
      canonical: '/en/product',
      languages: {
        'es': '/es/product',
        'en': '/en/product',
      },
    },
  }
}

const productImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7fSmmrR7ahwEl2TJ2fIsP9QmaFFN4K.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
]

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  const productName = locale === 'es' 
    ? "Body Off-Shoulder con Fruncido" 
    : "Off-Shoulder Ruched Body"

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="bg-white">
        {/* Product Section */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
              <ProductGallery
                images={productImages}
                productName={productName}
              />
              <ProductInfo />
            </div>
          </div>
        </section>

        {/* Reviews */}
        <ProductReviews />

        {/* Complete the Look */}
        <CompleteTheLook />

        {/* Related Products */}
        <RelatedProducts />

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
