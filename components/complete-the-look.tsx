"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  {
    id: 1,
    name: "High-Rise Sculpt Legging",
    price: 68,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IFtpVrEegkFZ58efUAiIqq8HWQ7ZXY.png",
    color: "White/Brown",
  },
  {
    id: 2,
    name: "Halter Mini Dress",
    price: 88,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5EWAoLGQtly0mII5QnUtbhZzCg4rs1.png",
    color: "Mocha",
  },
  {
    id: 3,
    name: "White Mini Dress",
    price: 92,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TZZscSspYMSrzQbRQKxjqIAHHvH9BG.png",
    color: "White",
  },
];

export function CompleteTheLook() {
  const mainProduct = { name: "Off-Shoulder Ruched Body", price: 78, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VqgEGUw949HNadnr8kdJcl1AbWUw0H.png" };
  const totalPrice = mainProduct.price + items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="py-16 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E] text-center mb-4">
          Complete the Look
        </h2>
        <p className="text-sm text-[#B8A89C] text-center mb-10">
          Pair it with these curated pieces for the perfect outfit
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Main Product (Current) */}
          <div className="relative bg-white p-4">
            <div className="absolute top-2 left-2 bg-[#6B4F43] text-white text-[10px] tracking-wider px-2 py-0.5 z-10">
              VIEWING
            </div>
            <div className="relative aspect-[3/4] mb-4 bg-[#F7F3EE] overflow-hidden">
              <Image
                src={mainProduct.image}
                alt={mainProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            <h3 className="text-sm font-medium text-[#1E1E1E] mb-1">{mainProduct.name}</h3>
            <p className="text-sm text-[#6B4F43]">${mainProduct.price}.00</p>
          </div>

          {/* Complementary Items */}
          {items.map((item, index) => (
            <div key={item.id} className="relative bg-white p-4 group">
              {index === 0 && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#1E1E1E] rounded-full flex items-center justify-center z-10">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="relative aspect-[3/4] mb-4 bg-[#F7F3EE] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm py-2.5 text-xs text-[#1E1E1E] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1E1E1E] hover:text-white">
                  Quick Add
                </button>
              </div>
              <h3 className="text-sm font-medium text-[#1E1E1E] mb-1">{item.name}</h3>
              <p className="text-xs text-[#B8A89C] mb-1">{item.color}</p>
              <p className="text-sm text-[#6B4F43]">${item.price}.00</p>
            </div>
          ))}
        </div>

        {/* Add All to Bag */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-sm text-[#1E1E1E]">
              Add all 4 items: <span className="font-medium">${totalPrice}.00</span>
            </p>
            <Button className="h-12 px-12 bg-[#1E1E1E] hover:bg-[#6B4F43] text-white text-sm tracking-wide">
              ADD ALL TO BAG
            </Button>
            <p className="text-xs text-[#B8A89C]">Save 15% when you buy the complete look</p>
          </div>
        </div>
      </div>
    </section>
  );
}
