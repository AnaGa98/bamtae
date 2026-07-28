import type { MetadataRoute } from "next"
import { locales, type Locale } from "@/lib/i18n"
import { getAllBlogPosts } from "@/lib/blog"
import { getAllProducts } from "@/lib/products"
import {
  absoluteUrl,
  localizedPath,
} from "@/lib/seo/locale-metadata"

const STATIC_PATHS = [
  "/",
  "/novedades",
  "/bodys",
  "/conjuntos",
  "/vestidos",
  "/mas-vendidos",
  "/ofertas",
  "/sobre-nosotros",
  "/blog",
  "/faq",
  "/careers",
] as const

function entry(
  pathWithoutLocale: string,
  options?: {
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority?: number
    lastModified?: Date
  }
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, pathWithoutLocale))
  }

  return locales.map((locale: Locale) => ({
    url: absoluteUrl(localizedPath(locale, pathWithoutLocale)),
    lastModified: options?.lastModified ?? new Date(),
    changeFrequency: options?.changeFrequency ?? "weekly",
    priority: options?.priority ?? (pathWithoutLocale === "/" ? 1 : 0.7),
    alternates: {
      languages,
    },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.flatMap((path) =>
    entry(path, {
      changeFrequency: path === "/" || path === "/novedades" ? "daily" : "weekly",
      priority: path === "/" ? 1 : path === "/blog" ? 0.8 : 0.7,
    })
  )

  const productEntries = getAllProducts().flatMap((product) =>
    entry(`/producto/${product.slug}`, {
      changeFrequency: "weekly",
      priority: 0.6,
    })
  )

  const blogEntries = getAllBlogPosts().flatMap((post) =>
    entry(`/blog/${post.slug}`, {
      changeFrequency: "monthly",
      priority: 0.75,
      lastModified: post.date ? new Date(`${post.date}T12:00:00`) : new Date(),
    })
  )

  return [...staticEntries, ...productEntries, ...blogEntries]
}
