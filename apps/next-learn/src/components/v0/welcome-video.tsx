import { Play } from "lucide-react"

export function WelcomeVideo() {
  return (
    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/50 z-10" />
      <div className="relative z-20 text-center p-8">
        <div className="bg-primary/90 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary transition-colors">
          <Play className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-medium">Welcome to the AI SDK Course</h3>
        <p className="text-muted-foreground max-w-md mx-auto mt-2">
          Learn how to build powerful AI applications with the AI SDK
        </p>
      </div>
    </div>
  )
}
