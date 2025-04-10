import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface InlineMultilinePromptUIProps {
	// Define any props needed for this placeholder
	placeholder?: string
}

export function InlineMultilinePromptUI({
	placeholder = 'Enter multiline prompt...',
}: InlineMultilinePromptUIProps) {
	return (
		<div className="my-4 p-3 border rounded-md bg-background">
			<Textarea placeholder={placeholder} className="mb-2 min-h-[60px]" />
			<Button size="sm" disabled>
				Submit (Placeholder)
			</Button>
			<p className="text-xs text-muted-foreground mt-1">Inline Multiline Prompt UI Placeholder</p>
		</div>
	)
}
