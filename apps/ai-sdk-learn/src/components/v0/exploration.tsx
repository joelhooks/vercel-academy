import React from 'react'

interface ExplorationProps {
	title?: string
	children?: React.ReactNode
}

export function Exploration({ title = 'Explore Further', children }: ExplorationProps) {
	return (
		<div className="my-6 p-4 border rounded-lg bg-secondary/30 border-secondary/50">
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<div className="text-sm text-muted-foreground">
				{children || 'Placeholder for exploration content.'}
			</div>
		</div>
	)
}
