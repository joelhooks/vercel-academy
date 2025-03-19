'use client'
import {
	CodeBlock,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockHeader,
} from '@/components/ui/code-block'
import { SiTypescript } from '@icons-pack/react-simple-icons'
import React, { useMemo } from 'react'

export function Code(props: {
	children: React.ReactNode
	filename?: string
	language?: string
	code?: string
	codeContent?: string // Base64 encoded content
}) {
	// Decode Base64 content if available
	const decodedCode = useMemo(() => {
		if (props.codeContent) {
			try {
				// Check for browser or Node.js environment
				return typeof window !== 'undefined'
					? atob(props.codeContent)
					: Buffer.from(props.codeContent, 'base64').toString()
			} catch (e) {
				console.error('Failed to decode code content:', e)
				return props.code // Fallback to raw code if available
			}
		}
		return props.code
	}, [props.codeContent, props.code])

	console.log(props.children)
	return (
		<CodeBlock defaultValue={props.language}>
			<CodeBlockHeader>
				<CodeBlockFilename key={props.language} value={props.language}>
					{props.filename}
				</CodeBlockFilename>
				<CodeBlockCopyButton
					overrideValue={decodedCode}
					onCopy={() => console.log(`Copied "${props.language}" to clipboard`)}
					onError={() => console.error(`Failed to copy "${props.language}" to clipboard`)}
				/>
			</CodeBlockHeader>
			<CodeBlockHeader>
				<CodeBlockFilename icon={SiTypescript} value={props.filename} />
			</CodeBlockHeader>
			<pre className="not-prose overflow-x-auto">{props.children}</pre>
		</CodeBlock>
	)
}
