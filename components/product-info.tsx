"use client";

import { useState } from "react";
import { Heart, Check, Truck, RotateCcw, Shield, Star, Ruler, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const colors = [
  { name: "Nude Beige", value: "#D8B7A4", inStock: true },
  { name: "Mocha", value: "#6B4F43", inStock: true },
  { name: "Cream", value: "#F5F0E8", inStock: true },
  { name: "Charcoal", value: "#1E1E1E", inStock: true },
  { name: "Taupe", value: "#B8A89C", inStock: false },
];

const sizes = [
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: false },
];

const highlights = [
  { icon: "sculpt", label: "Sculpting Fit", description: "Smooths & contours" },
  { icon: "soft", label: "Buttery Soft", description: "Premium fabric" },
  { icon: "stretch", label: "4-Way Stretch", description: "Moves with you" },
  { icon: "seamless", label: "Seamless Design", description: "No visible lines" },
];

export function ProductInfo() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#B8A89C]">
        <span className="hover:text-[#6B4F43] cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-[#6B4F43] cursor-pointer">Bodys</span>
        <span className="mx-2">/</span>
        <span className="text-[#1E1E1E]">Off-Shoulder Ruched Body</span>
      </nav>

      {/* Title & Price */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-terracotta text-terracotta-foreground text-[10px] tracking-wider px-2 py-0.5 uppercase">
            Más vendido
          </span>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < 4 ? "fill-[#6B4F43] text-[#6B4F43]" : "fill-[#D8B7A4] text-[#D8B7A4]"}`}
                />
              ))}
            </div>
            <span className="text-xs text-[#6B4F43] ml-1">4.8 (128 reviews)</span>
          </div>
        </div>
        <h1 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E] mb-2">
          Off-Shoulder Ruched Body
        </h1>
        <p className="text-[#B8A89C] text-sm mb-3">
          Our signature off-shoulder bodysuit with ruched mesh sleeves. Elegant, flattering, and perfect for day-to-night styling.
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-medium text-wine">$78.00</span>
          <span className="text-sm text-stone-400 line-through">$98.00</span>
          <span className="text-xs text-wine font-medium">20% OFF</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#B8A89C]/20">
        {highlights.map((highlight) => (
          <div key={highlight.label} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7F3EE] flex items-center justify-center">
              {highlight.icon === "sculpt" && (
                <svg className="w-4 h-4 text-[#6B4F43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3c-4 0-7 3-7 8s3 10 7 10 7-5 7-10-3-8-7-8z" />
                </svg>
              )}
              {highlight.icon === "soft" && (
                <svg className="w-4 h-4 text-[#6B4F43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M8 12c0-2 1.5-3 4-3s4 1 4 3" />
                </svg>
              )}
              {highlight.icon === "stretch" && (
                <svg className="w-4 h-4 text-[#6B4F43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12h16M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" />
                </svg>
              )}
              {highlight.icon === "seamless" && (
                <svg className="w-4 h-4 text-[#6B4F43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-[#1E1E1E]">{highlight.label}</p>
              <p className="text-[10px] text-[#B8A89C]">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Color Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#1E1E1E]">
            Color: <span className="font-medium">{selectedColor.name}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => color.inStock && setSelectedColor(color)}
              disabled={!color.inStock}
              className={`relative w-8 h-8 rounded-full transition-all ${
                selectedColor.name === color.name
                  ? "ring-2 ring-[#6B4F43] ring-offset-2"
                  : "ring-1 ring-[#B8A89C]/30"
              } ${!color.inStock ? "opacity-40" : "hover:ring-[#B8A89C]"}`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {!color.inStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-px bg-[#1E1E1E] rotate-45 absolute" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#1E1E1E]">
            Size: {selectedSize && <span className="font-medium">{selectedSize}</span>}
          </span>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="flex items-center gap-1 text-xs text-[#6B4F43] hover:underline"
          >
            <Ruler className="w-3 h-3" />
            Size Guide
          </button>
        </div>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => size.inStock && setSelectedSize(size.name)}
              disabled={!size.inStock}
              className={`w-12 h-12 text-sm transition-all ${
                selectedSize === size.name
                  ? "bg-[#1E1E1E] text-white"
                  : size.inStock
                  ? "bg-[#F7F3EE] text-[#1E1E1E] hover:bg-[#B8A89C]/20"
                  : "bg-[#F7F3EE] text-[#B8A89C] line-through cursor-not-allowed"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#B8A89C] mt-2">
          Model is 5&apos;9&quot; / 175cm wearing size S
        </p>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3">
        <Button
          className="flex-1 h-14 bg-[#1E1E1E] hover:bg-[#6B4F43] text-white text-sm tracking-wide transition-colors"
          disabled={!selectedSize}
        >
          {selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
        </Button>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-14 h-14 flex items-center justify-center border transition-colors ${
            isWishlisted
              ? "bg-[#6B4F43] border-[#6B4F43] text-white"
              : "border-[#B8A89C]/30 text-[#1E1E1E] hover:border-[#6B4F43]"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
        </button>
      </div>

      {/* Trust Elements */}
      <div className="flex flex-col gap-2 py-4 border-y border-[#B8A89C]/20">
        <div className="flex items-center gap-2 text-xs text-[#1E1E1E]">
          <Truck className="w-4 h-4 text-[#6B4F43]" />
          <span>Free shipping on orders over $75</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#1E1E1E]">
          <RotateCcw className="w-4 h-4 text-[#6B4F43]" />
          <span>Free 30-day returns & exchanges</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#1E1E1E]">
          <Shield className="w-4 h-4 text-[#6B4F43]" />
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>

      {/* Accordion Sections */}
      <ProductAccordion />
    </div>
  );
}

function ProductAccordion() {
  const [openSection, setOpenSection] = useState<string | null>("details");

  const sections = [
    {
      id: "details",
      title: "Product Details",
      content: (
        <ul className="text-sm text-[#1E1E1E] space-y-1">
          <li>- Sculpting seamless bodysuit</li>
          <li>- Second-skin fit that smooths and contours</li>
          <li>- Square neckline with thin straps</li>
          <li>- Snap closure at gusset for convenience</li>
          <li>- 4-way stretch for unrestricted movement</li>
          <li>- Moisture-wicking technology</li>
        </ul>
      ),
    },
    {
      id: "fabric",
      title: "Fabric & Care",
      content: (
        <div className="text-sm text-[#1E1E1E] space-y-2">
          <p><strong>Fabric:</strong> 78% Nylon, 22% Spandex</p>
          <p><strong>Care:</strong> Machine wash cold with like colors. Lay flat to dry. Do not bleach or iron.</p>
        </div>
      ),
    },
    {
      id: "fit",
      title: "Fit & Sizing",
      content: (
        <div className="text-sm text-[#1E1E1E] space-y-2">
          <p>This style is designed to fit close to the body with a sculpting effect. If between sizes, we recommend sizing up for a more relaxed fit.</p>
          <p><strong>Model:</strong> 5&apos;9&quot; / 175cm, wearing size S</p>
          <p><strong>True to size:</strong> 92% of customers agree</p>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: (
        <div className="text-sm text-[#1E1E1E] space-y-2">
          <p><strong>Standard Shipping:</strong> 5-7 business days (Free over $75)</p>
          <p><strong>Express Shipping:</strong> 2-3 business days ($12)</p>
          <p><strong>Returns:</strong> Free returns within 30 days. Items must be unworn with tags attached.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-[#B8A89C]/20">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-[#B8A89C]/20">
          <button
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            className="w-full flex items-center justify-between py-4 text-sm font-medium text-[#1E1E1E]"
          >
            {section.title}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openSection === section.id ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === section.id && (
            <div className="pb-4">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
