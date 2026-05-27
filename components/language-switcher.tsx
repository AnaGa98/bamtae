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
import type { Locale } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  
  // Remove the current locale from pathname to get the base path
  const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
  
  const languages = [
    { code: 'es' as const, label: 'Español', flag: '🇪🇸' },
    { code: 'en' as const, label: 'English', flag: '🇺🇸' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9">
          <Globe className="w-5 h-5" />
          <span className="sr-only">
            {currentLocale === 'es' ? 'Cambiar idioma' : 'Change language'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <Link
              href={`/${lang.code}${pathnameWithoutLocale}`}
              className={`flex items-center gap-2 w-full ${
                currentLocale === lang.code ? 'font-semibold bg-accent' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
