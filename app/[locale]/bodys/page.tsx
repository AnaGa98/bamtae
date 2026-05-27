import type { Metadata } from "next"
import { Header } from "@/components/header-i18n"
import { CollectionHero } from "@/components/collection-hero"
import { ProductGrid } from "@/components/product-grid"
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
      title: "Coleccion Bodys | BAMTAE - Bodys Esculturales para Mujer",
      description: "Compra nuestra coleccion de bodys esculturales. Ajustes favorecedores sin costuras, diseñados para la confianza diaria. Calidad premium, estilo elevado.",
      alternates: {
        canonical: '/es/bodys',
        languages: {
          'es': '/es/bodys',
          'en': '/en/bodys',
        },
      },
    }
  }
  
  return {
    title: "Bodys Collection | BAMTAE - Sculpting Bodysuits for Women",
    description: "Shop our curated collection of sculpting bodysuits. Seamless, flattering fits designed for everyday confidence. Premium quality, elevated style.",
    alternates: {
      canonical: '/en/bodys',
      languages: {
        'es': '/es/bodys',
        'en': '/en/bodys',
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
  const dict = getDictionary(locale)

  const heroContent = locale === 'es' 
    ? {
        title: "Bodys",
        description: "Bodys esculturales que se mueven contigo. Construccion sin costuras, ajustes favorecedores y telas premium diseñadas para tu confianza diaria.",
      }
    : {
        title: "Bodys",
        description: "Sculpting bodysuits that move with you. Seamless construction, flattering fits, and premium fabrics designed for everyday confidence.",
      }

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <CollectionHero
          title={heroContent.title}
          description={heroContent.description}
          image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png"
          productCount={12}
        />
        <ProductGrid />
        <Newsletter />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
