"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Mesh Corset Body",
    price: 82,
    originalPrice: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6mA3aVAaXSWggeKksI1lr4qNpo3ryg.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ONt1UYQRwsTPDfGaXza53BV74O0BgM.png",
    colors: ["#1E1E1E", "#D8B7A4"],
    badge: "NEW",
  },
  {
    id: 2,
    name: "Twist Front Body",
    price: 74,
    originalPrice: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ckpPkv30oqVjPcWhN4u8HYxlKuk19.png",
    colors: ["#1E1E1E", "#6B4F43"],
    badge: null,
  },
  {
    id: 3,
    name: "White Off-Shoulder Body",
    price: 76,
    originalPrice: 95,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jsHk980KYNQ7FavEIndZAnulfL8j9D.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png",
    colors: ["#FFFFFF", "#F5F0E8"],
    badge: "SALE",
  },
  {
    id: 4,
    name: "Strapless Mesh Body",
    price: 86,
    originalPrice: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ckpPkv30oqVjPcWhN4u8HYxlKuk19.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5wwjBHhneRLR53vdFplqz2rPJCsaYC.png",
    colors: ["#1E1E1E", "#6B4F43", "#F5F0E8"],
    badge: "BEST SELLER",
  },
  {
    id: 5,
    name: "Sheer Mesh Body",
    price: 72,
    originalPrice: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KGzGTpR0nTXbHM74Alg7PtnWlMwiMD.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ObqqjBgkSyxuFtTNlAlpNCdgg0lvyT.png",
    colors: ["#F5E6A0", "#FFFFFF", "#1E1E1E"],
    badge: null,
  },
  {
    id: 6,
    name: "Contrast Trim Body",
    price: 78,
    originalPrice: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LvS4sHUtr1sLErQxDvExZu2niGVfcN.png",
    hoverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IFtpVrEegkFZ58efUAiIqq8HWQ7ZXY.png",
    colors: ["#1E1E1E", "#FFFFFF"],
    badge: "NEW",
  },
];

export function RelatedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E]">
            You May Also Like
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-[#B8A89C]/30 flex items-center justify-center hover:border-[#6B4F43] hover:bg-[#F7F3EE] transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5 text-[#1E1E1E]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-[#B8A89C]/30 flex items-center justify-center hover:border-[#6B4F43] hover:bg-[#F7F3EE] transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5 text-[#1E1E1E]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href="/product"
              className="flex-shrink-0 w-[280px] group"
            >
              <div className="relative aspect-[3/4] bg-[#F7F3EE] overflow-hidden mb-4">
                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] tracking-wider px-2 py-0.5 z-10 ${
                      product.badge === "SALE"
                        ? "bg-[#6B4F43] text-white"
                        : product.badge === "BEST SELLER"
                        ? "bg-[#1E1E1E] text-white"
                        : "bg-white text-[#1E1E1E]"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-[#1E1E1E]" />
                </button>

                {/* Images */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} alternate view`}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Quick Add */}
                <button className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm py-2.5 text-xs text-[#1E1E1E] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1E1E1E] hover:text-white">
                  Quick Add
                </button>
              </div>

              {/* Colors */}
              <div className="flex gap-1 mb-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="w-3 h-3 rounded-full ring-1 ring-[#B8A89C]/30"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Info */}
              <h3 className="text-sm text-[#1E1E1E] mb-1 group-hover:text-[#6B4F43] transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#1E1E1E]">${product.price}.00</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#B8A89C] line-through">
                    ${product.originalPrice}.00
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
