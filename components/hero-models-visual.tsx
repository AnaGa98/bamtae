"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"

const HERO_SLIDES = [
  {
    src: "/hero/carousel-1.png",
    alt: "Modelo usando body asimétrico BAMTAE en café con pantalón oscuro",
    width: 896,
    height: 1195,
  },
  {
    src: "/hero/carousel-2.png",
    alt: "Modelo con body de un hombro BAMTAE en pose frontal",
    width: 896,
    height: 1195,
  },
  {
    src: "/hero/carousel-3.png",
    alt: "Modelo con body escultural BAMTAE en café",
    width: 896,
    height: 1195,
  },
  {
    src: "/hero/carousel-5.png",
    alt: "Dos modelos BAMTAE: look amarillo de espalda y conjunto negro",
    width: 896,
    height: 1195,
  },
  {
    src: "/hero/carousel-7.png",
    alt: "Dos modelos BAMTAE con looks en vino y conjunto café",
    width: 960,
    height: 1117,
  },
] as const

const AUTOPLAY_MS = 5000

type HeroModelsVisualProps = {
  /** Soft background mode for mobile hero — no blobs/arc/dots. */
  watermark?: boolean
}

export function HeroModelsVisual({ watermark = false }: HeroModelsVisualProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const pausedRef = useRef(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  const goNext = useCallback(() => {
    setActive((current) => (current + 1) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return

    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        goNext()
      }
    }, AUTOPLAY_MS)

    return () => window.clearInterval(id)
  }, [goNext])

  useEffect(() => {
    const next = HERO_SLIDES[(active + 1) % HERO_SLIDES.length]
    const img = new window.Image()
    img.src = next.src
  }, [active])

  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center overflow-visible ${
        watermark ? "h-full min-h-0" : "min-h-[320px] lg:min-h-[600px]"
      }`}
      onMouseEnter={() => {
        if (canHover) setPaused(true)
      }}
      onMouseLeave={() => {
        if (canHover) setPaused(false)
      }}
    >
      {!watermark && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="hero-blob hero-blob-terracotta absolute left-[5%] top-[22%] h-[48%] w-[48%] rounded-full bg-[#E8C4A8]/35 blur-3xl" />
            <div className="hero-blob hero-blob-mustard absolute right-[0%] bottom-[8%] h-[42%] w-[42%] rounded-full bg-[#F0D5B8]/40 blur-3xl" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="hero-arc w-[88%] max-w-[520px] aspect-square opacity-70"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle
                cx="200"
                cy="200"
                r="168"
                stroke="#C9A961"
                strokeWidth="1.25"
                opacity="0.85"
              />
            </svg>
          </div>
        </>
      )}

      <div
        className={`relative z-10 w-full overflow-visible ${
          watermark ? "h-full min-h-[480px] aspect-auto" : "aspect-[4/5] max-h-[700px]"
        }`}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === active
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 flex items-end justify-center ${
                reduceMotion ? "" : "transition-[opacity,transform] duration-[800ms] ease-in-out"
              }`}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? watermark
                    ? "scale(1.05)"
                    : "scale(1.36)"
                  : watermark
                    ? "scale(1.08)"
                    : "scale(1.38)",
                zIndex: isActive ? 2 : 1,
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                priority={index === 0 || index === 1}
                className={`w-full h-full object-contain object-bottom ${
                  watermark ? "hero-model-cutout-soft max-h-none" : "hero-model-cutout"
                }`}
              />
            </div>
          )
        })}
      </div>

      {!watermark && HERO_SLIDES.length > 1 && (
        <div
          className="relative z-10 mt-4 hidden lg:flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Imágenes del hero"
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === active
            return (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ver imagen ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-5 bg-cacao" : "w-1.5 bg-cacao/25 hover:bg-cacao/45"
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
