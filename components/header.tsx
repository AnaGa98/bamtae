"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart-drawer"

const navLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Bodys", href: "/bodys" },
  { label: "Activewear", href: "/activewear" },
  { label: "Sets", href: "/sets" },
  { label: "Leggings", href: "/leggings" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Sale", href: "/sale" },
]

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 text-sm tracking-wide">
      <p>Free Shipping on Orders Over $150 | New Arrivals Just Dropped</p>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <AnnouncementBar />
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
            <Link href="/" className="flex-shrink-0">
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
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <User className="w-5 h-5" />
                <span className="sr-only">Account</span>
              </Button>
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
