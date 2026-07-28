import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo/locale-metadata"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/*/cart", "/*/finalizar-pedido", "/*/complete-order"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
