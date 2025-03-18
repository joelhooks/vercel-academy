import React from 'react'

export function CodeBlock(props: { children: React.ReactNode; filename?: string }) {
	// Extract the important props
	const { children, filename } = props

	// Simple styling for the code block
	return (
		<div className="not-prose">
			{filename && <div>{filename}</div>}
			<pre className="overflow-x-auto">{children}</pre>
		</div>
	)
}
