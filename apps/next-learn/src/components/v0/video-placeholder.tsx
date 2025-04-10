'use client'

import { useState } from 'react'
import { Play, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoPlaceholderProps {
	title: string
	brief: string
	className?: string
}

export function VideoPlaceholder({ title, brief, className }: VideoPlaceholderProps) {
	const [expanded, setExpanded] = useState(false)

	// Extract the first line as a short description
	const firstLine = brief?.trim()?.split('\n')?.[0]?.replace(/\*\*/g, '').trim() || ''

	return (
		<div className={cn('rounded-lg overflow-hidden border border-border my-8', className)}>
			{/* Video thumbnail area */}
			<div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/50 z-10" />
				<div className="relative z-20 text-center p-8">
					<div className="bg-primary/90 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary transition-colors">
						<Play className="h-8 w-8" />
					</div>
					<h3 className="text-xl font-medium">{title}</h3>
				</div>
			</div>

			{/* Video description area */}
			<div className="bg-card p-4">
				<div className="flex justify-between items-center mb-2">
					<p className="text-sm text-muted-foreground">{firstLine}</p>
					<button
						onClick={() => setExpanded(!expanded)}
						className="text-primary hover:text-primary/80 transition-colors"
						aria-label={expanded ? 'Collapse video details' : 'Expand video details'}
					>
						{expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
					</button>
				</div>

				{expanded && (
					<div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
						<div className="max-h-48 overflow-y-auto pr-2">
							{brief.split('\n').map((line, i) => {
								// Skip the first line as we already displayed it
								if (i === 0) return null

								// Replace **text** with <strong>text</strong>
								const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

								// If line starts with *, treat as list item
								if (line.trim().startsWith('*')) {
									const listItem = line.trim().substring(1).trim()
									const formattedItem = listItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
									return (
										<li
											key={i}
											className="ml-4 mb-1"
											dangerouslySetInnerHTML={{ __html: formattedItem }}
										/>
									)
								}

								return line.trim() ? (
									<p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />
								) : (
									<div key={i} className="h-2" />
								) // Empty line as spacing
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
