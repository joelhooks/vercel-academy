import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface FurtherReadingLink {
  title: string
  url: string
  description?: string
}

interface FurtherReadingProps {
  title: string
  description?: string
  links: FurtherReadingLink[]
  className?: string
}

export function FurtherReading({ title, description, links, className }: FurtherReadingProps) {
  return (
    <div className={cn("my-6", className)}>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index} className="flex items-start gap-3">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              {link.title}
              <ExternalLink className="h-4 w-4" />
            </a>
            {link.description && <p className="text-muted-foreground">{link.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
