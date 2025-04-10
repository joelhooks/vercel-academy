import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DeepDiveProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function DeepDive({ title, description, children, className }: DeepDiveProps) {
  return (
    <div className={cn("my-8 border rounded-lg overflow-hidden", className)}>
      <div className="bg-primary/10 p-4 border-b">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="p-4 bg-card">{children}</div>
    </div>
  )
}
