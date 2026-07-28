"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { locales, type Locale } from "@/lib/i18n"
import { localizedPath, stripLocalePrefix } from "@/lib/seo/locale-metadata"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

const LANGUAGE_LABELS: Record<Locale, { label: string; short: string }> = {
  es: { label: "Español", short: "ES" },
  en: { label: "English", short: "EN" },
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const pathWithoutLocale = stripLocalePrefix(pathname)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9"
          aria-label={
            currentLocale === "es" ? "Cambiar idioma" : "Change language"
          }
        >
          <Globe className="w-5 h-5" />
          <span className="sr-only">
            {LANGUAGE_LABELS[currentLocale].short}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {locales.map((code) => {
          const href = localizedPath(code, pathWithoutLocale)
          const isActive = currentLocale === code
          return (
            <DropdownMenuItem key={code} asChild>
              <Link
                href={href}
                hrefLang={code}
                lang={code}
                className={`flex items-center justify-between w-full ${
                  isActive ? "font-semibold bg-accent" : ""
                }`}
              >
                <span>{LANGUAGE_LABELS[code].label}</span>
                <span className="text-xs text-muted-foreground">
                  {LANGUAGE_LABELS[code].short}
                </span>
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
