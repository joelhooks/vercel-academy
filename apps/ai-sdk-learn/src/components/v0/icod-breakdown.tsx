import { Check } from "lucide-react"

interface ICODBreakdownProps {
  type: "zero-shot" | "few-shot" | "cot"
}

export function ICODBreakdown({ type }: ICODBreakdownProps) {
  if (type === "few-shot") {
    return (
      <div className="bg-muted p-4 rounded-md text-sm">
        <p className="font-medium mb-2">ICOD Breakdown for Few-Shot Example:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <span className="font-medium">Instruction:</span> Implied - complete the pattern for the new word
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <span className="font-medium">Context:</span> The examples showing definition-to-example pattern
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <span className="font-medium">Output Indicator:</span> Format shown in examples (Word Example: ...)
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-1" />
            <div>
              <span className="font-medium">Data:</span> The new word "Vardudel" and its definition
            </div>
          </li>
        </ul>
      </div>
    )
  }

  return null // Add other types as needed
}
