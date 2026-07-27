#!/usr/bin/env node
/**
 * Importa productos nuevos a Bamtae desde un .docx o .pdf.
 *
 * Uso:
 *   npm run import-catalog -- ./nueva-coleccion.docx
 *   npm run import-catalog -- ./nueva-coleccion.pdf --dry-run
 *
 * Fuente de datos: lib/catalogo.json
 * Fotos: public/products/{id}-1.{ext}
 *
 * Convención de imagen del proyecto:
 *   Preferida: {id}-{color}-{n}.jpg  (ej. lia-negro-1.jpg)
 *   Fallback:  {id}-{n}.jpg          (ej. venus-1.jpg)
 * Al importar una sola foto por producto (sin color), se usa {id}-1.{ext}.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import JSZip from "jszip"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const CATALOG_PATH = path.join(ROOT, "lib", "catalogo.json")
const PRODUCTS_DIR = path.join(ROOT, "public", "products")

const CATEGORY_MAP = [
  { pattern: /\bconjuntos?\b|\bsets?\b/i, category: "conjuntos", subcategory: "conjunto" },
  { pattern: /\bvestidos?\b/i, category: "vestidos", subcategory: "vestido" },
  { pattern: /\bblusas?\b/i, category: "blusas", subcategory: "blusa" },
  { pattern: /\bbodys?\b|\bbodies\b|\bbody\b/i, category: "bodys", subcategory: "body" },
]

const SKIP_TEXT_PATTERNS = [
  /^bamtae$/i,
  /^nueva\s+colecci[oó]n$/i,
  /^referencias?$/i,
  /^cat[aá]logo$/i,
  /^p[aá]gina\s+\d+$/i,
]

const MIN_IMAGE_BYTES = 500
const MIN_IMAGE_DIMENSION = 80

async function isProductImage(buffer) {
  if (!buffer || buffer.length < MIN_IMAGE_BYTES) return false
  try {
    const meta = await sharp(buffer).metadata()
    const width = meta.width ?? 0
    const height = meta.height ?? 0
    return width >= MIN_IMAGE_DIMENSION && height >= MIN_IMAGE_DIMENSION
  } catch {
    return false
  }
}

function printUsage() {
  console.log(`
Uso:
  npm run import-catalog -- <archivo.docx|archivo.pdf> [--dry-run]

Opciones:
  --dry-run   Extrae y muestra el resumen sin escribir archivos ni el catálogo
`)
}

function normalizeId(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function titleCaseName(value) {
  const cleaned = String(value || "").trim().replace(/\s+/g, " ")
  if (!cleaned) return ""
  return cleaned
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

function parsePrice(text) {
  if (!text) return null

  const patterns = [
    /\$\s*([\d]{1,3}(?:[.\s]\d{3})+(?:,\d{2})?)/,
    /\$\s*([\d]+(?:[.,]\d{2})?)/,
    /precio\s*[:=]?\s*\$?\s*([\d]{1,3}(?:[.\s]\d{3})+)/i,
    /precio\s*[:=]?\s*\$?\s*([\d]+)/i,
    /\b([\d]{2,3}(?:[.\s]\d{3})+)\s*(?:cop|pesos)?\b/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (!match) continue
    const digits = match[1].replace(/[^\d]/g, "")
    const amount = Number(digits)
    if (Number.isFinite(amount) && amount >= 1000) return amount
  }

  return null
}

function inferCategory(text, fallback = "bodys") {
  for (const entry of CATEGORY_MAP) {
    if (entry.pattern.test(text)) {
      return { category: entry.category, subcategory: entry.subcategory }
    }
  }
  const fallbackEntry = CATEGORY_MAP.find((entry) => entry.category === fallback)
  return {
    category: fallback,
    subcategory: fallbackEntry?.subcategory ?? "body",
  }
}

const KNOWN_COLORS = [
  "negro",
  "blanco",
  "blanca",
  "cafe",
  "café",
  "amarillo",
  "rojo",
  "rosado",
  "rosa",
  "azul",
  "azul-claro",
  "azul claro",
  "morado",
  "vino",
  "vino-tinto",
  "vino tinto",
  "beige",
  "verde",
  "oliva",
]

function normalizeColorName(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/^colou?r(?:es)?\s*[:.\-–]?\s*/i, "")
    .replace(/^colo\s*[:.\-–]?\s*/i, "")
    .replace(/[:.\-–]+$/g, "")
    .trim()

  if (!cleaned) return null

  const slug = normalizeId(cleaned)
  const aliases = {
    blanca: "blanco",
    cafe: "cafe",
    "vino-tinto": "vino",
    "azul-claro": "azul-claro",
  }

  return aliases[slug] || slug || null
}

function isKnownColorToken(value) {
  const slug = normalizeColorName(value)
  if (!slug) return false
  return KNOWN_COLORS.some((color) => normalizeId(color) === slug)
}

function isProductStartText(text) {
  const value = String(text || "").trim()
  return (
    /^ref(?:erencia)?s?\s*[:.\-–]/i.test(value) ||
    /^nombre\s+y\s+referencia\s*[:.\-–]/i.test(value)
  )
}

function isColorLabelText(text) {
  const value = String(text || "").trim()
  if (!value) return false
  if (isProductStartText(value)) return false
  if (/^colou?r(?:es)?\s*[:.\-–]/i.test(value)) return true
  if (/^colo\s*[:.\-–]/i.test(value)) return true

  const tokens = value.split(/[-|/·•,]+/).map((part) => part.trim()).filter(Boolean)
  if (tokens.length === 0) return false
  if (tokens.length === 1) return isKnownColorToken(tokens[0])
  return tokens.every((token) => isKnownColorToken(token))
}

function extractColorLabelsFromText(text) {
  const value = String(text || "").trim()
  if (!value) return []

  const withoutPrefix = value
    .replace(/^colou?r(?:es)?\s*[:.\-–]?\s*/i, "")
    .replace(/^colo\s*[:.\-–]?\s*/i, "")
    .trim()

  return withoutPrefix
    .split(/[-|/·•,]+/)
    .map((part) => normalizeColorName(part))
    .filter(Boolean)
}

function parseReferenciaHeader(rawLine) {
  const line = String(rawLine || "").trim()
  const match = line.match(
    /^(?:nombre\s+y\s+referencia|ref(?:erencia)?s?)\s*[:.\-–]\s*(.+)$/i
  )
  const payload = (match?.[1] || line).trim()
  const segments = payload.split("|").map((part) => part.trim()).filter(Boolean)
  const titleSegment = segments[0] || payload

  let name = titleSegment
  let idSource = titleSegment

  if (titleSegment.includes(" - ")) {
    const [left, ...rest] = titleSegment.split(/\s+-\s+/)
    const right = rest.join(" - ").trim()
    name = right || left
    idSource = right || left
  }

  const colors = []
  for (const segment of segments.slice(1)) {
    if (/^tall[ea]\b/i.test(segment)) continue
    if (/^colou?r|^colo\b/i.test(segment) || isColorLabelText(segment)) {
      colors.push(...extractColorLabelsFromText(segment))
    }
  }

  // trailing "Negro:" style token on the title segment
  const trailingColor = titleSegment.match(
    /\|\s*([A-Za-zÁÉÍÓÚáéíóúñÑ][A-Za-zÁÉÍÓÚáéíóúñÑ\s]*)[:.\-–]?\s*$/
  )
  if (trailingColor && isKnownColorToken(trailingColor[1])) {
    colors.push(normalizeColorName(trailingColor[1]))
  }

  return {
    id: normalizeId(idSource),
    name: titleCaseName(name),
    colors: [...new Set(colors.filter(Boolean))],
    raw: line,
    empty: !String(idSource || "").trim(),
  }
}

function extractReference(lines) {
  for (const line of lines) {
    if (isProductStartText(line)) {
      return parseReferenciaHeader(line).id || parseReferenciaHeader(line).name
    }
    const refMatch = line.match(
      /^(?:nombre\s+y\s+referencia|ref(?:erencia)?|sku|c[oó]digo|id)\s*[:.\-–]?\s*(.+)$/i
    )
    if (refMatch) return refMatch[1].split("|")[0].trim()
  }
  return null
}

function extractColors(text) {
  const colors = []
  const lines = String(text || "").split("\n")

  for (const line of lines) {
    if (isProductStartText(line)) {
      colors.push(...parseReferenciaHeader(line).colors)
      continue
    }
    if (isColorLabelText(line) || /colores?\s*[:.\-–]/i.test(line)) {
      colors.push(...extractColorLabelsFromText(line))
    }
  }

  return [...new Set(colors.map((color) => titleCaseName(color.replace(/-/g, " "))))]
}

function extractExplicitCategory(lines) {
  for (const line of lines) {
    const match = line.match(/^(?:categor[ií]a|categoria|tipo)\s*[:.\-–]?\s*(.+)$/i)
    if (match) return match[1].trim()
  }
  return null
}

function extractName(lines, reference) {
  for (const line of lines) {
    const nameMatch = line.match(/^(?:nombre|t[ií]tulo|producto)\s*[:.\-–]?\s*(.+)$/i)
    if (nameMatch) return nameMatch[1].trim()
  }

  const meaningful = lines.filter((line) => {
    if (!line) return false
    if (/^(?:ref(?:erencia)?|sku|c[oó]digo|id|categor[ií]a|categoria|tipo|precio|color(?:es)?|descripci[oó]n)\b/i.test(line)) {
      return false
    }
    if (/^\$?\s*[\d]/.test(line)) return false
    if (SKIP_TEXT_PATTERNS.some((pattern) => pattern.test(line))) return false
    return true
  })

  if (meaningful.length === 0) return reference ? titleCaseName(reference) : ""
  if (reference && normalizeId(meaningful[0]) === normalizeId(reference) && meaningful[1]) {
    return meaningful[1]
  }
  return meaningful[0]
}

function extractDescription(lines, name, reference) {
  const skipIds = new Set(
    [name, reference]
      .filter(Boolean)
      .map((value) => normalizeId(value))
  )

  const parts = []
  for (const line of lines) {
    if (/^(?:ref(?:erencia)?|sku|c[oó]digo|id|categor[ií]a|categoria|tipo|precio|color(?:es)?)\b/i.test(line)) {
      continue
    }
    if (/^\$?\s*[\d]/.test(line)) continue
    if (SKIP_TEXT_PATTERNS.some((pattern) => pattern.test(line))) continue
    if (skipIds.has(normalizeId(line))) continue
    if (/^descripci[oó]n\s*[:.\-–]?\s*/i.test(line)) {
      parts.push(line.replace(/^descripci[oó]n\s*[:.\-–]?\s*/i, "").trim())
      continue
    }
    parts.push(line)
  }

  return parts.join(" ").trim()
}

function parseProductText(rawText) {
  const text = String(rawText || "")
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .trim()

  if (!text) {
    return { ok: false, reason: "sin-titulo", rawText: text }
  }

  const lines = text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((line) => !SKIP_TEXT_PATTERNS.some((pattern) => pattern.test(line)))

  if (lines.length === 0) {
    return { ok: false, reason: "sin-titulo", rawText: text }
  }

  const headerLine = lines.find((line) => isProductStartText(line))
  const header = headerLine ? parseReferenciaHeader(headerLine) : null

  if (header?.empty) {
    return { ok: false, reason: "sin-titulo", rawText: text, lines }
  }

  const reference =
    header?.id ||
    extractReference(lines) ||
    lines[0]
  const id = normalizeId(header?.id || reference)
  if (!id || id === "nombre-y-referencia" || id === "referencia") {
    return { ok: false, reason: "sin-titulo", rawText: text, lines }
  }

  const name = titleCaseName(
    header?.name || extractName(lines, reference) || reference
  )
  if (!name) {
    return { ok: false, reason: "sin-titulo", rawText: text, id, lines }
  }

  const explicitCategory = extractExplicitCategory(lines)
  const { category, subcategory } = inferCategory(
    [explicitCategory, text, name, id].filter(Boolean).join("\n")
  )
  const price = parsePrice(text)
  const colors = extractColors(text)
  const description = extractDescription(lines, name, reference)

  return {
    ok: true,
    id,
    name,
    category,
    subcategory,
    price,
    colors,
    description,
    rawText: text,
  }
}

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function extractTextFromParagraphXml(paragraphXml) {
  const texts = []
  const re = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g
  let match
  while ((match = re.exec(paragraphXml))) {
    texts.push(decodeXmlEntities(match[1]))
  }
  return texts.join("").trim()
}

function extractRelIdsFromXml(xml) {
  const ids = []
  const re = /r:embed="(rId\d+)"/g
  let match
  while ((match = re.exec(xml))) {
    ids.push(match[1])
  }
  return ids
}

async function parseDocx(filePath) {
  const buffer = fs.readFileSync(filePath)
  const zip = await JSZip.loadAsync(buffer)
  const documentXml = await zip.file("word/document.xml")?.async("string")
  if (!documentXml) {
    throw new Error("El .docx no contiene word/document.xml")
  }

  const relsXml = await zip.file("word/_rels/document.xml.rels")?.async("string")
  const relMap = new Map()
  if (relsXml) {
    const relRe = /<Relationship\b([^>]+?)\/?>/g
    let relMatch
    while ((relMatch = relRe.exec(relsXml))) {
      const attrs = relMatch[1]
      const id = attrs.match(/\bId="([^"]+)"/)?.[1]
      const target = attrs.match(/\bTarget="([^"]+)"/)?.[1]
      if (!id || !target) continue
      const normalizedTarget = target.replace(/^\//, "")
      const mediaPath = normalizedTarget.startsWith("word/")
        ? normalizedTarget
        : path.posix.join("word", normalizedTarget)
      relMap.set(id, mediaPath)
    }
  }

  const bodyMatch = documentXml.match(/<w:body[^>]*>([\s\S]*)<\/w:body>/)
  const bodyXml = bodyMatch?.[1] ?? documentXml
  const blocks = bodyXml.match(/<w:p[\s>][\s\S]*?<\/w:p>|<w:tbl[\s>][\s\S]*?<\/w:tbl>/g) || []

  const items = []

  for (const block of blocks) {
    const paragraphText = extractTextFromParagraphXml(block)
    if (paragraphText) {
      items.push({ type: "text", content: paragraphText })
    }

    const relIds = extractRelIdsFromXml(block)
    for (const relId of relIds) {
      const mediaPath = relMap.get(relId)
      if (!mediaPath) continue
      const mediaFile = zip.file(mediaPath)
      if (!mediaFile) continue
      const imageBuffer = Buffer.from(await mediaFile.async("uint8array"))
      if (!(await isProductImage(imageBuffer))) continue
      items.push({
        type: "image",
        buffer: imageBuffer,
        sourceName: path.posix.basename(mediaPath),
      })
    }
  }

  return groupProductBlocks(items)
}

/**
 * Agrupa: cada "Referencia:" abre un producto; las fotos siguientes
 * (y etiquetas Color: intermedias) pertenecen a ese producto hasta la
 * próxima Referencia.
 *
 * También soporta el patrón simple texto→N fotos cuando no hay Referencia:
 * cualquier texto no-color abre producto y acumula fotos hasta el próximo texto.
 */
function groupProductBlocks(items) {
  const pairs = []
  let current = null
  let colorQueue = []
  let orphanImages = 0
  const hasReferenciaMarkers = items.some(
    (item) => item.type === "text" && isProductStartText(item.content)
  )

  const flushCurrent = () => {
    if (!current) return

    const text = current.textParts.join("\n").trim()
    const parse = parseProductText(text)
    if (parse.ok && current.collectedColors.length > 0) {
      const merged = [
        ...parse.colors.map((color) => normalizeColorName(color)),
        ...current.collectedColors,
      ].filter(Boolean)
      parse.colors = [...new Set(merged)].map((color) =>
        titleCaseName(String(color).replace(/-/g, " "))
      )
    }

    pairs.push({
      text,
      images: current.images,
      parse,
    })
    current = null
    colorQueue = []
  }

  const startProduct = (text) => {
    flushCurrent()
    const headerColors = isProductStartText(text)
      ? parseReferenciaHeader(text).colors
      : []
    current = {
      textParts: [text],
      images: [],
      collectedColors: [...headerColors],
    }
    colorQueue = [...headerColors]
  }

  for (const item of items) {
    if (item.type === "text") {
      const content = item.content.trim()
      if (!content) continue

      if (isProductStartText(content)) {
        startProduct(content)
        continue
      }

      if (isColorLabelText(content)) {
        const colors = extractColorLabelsFromText(content)
        if (current) {
          current.textParts.push(content)
          current.collectedColors.push(...colors)
          colorQueue.push(...colors)
        }
        continue
      }

      // Meta no-color (ej. "Talle: Unica") se acumula en el producto actual.
      if (hasReferenciaMarkers) {
        if (current) current.textParts.push(content)
        else startProduct(content)
        continue
      }

      startProduct(content)
      continue
    }

    if (item.type === "image") {
      if (!current) {
        orphanImages += 1
        continue
      }

      current.images.push({
        buffer: item.buffer,
        sourceName: item.sourceName,
        color: colorQueue.length > 0 ? colorQueue.shift() : null,
      })
    }
  }

  flushCurrent()

  const skippedOrphans =
    orphanImages > 0
      ? [{ reason: "sin-titulo", text: `(${orphanImages} imagen(es) sin texto de producto)` }]
      : []

  return { pairs, leftoverText: "", orphanImages, skippedOrphans }
}

async function parsePdf(filePath) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
  const data = new Uint8Array(fs.readFileSync(filePath))
  const loadingTask = pdfjs.getDocument({
    data,
    useSystemFonts: true,
    disableWorker: true,
  })
  const pdf = await loadingTask.promise
  const items = []

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()
    const pageText = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()

    if (pageText) {
      items.push({ type: "text", content: pageText })
    }

    const ops = await page.getOperatorList()
    const common = await page.commonObjs
    const objs = page.objs

    for (let i = 0; i < ops.fnArray.length; i += 1) {
      const fn = ops.fnArray[i]
      if (
        fn !== pdfjs.OPS.paintImageXObject &&
        fn !== pdfjs.OPS.paintInlineImageXObject &&
        fn !== pdfjs.OPS.paintImageXObjectRepeat
      ) {
        continue
      }

      const imageName = ops.argsArray[i]?.[0]
      if (!imageName || typeof imageName !== "string") continue

      const imageData = await getPdfImageData(imageName, objs, common)
      if (!imageData) continue

      const imageBuffer = await pdfImageToBuffer(imageData)
      if (!(await isProductImage(imageBuffer))) continue

      items.push({
        type: "image",
        buffer: imageBuffer,
        sourceName: `page${pageNum}-${imageName}.png`,
      })
    }
  }

  return groupProductBlocks(items)
}

function getPdfImageData(name, pageObjs, commonObjs) {
  return new Promise((resolve) => {
    let settled = false
    const finish = (value) => {
      if (settled) return
      settled = true
      resolve(value)
    }

    try {
      if (pageObjs?.has?.(name)) {
        pageObjs.get(name, finish)
        setTimeout(() => finish(null), 1500)
        return
      }
      if (commonObjs?.has?.(name)) {
        commonObjs.get(name, finish)
        setTimeout(() => finish(null), 1500)
        return
      }
    } catch {
      finish(null)
      return
    }

    finish(null)
  })
}

async function pdfImageToBuffer(image) {
  if (!image) return null

  if (image.data && image.width && image.height) {
    const channels = image.data.length / (image.width * image.height)
    if (![1, 3, 4].includes(channels)) return null

    return sharp(Buffer.from(image.data), {
      raw: {
        width: image.width,
        height: image.height,
        channels,
      },
    })
      .png()
      .toBuffer()
  }

  if (Buffer.isBuffer(image) || image instanceof Uint8Array) {
    return Buffer.from(image)
  }

  return null
}

async function saveProductImages(productId, images, dryRun) {
  const saved = []
  const perColorIndex = new Map()
  let plainIndex = 0

  for (const image of images) {
    const meta = await sharp(image.buffer).metadata()
    const format = meta.format === "png" ? "png" : "jpeg"
    const ext = format === "png" ? "png" : "jpg"
    const colorSlug = image.color ? normalizeColorName(image.color) : null

    let filename
    if (colorSlug) {
      const nextIndex = (perColorIndex.get(colorSlug) || 0) + 1
      perColorIndex.set(colorSlug, nextIndex)
      filename = `${productId}-${colorSlug}-${nextIndex}.${ext}`
    } else {
      plainIndex += 1
      filename = `${productId}-${plainIndex}.${ext}`
    }

    const absolutePath = path.join(PRODUCTS_DIR, filename)
    const publicPath = `/products/${filename}`

    if (!dryRun) {
      fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
      const output =
        format === "png"
          ? await sharp(image.buffer).png({ quality: 90 }).toBuffer()
          : await sharp(image.buffer).jpeg({ quality: 88 }).toBuffer()
      fs.writeFileSync(absolutePath, output)
    }

    saved.push({ filename, publicPath, absolutePath, color: colorSlug })
  }

  return saved
}

function buildNewProduct(parsed, imagePaths) {
  return {
    id: parsed.id,
    name: parsed.name,
    category: parsed.category,
    subcategory: parsed.subcategory,
    price: parsed.price ?? 0,
    compare_at_price: null,
    description: parsed.description || `${parsed.name} BAMTAE.`,
    colors: parsed.colors.length > 0 ? parsed.colors : ["Negro"],
    is_new: true,
    is_best_seller: false,
    is_on_sale: false,
    in_stock: true,
    images: imagePaths,
    tags: [parsed.subcategory, "nuevo"].filter(Boolean),
  }
}

function updateExistingProduct(existing, parsed, imagePaths) {
  const next = { ...existing }

  next.name = parsed.name || existing.name
  next.category = parsed.category || existing.category
  next.subcategory = parsed.subcategory || existing.subcategory
  if (parsed.price != null) next.price = parsed.price
  if (parsed.description) next.description = parsed.description
  if (parsed.colors.length > 0) next.colors = parsed.colors
  next.is_new = true
  next.in_stock = true

  const images = Array.isArray(existing.images) ? [...existing.images] : []
  for (const imagePath of imagePaths) {
    if (!images.includes(imagePath)) images.push(imagePath)
  }
  next.images = images

  return next
}

function summarizeFailures(skipped) {
  if (skipped.length === 0) return

  console.log("\nNo procesados (revisar a mano):")
  for (const item of skipped) {
    const preview = (item.text || "")
      .replace(/\s+/g, " ")
      .slice(0, 80)
    console.log(`  - [${item.reason}] ${preview || "(sin texto)"}${preview.length >= 80 ? "…" : ""}`)
  }
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean)
  const dryRun = args.includes("--dry-run")
  const fileArg = args.find((arg) => !arg.startsWith("--"))

  if (!fileArg || args.includes("--help") || args.includes("-h")) {
    printUsage()
    process.exit(fileArg ? 0 : 1)
  }

  const inputPath = path.resolve(process.cwd(), fileArg)
  if (!fs.existsSync(inputPath)) {
    console.error(`No se encontró el archivo: ${inputPath}`)
    process.exit(1)
  }

  const ext = path.extname(inputPath).toLowerCase()
  if (![".docx", ".pdf"].includes(ext)) {
    console.error("Formato no soportado. Usa un archivo .docx o .pdf")
    process.exit(1)
  }

  console.log(`\nImportando catálogo desde: ${inputPath}`)
  if (dryRun) console.log("(dry-run: no se escribirán cambios)\n")

  const parsedDoc =
    ext === ".docx" ? await parseDocx(inputPath) : await parsePdf(inputPath)

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"))
  if (!Array.isArray(catalog.products)) {
    throw new Error("lib/catalogo.json no tiene un array products válido")
  }

  const byId = new Map(catalog.products.map((product) => [product.id, product]))
  let added = 0
  let updated = 0
  const skipped = [...(parsedDoc.skippedOrphans || [])]
  const processed = []

  for (const pair of parsedDoc.pairs) {
    const { parse, images, text } = pair
    const imageCount = images?.length || 0

    if (!parse.ok) {
      skipped.push({
        reason: parse.reason || "sin-titulo",
        text,
      })
      continue
    }

    if (imageCount === 0) {
      skipped.push({
        reason: "sin-foto",
        text,
      })
      continue
    }

    const saved = await saveProductImages(parse.id, images, dryRun)
    const imagePaths = saved.map((item) => item.publicPath)
    const existing = byId.get(parse.id)

    if (existing) {
      const next = updateExistingProduct(existing, parse, imagePaths)
      const index = catalog.products.findIndex((product) => product.id === parse.id)
      catalog.products[index] = next
      byId.set(parse.id, next)
      updated += 1
      processed.push({
        action: "actualizado",
        id: parse.id,
        name: parse.name,
        imageCount: saved.length,
        filenames: saved.map((item) => item.filename),
        colors: parse.colors,
      })
    } else {
      const next = buildNewProduct(parse, imagePaths)
      catalog.products.push(next)
      byId.set(parse.id, next)
      added += 1
      processed.push({
        action: "nuevo",
        id: parse.id,
        name: parse.name,
        imageCount: saved.length,
        filenames: saved.map((item) => item.filename),
        colors: parse.colors,
      })
    }
  }

  if (!dryRun && (added > 0 || updated > 0)) {
    fs.writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8")
  }

  console.log("\n── Resumen ──")
  console.log(`Productos agregados:   ${added}`)
  console.log(`Productos actualizados: ${updated}`)
  console.log(`No procesados:         ${skipped.length}`)

  if (processed.length > 0) {
    console.log("\nFotos por producto:")
    for (const item of processed) {
      console.log(
        `  - ${item.id} (${item.name}) → ${item.imageCount} foto(s) [${item.action}]`
      )
      console.log(`      archivos: ${item.filenames.join(", ")}`)
      if (item.colors?.length) {
        console.log(`      colores: ${item.colors.join(", ")}`)
      }
    }

    const counts = processed.map((item) => item.imageCount)
    const totalImages = counts.reduce((sum, n) => sum + n, 0)
    console.log(
      `\nTotal: ${processed.length} productos, ${totalImages} fotos (min ${Math.min(...counts)}, max ${Math.max(...counts)})`
    )
  }

  summarizeFailures(skipped)

  if (ext === ".pdf" && parsedDoc.pairs.length === 0) {
    console.log(
      "\nNota: la extracción de imágenes desde PDF depende de cómo esté generado el archivo."
    )
    console.log("Si no detectó fotos, exporta el catálogo a .docx e inténtalo de nuevo.")
  }

  console.log("")
}

main().catch((error) => {
  console.error("\nError al importar el catálogo:")
  console.error(error?.stack || error)
  process.exit(1)
})
