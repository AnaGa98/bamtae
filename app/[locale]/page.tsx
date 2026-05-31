import { Header } from "@/components/header-i18n"
import { Hero } from "@/components/hero-i18n"
import { Categories } from "@/components/categories"
import { BestSellers } from "@/components/best-sellers"
import { WhyBamtae } from "@/components/why-bamtae"
import { NewArrivals } from "@/components/new-arrivals"
import { TrustBadges } from "@/components/trust-badges"
import { Lifestyle } from "@/components/lifestyle"
import { Reviews } from "@/components/reviews"
import { Social } from "@/components/social"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer-i18n"
import { getDictionary } from "@/lib/dictionaries"
import { toHomeProductCard } from "@/lib/home-products"
import { getNewArrivals } from "@/lib/products"
import type { Locale } from "@/lib/i18n"

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const newArrivals = getNewArrivals()
    .slice(0, 8)
    .map((product) => toHomeProductCard(product, "Nuevo"))

  return (
    <main className="min-h-screen">
      <Header dict={dict} locale={locale} />
      <Hero dict={dict} locale={locale} />
      <TrustBadges />
      <BestSellers locale={locale} />
      <Categories locale={locale} />
      <NewArrivals locale={locale} products={newArrivals} />
      <WhyBamtae />
      <Lifestyle locale={locale} />
      <Reviews />
      <Social />
      <Newsletter />
      <Footer dict={dict} locale={locale} />
    </main>
  )
}
