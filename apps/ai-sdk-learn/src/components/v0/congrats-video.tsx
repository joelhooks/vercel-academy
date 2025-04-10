import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"

interface CongratsVideoProps {
  title: string
  description: string
  videoUrl: string
}

export function CongratsVideo({ title, description, videoUrl }: CongratsVideoProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-video bg-muted flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/50 z-10" />
          <div className="relative z-20 text-center p-8">
            <div className="bg-primary/90 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary transition-colors">
              <Play className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground">
              Video placeholder - In a real course, this would be a congratulatory video from the CEO
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
