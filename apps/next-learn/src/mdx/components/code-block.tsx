'use client'

import React from 'react'

export function CodeBlock(props: any) {
	// Extract the important props
	const { children, filename } = props

	// Simple styling for the code block
	return (
		<div className="not-prose bg-[#0d1117]">
			{filename && <div className="bg-[#0d1117]">{filename}</div>}
			<pre className="overflow-x-auto">{children}</pre>
		</div>
	)
}
