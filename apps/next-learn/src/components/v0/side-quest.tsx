import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SideQuestProps {
  title: string
  description?: string
  steps?: string[]
  challenge?: string
  code?: string
  children?: ReactNode
  className?: string
}

export function SideQuest({ title, description, steps, challenge, code, children, className }: SideQuestProps) {
  return (
    <div className={cn("my-8 border rounded-lg overflow-hidden", className)}>
      <div className="bg-primary/10 p-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span>🧩</span> {title}
        </h3>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="p-4 bg-card">
        {steps && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Try these steps:</h4>
            <ol className="list-decimal pl-6 space-y-1">
              {steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {challenge && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Challenge:</h4>
            <p>{challenge}</p>
          </div>
        )}

        {code && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Example:</h4>
            <pre className="bg-black text-white p-3 rounded-md overflow-auto text-sm">{code}</pre>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}
