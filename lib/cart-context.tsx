"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { formatPriceCop } from "@/lib/products"

export const FREE_SHIPPING_THRESHOLD = 200_000
export const CART_STORAGE_KEY = "bamtae-cart"

export interface CartItem {
  id: string
  productId: string
  name: string
  color: string
  price: number
  quantity: number
  image: string
}

export type AddCartItemInput = {
  productId: string
  name: string
  color: string
  price: number
  image: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addItem: (item: AddCartItemInput) => void
  removeItem: (lineId: string) => void
  updateQuantity: (lineId: string, delta: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

function formatColorLabel(color: string): string {
  return color
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

function createLineId(productId: string, color: string): string {
  return `${productId}-${color.toLowerCase().trim()}`
}

export function formatCartPrice(price: number): string {
  return `$${formatPriceCop(price)}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored) as CartItem[])
      }
    } catch {
      setItems([])
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, isHydrated])

  const addItem = useCallback((item: AddCartItemInput) => {
    // Unpriced catalog items must be handled via WhatsApp inquiry, not cart.
    if (!Number.isFinite(item.price) || item.price <= 0) return

    const formattedColor = formatColorLabel(item.color)
    const lineId = createLineId(item.productId, formattedColor)

    setItems((current) => {
      const existing = current.find((entry) => entry.id === lineId)

      if (existing) {
        return current.map((entry) =>
          entry.id === lineId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      }

      return [
        ...current,
        {
          id: lineId,
          productId: item.productId,
          name: item.name,
          color: formattedColor,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((lineId: string) => {
    setItems((current) => current.filter((entry) => entry.id !== lineId))
  }, [])

  const updateQuantity = useCallback((lineId: string, delta: number) => {
    setItems((current) =>
      current
        .map((entry) =>
          entry.id === lineId
            ? { ...entry, quantity: Math.max(0, entry.quantity + delta) }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    )
  }, [])

  const itemCount = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      updateQuantity,
    }),
    [items, itemCount, subtotal, isOpen, addItem, removeItem, updateQuantity]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider")
  }
  return context
}
