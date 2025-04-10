"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface InlinePromptUIProps {
  id: string
  title: string
  task: string
  initialPrompt: string
  allowMultiline?: boolean
  structuredOutput?: boolean
  schema?: string
}

export function InlinePromptUI({
  id,
  title,
  task,
  initialPrompt,
  allowMultiline = false,
  structuredOutput = false,
  schema,
}: InlinePromptUIProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate AI response with a timeout
    setTimeout(() => {
      // These are simulated responses based on the prompt type
      if (structuredOutput && prompt.includes("appointment") && schema) {
        // Simulate structured output for appointment extraction
        setResponse(
          JSON.stringify(
            {
              title: "Team meeting",
              date: "Tomorrow",
              time: "3pm",
              location: "Conference room",
              attendees: ["Guillermo", "Sarah"],
            },
            null,
            2,
          ),
        )
      } else if (prompt.includes("Extract all names")) {
        setResponse("Guillermo, Lee, Sarah")
      } else if (prompt.includes("sentiment") && prompt.includes("okay")) {
        setResponse("Neutral")
      } else if (prompt.includes("Vardudel") && prompt.includes("Word Example:")) {
        setResponse("Instead of finishing her essay, she spent an hour vardudeling her desk supplies.")
      } else if (prompt.includes("odd numbers") && prompt.includes("[3, 6, 7, 12, 19, 20, 5]")) {
        setResponse(`The odd numbers are 3, 7, 19, 5.
Their sum is 3 + 7 + 19 + 5 = 34.
34 is an even number.
The final answer is: Yes`)
      } else {
        setResponse("This is a simulated response. In a real application, this would call an AI model.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{task}</CardDescription>
      </CardHeader>
      <CardContent>
        {schema && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">Schema:</p>
            <pre className="text-xs font-mono whitespace-pre-wrap">{schema}</pre>
          </div>
        )}
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] font-mono text-sm"
          rows={allowMultiline ? 8 : 3}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "Generating..." : structuredOutput ? "Generate Object" : "Generate Response"}
        </Button>

        {response && (
          <div className="w-full p-4 bg-muted rounded-md">
            <h4 className="text-sm font-medium mb-2">Response{structuredOutput ? " (JSON)" : ""}:</h4>
            <div
              className={`font-mono text-sm whitespace-pre-wrap ${structuredOutput ? "bg-black text-white p-3 rounded" : ""}`}
            >
              {response}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
