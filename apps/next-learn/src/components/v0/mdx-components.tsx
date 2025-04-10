import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/components/code-block"
import { MultipleChoiceQuestion } from "@/components/multiple-choice-question"
import { Callout } from "@/components/callout"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use Tailwind Typography's prose classes for basic elements
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium mt-8 mb-3">{children}</h3>,
    p: ({ children }) => <p className="text-lg mb-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 text-lg mb-6">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 text-lg mb-6">{children}</ol>,
    li: ({ children }) => <li className="text-lg">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className="text-primary hover:underline">
        {children}
      </a>
    ),

    // Custom components
    CodeBlock,
    MultipleChoiceQuestion,
    Callout,

    // Pass through any other components
    ...components,
  }
}
