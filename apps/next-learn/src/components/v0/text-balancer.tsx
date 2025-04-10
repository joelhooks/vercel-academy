"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface TextBalancerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function TextBalancer({ children, className = "", as: Component = "span" }: TextBalancerProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const balanceText = () => {
      const element = textRef.current
      if (!element) return

      // Reset any previous styles
      element.style.maxWidth = ""
      element.style.marginLeft = ""
      element.style.marginRight = ""

      // Get the parent width
      const parentWidth = element.parentElement?.clientWidth || 0

      // Set a max-width that gets narrower as the text gets longer
      // This helps create more balanced line breaks
      const textLength = element.textContent?.length || 0
      const ratio = Math.min(0.9, Math.max(0.65, 1 - textLength * 0.005))

      element.style.maxWidth = `${parentWidth * ratio}px`
      element.style.marginLeft = "auto"
      element.style.marginRight = "auto"
    }

    balanceText()

    // Rebalance on resize
    window.addEventListener("resize", balanceText)
    return () => window.removeEventListener("resize", balanceText)
  }, [children])

  return (
    <Component ref={textRef} className={`text-balance ${className}`}>
      {children}
    </Component>
  )
}
