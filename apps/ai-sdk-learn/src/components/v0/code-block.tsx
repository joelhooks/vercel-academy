"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = "javascript", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Split code into lines for line numbers
  const lines = code.split("\n")

  return (
    <div className={cn("rounded-lg overflow-hidden border border-border", className)}>
      <div className="bg-black text-white">
        {/* Header with language and copy button */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">{language}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-md hover:bg-zinc-800 transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
          </button>
        </div>

        {/* Code content with line numbers */}
        <div className="relative overflow-auto p-4">
          <pre className="font-mono text-sm leading-relaxed">
            <code>
              {lines.map((line, lineNumber) => (
                <div key={lineNumber} className="table-row">
                  <span className="table-cell text-right pr-4 text-zinc-500 select-none w-8">{lineNumber + 1}</span>
                  <span className="table-cell whitespace-pre-wrap break-words">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
