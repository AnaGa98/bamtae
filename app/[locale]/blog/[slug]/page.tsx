import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { BlogMarkdown } from "@/components/blog-markdown"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionaries"
import {
  formatBlogDate,
  getBlogPost,
  getBlogSlugs,
} from "@/lib/blog"
import { JsonLd, getBlogPostingJsonLd } from "@/lib/seo/json-ld"
import {
  buildPageAlternates,
  openGraphLocale,
} from "@/lib/seo/locale-metadata"
import type { Locale } from "@/lib/i18n"

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Blog | BAMTAE" }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keyword,
    alternates: buildPageAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      locale: openGraphLocale(locale),
      images: [{ url: post.image, alt: post.imageAlt }],
      url: `/${locale}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const dict = getDictionary(locale)
  const ctaHref = post.ctaHref.replace(/^\/es\//, `/${locale}/`)

  return (
    <>
      <JsonLd
        id={`blogpost-${post.slug}-jsonld`}
        data={getBlogPostingJsonLd({
          title: post.title,
          metaDescription: post.metaDescription,
          date: post.date,
          slug: post.slug,
          image: post.image,
          locale,
        })}
      />
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen bg-[#F7F3EE]">
        <article>
          <header className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(240, 213, 184, 0.55) 0%, transparent 55%), linear-gradient(180deg, #F8F4EE, #F7F3EE)",
              }}
            />
            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-8">
              <nav className="flex items-center gap-2 text-sm text-cacao/50 mb-8">
                <Link href={`/${locale}`} className="hover:text-cacao">
                  Inicio
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/${locale}/blog`} className="hover:text-cacao">
                  Blog
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-cacao truncate max-w-[12rem] sm:max-w-none">
                  {post.title}
                </span>
              </nav>

              <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-4">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-cacao leading-tight text-balance">
                {post.title}
              </h1>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-14">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-[#C9A961]/30 shadow-[0_20px_50px_rgba(61,40,28,0.1)]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 896px"
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
          </header>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <BlogMarkdown content={post.body} />
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="border-t border-[#C9A961]/30 pt-10 text-center">
              <p className="text-cacao/70 mb-6">
                ¿Lista para encontrar tu próxima pieza Bamtae?
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-terracotta text-terracotta-foreground hover:bg-[#a84528]"
              >
                <Link href={ctaHref}>{post.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
