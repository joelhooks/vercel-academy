"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Section = {
  title: string
  lessons: {
    title: string
    slug: string
  }[]
}

const courseStructure: Section[] = [
  {
    title: "Section 1: Laying the Foundation - AI SDK Fundamentals",
    lessons: [
      { title: "Welcome to AI for Builders", slug: "/" },
      { title: "LLMs: Your Builder's API", slug: "/lessons/llms-your-builders-api" },
      { title: "The Power (and Nuances) of Prompting", slug: "/lessons/power-of-prompting" },
      { title: "Project Setup - Get Your Hands Dirty", slug: "/lessons/project-setup" },
      { title: "Extraction - Your First AI Script", slug: "/lessons/extraction-first-script" },
    ],
  },
  {
    title: "Section 2: Invisible AI - Making Apps Magically Better",
    lessons: [
      { title: "What is Invisible AI?", slug: "/lessons/what-is-invisible-ai" },
      { title: "Classification - Structuring Unstructured Data", slug: "/lessons/classification" },
      { title: "Summarization - Condensing Information Overload", slug: "/lessons/summarization" },
      { title: "Structured Extraction for App Enhancement", slug: "/lessons/structured-extraction" },
      { title: "[Bonus] Supercharge your UI with Vercel v0", slug: "/lessons/supercharge-with-v0" },
    ],
  },
  {
    title: "Section 3: Chat - Conversational AI & Beyond",
    lessons: [
      { title: "Building a Basic Chatbot", slug: "/lessons/basic-chatbot" },
      { title: "System Prompts - Shaping AI Personality", slug: "/lessons/system-prompts" },
      { title: "Adding Tools - Connecting to the Real World", slug: "/lessons/adding-tools" },
      { title: "Multi-Step Conversations & Generative UI", slug: "/lessons/multi-step-conversations" },
      { title: "Next Steps & Resources", slug: "/lessons/next-steps" },
    ],
  },
]

export function CourseSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<number[]>([0, 1, 2]) // All sections open by default
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSection = (index: number) => {
    setOpenSections((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu} className="bg-background">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r border-border z-20 transition-all duration-300 overflow-y-auto",
          "w-72 md:w-64 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 pt-16 md:pt-4">
          <h2 className="font-bold text-lg mb-4">Course Navigation</h2>
          <nav>
            {courseStructure.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="flex items-center gap-2 w-full text-left font-medium py-2 hover:text-primary transition-colors"
                >
                  {openSections.includes(sectionIndex) ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                  <span className="text-sm">{section.title}</span>
                </button>

                {openSections.includes(sectionIndex) && (
                  <ul className="ml-6 space-y-1 mt-1">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex}>
                        <Link
                          href={lesson.slug}
                          className={cn(
                            "block py-1.5 px-2 text-sm rounded-md transition-colors",
                            pathname === lesson.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
