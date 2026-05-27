"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart-drawer"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Dictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"

interface HeaderProps {
  dict: Dictionary
  locale: Locale
}

export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 text-sm tracking-wide">
      <p>{text}</p>
    </div>
  )
}

export function Header({ dict, locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: dict.nav.newIn, href: `/${locale}/new-in` },
    { label: dict.nav.bodys, href: `/${locale}/bodys` },
    { label: dict.nav.sets, href: `/${locale}/sets` },
    { label: dict.nav.leggings, href: `/${locale}/leggings` },
    { label: dict.nav.bestSellers, href: `/${locale}/best-sellers` },
    { label: dict.nav.sale, href: `/${locale}/sale` },
  ]

  return (
    <>
      <AnnouncementBar text={dict.announcement.text} />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sophisticated%20Logo%20for%20Women%27s%20Brand%20%27bamtae%27%202-jZzQj4boJB03EYzzWjmH8IyfKgMd9C.png"
                alt="BAMTAE"
                width={120}
                height={60}
                className="h-10 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <Search className="w-5 h-5" />
                <span className="sr-only">{dict.nav.search}</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <User className="w-5 h-5" />
                <span className="sr-only">{dict.nav.account}</span>
              </Button>
              <LanguageSwitcher currentLocale={locale} />
              <CartDrawer />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-base tracking-wide text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
