import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'BAMTAE | Esenciales Elevados para la Mujer Moderna',
  description: 'Descubre BAMTAE - bodys esculturales premium, ropa deportiva y esenciales diseñados para mujeres que quieren sentirse seguras, esculpidas y elegantes.',
}

export const viewport: Viewport = {
  themeColor: '#F7F3EE',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
