"use client"

import { useEffect, useState } from "react"
import { HeroModelsVisual } from "@/components/hero-models-visual"

/**
 * Mounts only the mobile watermark OR the desktop carousel,
 * so the page does not download both sets of hero images.
 */
export function HeroModelsMount({ variant }: { variant: "mobile" | "desktop" }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const sync = () => setIsDesktop(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  // SSR / first paint: prefer mobile (most traffic); desktop hydrates after match.
  if (isDesktop === null) {
    return variant === "mobile" ? <HeroModelsVisual watermark /> : null
  }

  if (variant === "mobile") {
    return isDesktop ? null : <HeroModelsVisual watermark />
  }

  return isDesktop ? <HeroModelsVisual /> : null
}
