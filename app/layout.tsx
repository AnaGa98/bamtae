import type { Metadata, Viewport } from "next"
import { Great_Vibes, Inter, Playfair_Display } from "next/font/google"
import { headers } from "next/headers"
import { Analytics } from "@vercel/analytics/next"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartProvider } from "@/lib/cart-context"
import { JsonLd, getOrganizationJsonLd } from "@/lib/seo/json-ld"
import { SITE_URL } from "@/lib/seo/locale-metadata"
import { defaultLocale, locales, type Locale } from "@/lib/i18n"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BAMTAE",
    template: "%s",
  },
  verification: {
    google: "zChZ62TvMHYKl0daxIgn9gDKVUKuUYCt_MxBAmQsfww",
  },
}

export const viewport: Viewport = {
  themeColor: "#F7F3EE",
  width: "device-width",
  initialScale: 1,
}

async function resolveHtmlLang(): Promise<Locale> {
  const headerStore = await headers()
  const fromHeader = headerStore.get("x-bamtae-locale")
  if (fromHeader && locales.includes(fromHeader as Locale)) {
    return fromHeader as Locale
  }
  return defaultLocale
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lang = await resolveHtmlLang()

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-sans antialiased`}
      >
        <JsonLd id="organization-jsonld" data={getOrganizationJsonLd()} />
        <CartProvider>
          {children}
        </CartProvider>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
