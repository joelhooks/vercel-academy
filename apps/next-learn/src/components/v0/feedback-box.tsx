import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function FeedbackBox({ prompt }: { prompt: string }) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{prompt}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Share your thoughts..." className="min-h-[100px]" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  )
}
