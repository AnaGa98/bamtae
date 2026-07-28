"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type RevealVariant = "up" | "fade" | "scale" | "left" | "right"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms (e.g. index * 90) */
  delay?: number
  threshold?: number
  variant?: RevealVariant
  /** Keep observing and re-hide when leaving viewport (default: once) */
  once?: boolean
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.08,
  variant = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setVisible(false)
        }
      },
      {
        threshold,
        // Trigger a bit before the element fully enters — feels responsive while scrolling
        rootMargin: "0px 0px -12% 0px",
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, threshold, once])

  const style = {
    "--reveal-delay": reduceMotion ? "0ms" : `${delay}ms`,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={style}
      data-reveal={variant}
      className={`scroll-reveal ${visible || reduceMotion ? "scroll-reveal-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export const REVEAL_STAGGER_MS = 110
