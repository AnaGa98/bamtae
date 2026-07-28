"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface HeaderProps {
  dict: Dictionary
  locale: Locale
}

const navLinkClass =
  "relative uppercase text-sm tracking-wide text-[#3D2817] transition-colors hover:text-terracotta after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 hover:after:scale-x-100"

function getPrimaryNavLinks(locale: Locale) {
  const isEn = locale === "en"
  return [
    { label: isEn ? "New In" : "Novedades", href: "novedades" },
    { label: "Bodys", href: "bodys" },
    { label: isEn ? "Sets" : "Conjuntos", href: "conjuntos" },
    { label: isEn ? "Dresses" : "Vestidos", href: "vestidos" },
  ] as const
}

function getSecondaryNavLinks(locale: Locale) {
  const isEn = locale === "en"
  return [
    { label: isEn ? "Best Sellers" : "Mas Vendidos", href: "mas-vendidos" },
    { label: isEn ? "Sale" : "Ofertas", href: "ofertas" },
    { label: isEn ? "About Us" : "Sobre Nosotros", href: "sobre-nosotros" },
    { label: "Blog", href: "blog" },
  ] as const
}

const ANNOUNCEMENT_MESSAGES_ES = [
  { icon: "🚚", text: "Envío gratis en pedidos sobre $500.000" },
  { icon: "💚", text: "Cambios fáciles en 8 días hábiles" },
  { icon: "📍", text: "Diseñado y hecho en Medellín, Colombia" },
  { icon: "💳", text: "Contraentrega disponible en Medellín y Área Metropolitana" },
] as const

const ANNOUNCEMENT_MESSAGES_EN = [
  { icon: "🚚", text: "Free shipping on orders over $500,000 COP" },
  { icon: "💚", text: "Easy exchanges within 8 business days" },
  { icon: "📍", text: "Designed and made in Medellín, Colombia" },
  { icon: "💳", text: "Cash on delivery available in Medellín metro area" },
] as const

export function AnnouncementBar({ locale = "es" }: { locale?: Locale }) {
  const messages =
    locale === "en" ? ANNOUNCEMENT_MESSAGES_EN : ANNOUNCEMENT_MESSAGES_ES
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setVisible(false)
    }, 4000)

    return () => clearInterval(interval)
  }, [paused, index])

  useEffect(() => {
    if (visible) return

    const timeout = setTimeout(() => {
      setIndex((current) => (current + 1) % messages.length)
      setVisible(true)
    }, 400)

    return () => clearTimeout(timeout)
  }, [visible, messages.length])

  const message = messages[index]

  return (
    <div
      className="bg-terracotta text-terracotta-foreground text-center py-2.5 px-4 text-xs tracking-wide"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p
        className={`transition-opacity duration-500 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="mr-1.5" aria-hidden="true">
          {message.icon}
        </span>
        <span>{message.text}</span>
      </p>
    </div>
  )
}

export function Header({ dict, locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const primaryNavLinks = getPrimaryNavLinks(locale)
  const secondaryNavLinks = getSecondaryNavLinks(locale)

  return (
    <>
      <AnnouncementBar locale={locale} />

      <div className="sticky top-0 z-50">
        {/* Barra superior cream */}
        <div className="bg-[#F7F3EE] h-16 border-b border-[#3D2817]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="relative flex items-center justify-between h-full">
              <div className="flex items-center gap-2">
                <button
                  className="lg:hidden p-2 -ml-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={locale === "en" ? "Open menu" : "Abrir menú"}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <Link
                  href={`/${locale}`}
                  className="font-serif text-3xl lg:text-4xl text-[#3D2817] leading-none tracking-tight"
                >
                  Bamtae
                </Link>
              </div>

              <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                {primaryNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}/${link.href}`}
                    className={navLinkClass}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-1 sm:gap-2">
                <LanguageSwitcher currentLocale={locale} />
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior marrón */}
        <div className="bg-[#3D2817] h-10">
          <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto">
            {secondaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}/${link.href}`}
                className="shrink-0 uppercase text-xs tracking-wider text-[#F7F3EE] transition-colors hover:text-mustard whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Menú mobile (nav principal) */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-[#F7F3EE] border-b border-[#3D2817]/10">
            <div className="px-4 py-4 space-y-3">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}/${link.href}`}
                  className="block py-2 text-sm uppercase tracking-wide text-[#3D2817] transition-colors hover:text-terracotta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </>
  )
}
