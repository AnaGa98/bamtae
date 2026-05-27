"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]

interface SortDropdownProps {
  className?: string
}

export function SortDropdown({ className }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(sortOptions[0])

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
      >
        <span className="text-muted-foreground">Sort by:</span>
        <span className="font-medium">{selected.label}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors",
                  selected.value === option.value
                    ? "text-primary bg-accent/50"
                    : "text-foreground/80 hover:bg-accent/30"
                )}
              >
                {option.label}
                {selected.value === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
