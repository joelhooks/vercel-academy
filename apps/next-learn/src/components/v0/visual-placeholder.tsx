import { ImageIcon } from "lucide-react"

interface VisualPlaceholderProps {
  description: string
  className?: string
}

export function VisualPlaceholder({ description, className = "" }: VisualPlaceholderProps) {
  return (
    <div className={`bg-muted border border-border rounded-lg p-6 my-6 ${className}`}>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-primary/10 rounded-full p-3">
          <ImageIcon className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
