import { Header } from "@/components/header-i18n"
import { Hero } from "@/components/hero-i18n"
import { Categories } from "@/components/categories"
import { BestSellers } from "@/components/best-sellers"
import { WhyBamtae } from "@/components/why-bamtae"
import { NewArrivals } from "@/components/new-arrivals"
import { Lifestyle } from "@/components/lifestyle"
import { Reviews } from "@/components/reviews"
import { Social } from "@/components/social"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer-i18n"
import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <main className="min-h-screen">
      <Header dict={dict} locale={locale} />
      <Hero dict={dict} locale={locale} />
      <Categories />
      <BestSellers />
      <WhyBamtae />
      <NewArrivals />
      <Lifestyle />
      <Reviews />
      <Social />
      <Newsletter />
      <Footer dict={dict} locale={locale} />
    </main>
  )
}
