import type React from "react"
import { Info, Trophy, Lightbulb, BookMarked } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  title?: string
  type?: string
}

export function Callout({ children, className, icon, title, type }: CalloutProps) {
  // Select icon based on callout type
  const calloutIcon = icon ||
    {
      challenge: <Trophy className="h-5 w-5" />,
      takeaway: <BookMarked className="h-5 w-5" />,
      info: <Info className="h-5 w-5" />,
      tip: <Lightbulb className="h-5 w-5" />,
    }[type || "info"] || <Info className="h-5 w-5" />

  return (
    <div className={cn("bg-primary/5 border-l-4 border-primary p-5 rounded-r-lg my-6", className)}>
      <div className="flex items-start gap-3">
        <div className="text-primary shrink-0 mt-0.5">{calloutIcon}</div>
        <div>
          {title && <h4 className="font-medium mb-1">{title}</h4>}
          <div className="text-base">{children}</div>
        </div>
      </div>
    </div>
  )
}
