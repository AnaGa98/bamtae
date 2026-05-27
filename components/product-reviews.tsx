"use client";

import { useState } from "react";
import { Star, ThumbsUp, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    size: "S",
    fit: "True to Size",
    title: "Absolutely obsessed!",
    content:
      "This bodysuit is everything I hoped for and more. The sculpting effect is subtle but noticeable - it smooths everything out without feeling restrictive. I&apos;ve already ordered it in two more colors!",
    helpful: 24,
    images: [],
  },
  {
    id: 2,
    author: "Jessica L.",
    verified: true,
    rating: 5,
    date: "1 month ago",
    size: "M",
    fit: "True to Size",
    title: "Best bodysuit I own",
    content:
      "The fabric is so soft and the fit is perfect. I wear this under blazers, with high-waisted jeans, literally everything. It&apos;s become my go-to piece. Worth every penny.",
    helpful: 18,
    images: [],
  },
  {
    id: 3,
    author: "Amanda K.",
    verified: true,
    rating: 4,
    date: "1 month ago",
    size: "L",
    fit: "True to Size",
    title: "Great quality, runs slightly small",
    content:
      "Love the quality and the sculpting effect is amazing. I normally wear L but this runs a bit snug. If you&apos;re between sizes, I&apos;d recommend sizing up. Otherwise, it&apos;s perfect!",
    helpful: 12,
    images: [],
  },
  {
    id: 4,
    author: "Michelle R.",
    verified: true,
    rating: 5,
    date: "3 weeks ago",
    size: "XS",
    fit: "True to Size",
    title: "So flattering!",
    content:
      "I was nervous about the sculpting aspect but it&apos;s so comfortable. It doesn&apos;t dig in anywhere and the seamless design means no visible panty lines. Highly recommend!",
    helpful: 9,
    images: [],
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 78, count: 100 },
  { stars: 4, percentage: 15, count: 19 },
  { stars: 3, percentage: 5, count: 6 },
  { stars: 2, percentage: 1, count: 2 },
  { stars: 1, percentage: 1, count: 1 },
];

const fitBreakdown = {
  runsSmall: 8,
  trueToSize: 92,
  runsLarge: 0,
};

export function ProductReviews() {
  const [sortBy, setSortBy] = useState("most-helpful");
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="py-16 border-t border-[#B8A89C]/20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-2xl lg:text-3xl text-[#1E1E1E] text-center mb-12">
          Customer Reviews
        </h2>

        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Review Summary */}
          <div className="space-y-8">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="text-4xl font-medium text-[#1E1E1E]">4.8</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4
                          ? "fill-[#6B4F43] text-[#6B4F43]"
                          : "fill-[#D8B7A4] text-[#D8B7A4]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#B8A89C]">Based on 128 reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-xs text-[#1E1E1E] w-8">{item.stars} ★</span>
                  <div className="flex-1 h-2 bg-[#F7F3EE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6B4F43] rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#B8A89C] w-8">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Fit Guide */}
            <div className="bg-[#F7F3EE] p-4">
              <h4 className="text-sm font-medium text-[#1E1E1E] mb-3">How does it fit?</h4>
              <div className="relative h-2 bg-[#B8A89C]/20 rounded-full mb-2">
                <div
                  className="absolute h-full bg-[#6B4F43] rounded-full"
                  style={{
                    left: `${fitBreakdown.runsSmall}%`,
                    width: `${fitBreakdown.trueToSize}%`,
                  }}
                />
                <div
                  className="absolute w-2 h-2 bg-[#1E1E1E] rounded-full top-0"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#B8A89C]">
                <span>Runs Small</span>
                <span>True to Size</span>
                <span>Runs Large</span>
              </div>
              <p className="text-xs text-[#6B4F43] mt-2 text-center">
                {fitBreakdown.trueToSize}% say it&apos;s true to size
              </p>
            </div>

            {/* Write Review CTA */}
            <Button
              variant="outline"
              className="w-full h-12 border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white"
            >
              Write a Review
            </Button>
          </div>

          {/* Reviews List */}
          <div>
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#B8A89C]">
                Showing {displayedReviews.length} of {reviews.length} reviews
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#B8A89C]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs text-[#1E1E1E] bg-transparent border-b border-[#B8A89C]/30 focus:border-[#6B4F43] outline-none pb-1"
                >
                  <option value="most-helpful">Most Helpful</option>
                  <option value="newest">Newest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-[#B8A89C]/20 pb-6 last:border-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[#1E1E1E]">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span className="flex items-center gap-0.5 text-[10px] text-[#6B4F43]">
                            <Check className="w-3 h-3" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "fill-[#6B4F43] text-[#6B4F43]"
                                  : "fill-[#B8A89C]/30 text-[#B8A89C]/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#B8A89C]">{review.date}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-[#B8A89C]">
                      <p>Size: {review.size}</p>
                      <p>{review.fit}</p>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-[#1E1E1E] mb-2">
                    {review.title}
                  </h4>
                  <p className="text-sm text-[#1E1E1E]/80 leading-relaxed mb-3">
                    {review.content}
                  </p>

                  <button className="flex items-center gap-1 text-xs text-[#B8A89C] hover:text-[#6B4F43] transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              ))}
            </div>

            {/* Show More */}
            {!showAll && reviews.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center justify-center gap-1 w-full py-4 text-sm text-[#6B4F43] hover:text-[#1E1E1E] transition-colors"
              >
                Show All Reviews
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
