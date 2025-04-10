"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface DetailsProps {
  summary: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function Details({ summary, children, defaultOpen = false, className = "" }: DetailsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("border rounded-lg overflow-hidden my-6", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-muted/50 px-4 py-3 text-left font-medium"
      >
        <span>{summary}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && <div className="p-4 bg-card">{children}</div>}
    </div>
  )
}
