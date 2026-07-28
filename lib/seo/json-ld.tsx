const SITE_URL = "https://www.bamtae.com"

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[]

export function JsonLd({ data, id }: { data: JsonLdValue; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Organization schema for the whole site.
 * TODO: replace address details / NIT when Bamtae confirms legal business data.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BAMTAE",
    url: SITE_URL,
    logo: `${SITE_URL}/placeholder-logo.png`,
    sameAs: [
      "https://instagram.com/bamtae",
      "https://facebook.com/bamtae",
      "https://tiktok.com/@bamtae",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrera 43B, La Gabriela", // placeholder — confirmar dirección comercial
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    // taxID: "NIT-PENDIENTE", // placeholder — agregar NIT cuando lo tengan
  }
}

export function getProductJsonLd(product: {
  name: string
  slug: string
  description: string
  price: number
  in_stock?: boolean
  rating?: number
  reviewCount?: number
  image: string | string[]
  locale?: string
}) {
  const locale = product.locale ?? "es"
  const images = (Array.isArray(product.image) ? product.image : [product.image])
    .filter(Boolean)
    .map((img) => (img.startsWith("http") ? img : `${SITE_URL}${img}`))

  const ratingValue = Number(product.rating ?? 4.8)
  const reviewCount = Number(product.reviewCount ?? 120)

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.length === 1 ? images[0] : images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "BAMTAE",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: String(product.price),
      availability:
        product.in_stock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${SITE_URL}/${locale}/producto/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
    },
  }
}

export function getFaqPageJsonLd(
  faqs: { q: string; a: string }[] | { section: string; items: { q: string; a: string }[] }[]
) {
  const flat = faqs.flatMap((entry) =>
    "items" in entry ? entry.items : [entry as { q: string; a: string }]
  )

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flat.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }
}

export function getBlogPostingJsonLd(post: {
  title: string
  metaDescription: string
  date: string
  slug: string
  image: string
  locale?: string
}) {
  const locale = post.locale ?? "es"
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "BAMTAE",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "BAMTAE",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/placeholder-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${post.slug}`,
    },
  }
}

export { SITE_URL }
