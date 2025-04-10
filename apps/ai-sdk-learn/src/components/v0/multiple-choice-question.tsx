"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Choice {
  id: string
  text: string
}

export interface MultipleChoiceQuestionProps {
  question: string
  choices: Choice[]
  correctAnswerId: string
  feedback: {
    correct: string
    incorrect: string
  }
  className?: string
}

export function MultipleChoiceQuestion({
  question,
  choices,
  correctAnswerId,
  feedback,
  className,
}: MultipleChoiceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (!selectedAnswer) return

    const correct = selectedAnswer === correctAnswerId
    setIsCorrect(correct)
    setIsSubmitted(true)
  }

  const resetQuestion = () => {
    setSelectedAnswer(null)
    setIsSubmitted(false)
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-primary/20 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm",
        className,
      )}
    >
      {/* Question header */}
      <div className="bg-primary/10 px-6 py-4 border-b-2 border-primary/20">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
          <h4 className="text-lg font-medium leading-tight">{question}</h4>
        </div>
      </div>

      {/* Choices */}
      <div className="p-6">
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={setSelectedAnswer}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {choices.map((choice) => (
            <div
              key={choice.id}
              className={cn(
                "relative flex items-start rounded-lg border-2 p-4 transition-colors",
                isSubmitted &&
                  choice.id === correctAnswerId &&
                  "bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-700",
                isSubmitted &&
                  selectedAnswer === choice.id &&
                  choice.id !== correctAnswerId &&
                  "bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-700",
                !isSubmitted && selectedAnswer === choice.id && "border-primary/40 bg-primary/5",
                !isSubmitted &&
                  selectedAnswer !== choice.id &&
                  "border-border hover:border-primary/30 hover:bg-muted/50 cursor-pointer",
              )}
            >
              <div className="flex items-center h-5 mt-0.5">
                <RadioGroupItem
                  value={choice.id}
                  id={choice.id}
                  className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
                />
              </div>
              <div className="ml-3 flex-grow">
                <Label
                  htmlFor={choice.id}
                  className={cn(
                    "text-base cursor-pointer",
                    (isSubmitted && choice.id === correctAnswerId) || selectedAnswer === choice.id
                      ? "font-medium"
                      : "font-normal",
                  )}
                >
                  {choice.text}
                </Label>
              </div>
              {isSubmitted && choice.id === correctAnswerId && (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 ml-2" />
              )}
              {isSubmitted && selectedAnswer === choice.id && choice.id !== correctAnswerId && (
                <XCircle className="h-5 w-5 text-red-500 shrink-0 ml-2" />
              )}
            </div>
          ))}
        </RadioGroup>

        {/* Feedback section */}
        {isSubmitted && (
          <div
            className={cn(
              "mt-6 p-5 rounded-lg text-base border-2",
              isCorrect
                ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-300 dark:border-green-700"
                : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200 border-red-300 dark:border-red-700",
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h5 className="font-semibold">Correct!</h5>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h5 className="font-semibold">Not quite right</h5>
                </>
              )}
            </div>
            <p>{isCorrect ? feedback.correct : feedback.incorrect}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end mt-6">
          {isSubmitted ? (
            <Button variant="outline" onClick={resetQuestion} className="px-5">
              Try Again
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="px-5">
              Check Answer
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
