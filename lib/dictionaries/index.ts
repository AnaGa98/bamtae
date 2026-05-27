import type { Locale } from "../i18n"
import { dictionary as es } from "./es"
import { dictionary as en } from "./en"

const dictionaries = { es, en }

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.es
}

export type { Dictionary } from "./es"
