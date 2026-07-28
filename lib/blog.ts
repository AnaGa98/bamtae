import fs from "fs"
import path from "path"

export type BlogPostMeta = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keyword: string
  date: string
  excerpt: string
  image: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
}

export type BlogPost = BlogPostMeta & {
  body: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: raw.trim() }
  }

  const data: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }

  return { data, body: match[2].trim() }
}

function toPost(slug: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw)
  return {
    slug,
    title: data.title ?? slug,
    metaTitle: data.metaTitle ?? data.title ?? slug,
    metaDescription: data.metaDescription ?? "",
    keyword: data.keyword ?? "",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image ?? "/placeholder.jpg",
    imageAlt: data.imageAlt ?? data.title ?? "",
    ctaLabel: data.ctaLabel ?? "Ver colección",
    ctaHref: data.ctaHref ?? "/es/novedades",
    body,
  }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
      return toPost(slug, raw)
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  return toPost(slug, raw)
}

export function getBlogSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug)
}

export function formatBlogDate(date: string, locale = "es-CO") {
  if (!date) return ""
  const parsed = new Date(`${date}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
