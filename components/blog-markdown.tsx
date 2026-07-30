import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"

type InlineNode = string | ReactNode

function renderInline(text: string, keyPrefix: string): InlineNode[] {
  const nodes: InlineNode[] = []
  const pattern = /(!\[([^\]]*)\]\(([^)]+)\))|(\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      const alt = match[2]
      const src = match[3]
      nodes.push(
        <span key={`${keyPrefix}-img-${i}`} className="block my-8">
          <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-[#F0E2D0]">
            <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 720px" loading="lazy" className="object-cover" />
          </span>
        </span>
      )
    } else {
      const label = match[5]
      const href = match[6]
      const external = href.startsWith("http")
      nodes.push(
        external ? (
          <a
            key={`${keyPrefix}-a-${i}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-terracotta underline underline-offset-4 hover:text-[#a84528]"
          >
            {label}
          </a>
        ) : (
          <Link
            key={`${keyPrefix}-a-${i}`}
            href={href}
            className="text-terracotta underline underline-offset-4 hover:text-[#a84528]"
          >
            {label}
          </Link>
        )
      )
    }

    lastIndex = match.index + match[0].length
    i += 1
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes.length > 0 ? nodes : [text]
}

export function BlogMarkdown({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).map((block) => block.trim()).filter(Boolean)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `block-${index}`

        if (block.startsWith("### ")) {
          return (
            <h3 key={key} className="font-serif text-xl lg:text-2xl text-cacao pt-2">
              {renderInline(block.slice(4), key)}
            </h3>
          )
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={key} className="font-serif text-2xl lg:text-3xl text-cacao pt-4">
              {renderInline(block.slice(3), key)}
            </h2>
          )
        }

        if (block.startsWith("# ")) {
          return (
            <h2 key={key} className="font-serif text-2xl lg:text-3xl text-cacao pt-4">
              {renderInline(block.slice(2), key)}
            </h2>
          )
        }

        return (
          <p key={key} className="text-lg text-cacao/75 leading-relaxed">
            {renderInline(block, key)}
          </p>
        )
      })}
    </div>
  )
}
