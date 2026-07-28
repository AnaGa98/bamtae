import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface FooterProps {
  dict: Dictionary
  locale: Locale
}

export function Footer({ dict, locale }: FooterProps) {
  const shopLinks = [
    { label: "Novedades", href: `/${locale}/novedades` },
    { label: "Bodys", href: `/${locale}/bodys` },
    { label: "Conjuntos", href: `/${locale}/conjuntos` },
    { label: "Vestidos", href: `/${locale}/vestidos` },
    { label: "Mas Vendidos", href: `/${locale}/mas-vendidos` },
  ]

  const helpLinks = [
    { label: dict.footer.help.faq, href: `/${locale}/faq` },
  ]

  const aboutLinks = [
    { label: dict.footer.about.ourStory, href: `/${locale}/sobre-nosotros` },
    { label: "Blog", href: `/${locale}/blog` },
    { label: dict.footer.about.careers, href: `/${locale}/careers` },
  ]

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sophisticated%20Logo%20for%20Women%27s%20Brand%20%27bamtae%27%202-jZzQj4boJB03EYzzWjmH8IyfKgMd9C.png"
                alt="BAMTAE"
                width={100}
                height={50}
                className="h-12 w-auto invert"
              />
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              {dict.footer.tagline}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/bamtae.98/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {dict.footer.shop.title}
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {dict.footer.help.title}
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {dict.footer.about.title}
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              &copy; {new Date().getFullYear()} BAMTAE. {dict.footer.copyright}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                {dict.footer.privacyPolicy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                {dict.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
