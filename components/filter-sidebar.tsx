"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium tracking-wide">{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )
}

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface CheckboxFilterProps {
  options: FilterOption[]
  selected: string[]
  onChange: (values: string[]) => void
}

function CheckboxFilter({ options, selected, onChange }: CheckboxFilterProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={cn(
              "w-4 h-4 border rounded-sm transition-colors flex items-center justify-center",
              selected.includes(option.value)
                ? "bg-primary border-primary"
                : "border-muted-foreground/40 group-hover:border-primary/60"
            )}
          >
            {selected.includes(option.value) && (
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm text-foreground/80 group-hover:text-foreground">
            {option.label}
          </span>
          {option.count !== undefined && (
            <span className="text-xs text-muted-foreground ml-auto">
              ({option.count})
            </span>
          )}
        </label>
      ))}
    </div>
  )
}

interface ColorFilterProps {
  colors: { name: string; hex: string; value: string }[]
  selected: string[]
  onChange: (values: string[]) => void
}

function ColorFilter({ colors, selected, onChange }: ColorFilterProps) {
  const toggleColor = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => toggleColor(color.value)}
          className={cn(
            "w-8 h-8 rounded-full border-2 transition-all",
            selected.includes(color.value)
              ? "border-primary ring-2 ring-primary/30"
              : "border-border hover:border-primary/50"
          )}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        >
          <span className="sr-only">{color.name}</span>
        </button>
      ))}
    </div>
  )
}

interface PriceRangeProps {
  selected: string | null
  onChange: (value: string | null) => void
}

function PriceRange({ selected, onChange }: PriceRangeProps) {
  const ranges = [
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $150", value: "100-150" },
    { label: "Over $150", value: "150+" },
  ]

  return (
    <div className="space-y-3">
      {ranges.map((range) => (
        <label
          key={range.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={cn(
              "w-4 h-4 border rounded-full transition-colors flex items-center justify-center",
              selected === range.value
                ? "border-primary"
                : "border-muted-foreground/40 group-hover:border-primary/60"
            )}
          >
            {selected === range.value && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <span className="text-sm text-foreground/80 group-hover:text-foreground">
            {range.label}
          </span>
        </label>
      ))}
    </div>
  )
}

interface FilterSidebarProps {
  className?: string
  onClose?: () => void
  isMobile?: boolean
}

export function FilterSidebar({ className, onClose, isMobile }: FilterSidebarProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFits, setSelectedFits] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)

  const colors = [
    { name: "Nude Beige", hex: "#D8B7A4", value: "nude" },
    { name: "Mocha", hex: "#6B4F43", value: "mocha" },
    { name: "Ivory", hex: "#F7F3EE", value: "ivory" },
    { name: "Taupe", hex: "#B8A89C", value: "taupe" },
    { name: "Charcoal", hex: "#1E1E1E", value: "charcoal" },
    { name: "Blush", hex: "#E8C4C4", value: "blush" },
  ]

  const fits = [
    { label: "Sculpting", value: "sculpting", count: 14 },
    { label: "Regular", value: "regular", count: 8 },
    { label: "Relaxed", value: "relaxed", count: 4 },
  ]

  const styles = [
    { label: "Seamless", value: "seamless", count: 10 },
    { label: "Ribbed", value: "ribbed", count: 8 },
    { label: "Square Neck", value: "square-neck", count: 6 },
    { label: "V-Neck", value: "v-neck", count: 4 },
    { label: "Halter", value: "halter", count: 3 },
    { label: "Long Sleeve", value: "long-sleeve", count: 5 },
  ]

  const clearAllFilters = () => {
    setSelectedColors([])
    setSelectedFits([])
    setSelectedStyles([])
    setSelectedPrice(null)
  }

  const hasActiveFilters =
    selectedColors.length > 0 ||
    selectedFits.length > 0 ||
    selectedStyles.length > 0 ||
    selectedPrice !== null

  return (
    <div className={cn("bg-background", className)}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-medium">Filters</h2>
          <button onClick={onClose} aria-label="Close filters">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className={cn(isMobile ? "p-4" : "")}>
        {hasActiveFilters && (
          <div className="pb-4 border-b border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        <FilterSection title="Color">
          <ColorFilter
            colors={colors}
            selected={selectedColors}
            onChange={setSelectedColors}
          />
        </FilterSection>

        <FilterSection title="Fit">
          <CheckboxFilter
            options={fits}
            selected={selectedFits}
            onChange={setSelectedFits}
          />
        </FilterSection>

        <FilterSection title="Style">
          <CheckboxFilter
            options={styles}
            selected={selectedStyles}
            onChange={setSelectedStyles}
          />
        </FilterSection>

        <FilterSection title="Price">
          <PriceRange selected={selectedPrice} onChange={setSelectedPrice} />
        </FilterSection>
      </div>

      {isMobile && (
        <div className="p-4 border-t border-border">
          <Button onClick={onClose} className="w-full">
            View Results
          </Button>
        </div>
      )}
    </div>
  )
}
