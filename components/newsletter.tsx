"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium">
            Join the BAMTAE Community
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Be first to shop new drops, best sellers, and exclusive launches. 
            Plus, enjoy 10% off your first order.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 rounded-full bg-primary-foreground/10 border-primary-foreground/30 placeholder:text-primary-foreground/50 text-primary-foreground"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="rounded-full px-8 h-12"
            >
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-sm text-primary-foreground/60">
            By subscribing, you agree to receive marketing emails from BAMTAE.
          </p>
        </div>
      </div>
    </section>
  )
}
