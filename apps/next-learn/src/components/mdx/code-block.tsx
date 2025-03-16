'use client'

import React from 'react'
import { Highlight, themes, type PrismTheme } from 'prism-react-renderer'
import { useTheme } from 'next-themes'

interface CodeBlockProps {
	code: string
	language: string
	filename?: string
	showLineNumbers?: boolean
	highlight?: string // comma-separated line numbers to highlight
}

export function CodeBlock({
	code,
	language,
	filename,
	showLineNumbers = false,
	highlight = '',
}: CodeBlockProps) {
	const { resolvedTheme } = useTheme()
	const theme = resolvedTheme === 'dark' ? themes.nightOwl : themes.github

	// Parse highlight string to get array of line numbers
	const highlightLines = highlight
		? highlight.split(',').map((num) => parseInt(num.trim(), 10))
		: []

	return (
		<div className="code-block rounded-lg overflow-hidden my-6">
			{filename && (
				<div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono border-b border-gray-700">
					{filename}
				</div>
			)}
			<Highlight theme={theme as PrismTheme} code={code.trim()} language={language as any}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={`${className} text-sm p-4 overflow-auto`} style={style}>
						{tokens.map((line, i) => {
							const lineNumber = i + 1
							const isHighlighted = highlightLines.includes(lineNumber)

							return (
								<div
									key={i}
									{...getLineProps({ line, key: i })}
									className={`${isHighlighted ? 'bg-blue-500/10 border-l-2 border-blue-500 pl-2 -ml-2' : ''}`}
								>
									{showLineNumbers && (
										<span className="inline-block w-10 text-right mr-4 text-gray-500 select-none">
											{lineNumber}
										</span>
									)}
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token, key })} />
									))}
								</div>
							)
						})}
					</pre>
				)}
			</Highlight>
		</div>
	)
}
