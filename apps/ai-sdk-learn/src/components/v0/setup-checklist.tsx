"use client"

import { useState } from "react"
import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChecklistItem {
  id: string
  text: string
}

interface SetupChecklistProps {
  items: ChecklistItem[]
}

export function SetupChecklist({ items }: SetupChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
      <h4 className="font-medium text-lg mb-4">Setup Checklist</h4>
      <ul className="space-y-3">
        {items.map((item) => {
          const isChecked = checkedItems.includes(item.id)
          return (
            <li key={item.id} className="flex items-start gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5",
                  isChecked ? "border-primary bg-primary text-primary-foreground" : "border-primary/50 bg-background",
                )}
                aria-checked={isChecked}
                role="checkbox"
              >
                {isChecked ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4 opacity-0" />}
              </button>
              <span className={cn(isChecked && "text-muted-foreground line-through")}>{item.text}</span>
            </li>
          )
        })}
      </ul>
      {checkedItems.length === items.length && (
        <div className="mt-4 text-center text-primary font-medium">
          🎉 You're all set! Ready to move on to the next step.
        </div>
      )}
    </div>
  )
}
