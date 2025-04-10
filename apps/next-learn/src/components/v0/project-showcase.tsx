import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface Project {
  title: string
  url: string
  description: string
}

interface ProjectShowcaseProps {
  title: string
  description: string
  projects: Project[]
}

export function ProjectShowcase({ title, description, projects }: ProjectShowcaseProps) {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{project.description}</CardDescription>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center text-sm"
              >
                Visit {project.title}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
