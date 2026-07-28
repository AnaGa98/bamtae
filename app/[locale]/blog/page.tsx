import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header-i18n"
import { Footer } from "@/components/footer-i18n"
import { getDictionary } from "@/lib/dictionaries"
import { formatBlogDate, getAllBlogPosts } from "@/lib/blog"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  return {
    title: locale === "en" ? "Blog | BAMTAE" : "Blog | BAMTAE",
    description:
      locale === "en"
        ? "Style guides, fit tips and Medellín inspiration from BAMTAE."
        : "Guías de estilo, tallas e inspiración desde Medellín, el blog de BAMTAE.",
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const posts = getAllBlogPosts()

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen overflow-hidden">
        <section className="relative py-16 lg:py-24">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(240, 213, 184, 0.6) 0%, transparent 55%), linear-gradient(165deg, #F8F4EE 0%, #F3E8DC 50%, #EED9C4 100%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-14 lg:mb-20 text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#AF6D4E] mb-4">
                BAMTAE
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-cacao tracking-tight">
                Blog
              </h1>
              <p className="mt-5 text-lg md:text-xl text-cacao/70 leading-relaxed">
                Guías de estilo, tallas e inspiración para sentirte segura en tu
                propia piel, todos los días.
              </p>
            </div>

            {posts.length === 0 ? (
              <p className="text-cacao/60">Pronto publicaremos nuevos artículos.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/${locale}/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#F0E2D0] mb-5 ring-1 ring-[#C9A961]/25">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <time
                        dateTime={post.date}
                        className="text-xs uppercase tracking-[0.16em] text-[#AF6D4E]"
                      >
                        {formatBlogDate(post.date)}
                      </time>
                      <h2 className="mt-2 font-serif text-2xl text-cacao group-hover:text-terracotta transition-colors text-balance">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-cacao/70 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-sm text-terracotta tracking-wide">
                        Leer artículo
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
