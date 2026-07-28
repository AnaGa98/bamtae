import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale, type Locale } from "@/lib/i18n"

function getPathLocale(pathname: string): Locale | null {
  const segment = pathname.split("/")[1]
  return locales.includes(segment as Locale) ? (segment as Locale) : null
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const localeInPath = getPathLocale(pathname)

  if (localeInPath) {
    const response = NextResponse.next()
    response.headers.set("x-bamtae-locale", localeInPath)
    return response
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
  const response = NextResponse.redirect(request.nextUrl)
  response.headers.set("x-bamtae-locale", defaultLocale)
  return response
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|images|.*\\..*).*)",
  ],
}
