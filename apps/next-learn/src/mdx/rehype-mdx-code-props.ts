import { type Root } from 'hast'
import { propertiesToMdxJsxAttributes } from 'hast-util-properties-to-mdx-jsx-attributes'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxFromMarkdown } from 'mdast-util-mdx'
import { type MdxJsxFlowElementHast } from 'mdast-util-mdx-jsx'
import { mdxjs } from 'micromark-extension-mdxjs'
import { type Plugin } from 'unified'
import { visitParents } from 'unist-util-visit-parents'

/**
 * Helper function to extract text content from a node
 */
function getTextContent(node: any): string {
	if (node.value) {
		return node.value
	}

	if (node.children) {
		return node.children.map(getTextContent).join('')
	}

	return ''
}

export interface RehypeMdxCodePropsOptions {
	/**
	 * The casing to use for attribute names.
	 *
	 * This should match the `elementAttributeNameCase` value passed to MDX.
	 *
	 * @default 'react'
	 * @see https://mdxjs.com/packages/mdx/#processoroptions
	 */
	elementAttributeNameCase?: 'html' | 'react'

	/**
	 * The tag name to add the attributes to.
	 *
	 * @default 'pre'
	 */
	tagName?: 'code' | 'pre'
}

/**
 * An MDX rehype plugin for transforming markdown code meta into JSX props.
 * This enhanced version properly handles highlight ranges and language extraction.
 */
const rehypeMdxCodeProps: Plugin<[RehypeMdxCodePropsOptions?], Root> = ({
	elementAttributeNameCase = 'react',
	tagName = 'pre',
} = {}) => {
	if (tagName !== 'code' && tagName !== 'pre') {
		throw new Error(`Expected tagName to be 'code' or 'pre', got: ${tagName}`)
	}

	return (tree) => {
		visitParents(tree, 'element', (node: any, ancestors: any) => {
			if (node.tagName !== 'code') {
				return
			}

			// Extract language from className if it exists
			const languageClass = node.properties?.className?.find((cls: string) =>
				cls.startsWith('language-'),
			)
			const language = languageClass ? languageClass.replace('language-', '') : undefined

			const meta = node.data?.meta
			if (!meta) {
				return
			}

			let child = node
			let parent = ancestors.at(-1)!

			if (tagName === 'pre') {
				if (parent.type !== 'element') {
					return
				}

				if (parent.tagName !== 'pre') {
					return
				}

				if (parent.children.length !== 1) {
					return
				}

				child = parent
				parent = ancestors.at(-2)!
			}

			// Extract the actual code content from the node
			const codeContent = getTextContent(node)

			// Enhanced handling for highlight ranges in different formats
			let processedMeta = meta || ''

			// Extract filename from meta if it exists
			// Look for patterns like filename="example.js" or filename=example.js
			let filename: string | undefined
			const filenameMatch = meta.match(/filename=["']?([^"'\s]+)["']?/)
			if (filenameMatch) {
				filename = filenameMatch[1]
			} else {
				// Try to extract filename from format like ```filename.js
				// This would be in the meta or in a data attribute
				const formatMatch = meta.match(/^([^:\s]+\.[a-zA-Z0-9]+)/)
				if (formatMatch) {
					filename = formatMatch[1]
				}
			}

			// Add filename to meta if we found it
			if (filename && !processedMeta.includes('filename=')) {
				processedMeta = processedMeta
					? `${processedMeta} filename="${filename}"`
					: `filename="${filename}"`
			}

			// Match highlight={x} patterns
			const highlightMatch = meta?.match(/highlight=\{([^}]+)\}/)
			if (highlightMatch) {
				const highlightValue = highlightMatch[1]
				// Keep the original format, the CodeBlock component will parse it
				processedMeta = processedMeta.replace(
					/highlight=\{([^}]+)\}/,
					`highlight="${highlightValue}"`,
				)
			}

			// Add language to meta if it exists
			if (language && !processedMeta.includes('language=')) {
				processedMeta = processedMeta
					? `${processedMeta} language="${language}"`
					: `language="${language}"`
			}

			// Add code content to meta using Base64 encoding to avoid parsing issues
			if (codeContent) {
				// Use Buffer in Node.js or btoa in browser to encode to Base64
				// NOTE: This content is Base64 encoded and needs to be decoded
				// in the consuming component with Buffer.from(encodedContent, 'base64').toString()
				// or atob(encodedContent) in the browser
				const encodedContent =
					typeof Buffer !== 'undefined'
						? Buffer.from(codeContent).toString('base64')
						: btoa(codeContent)

				processedMeta = processedMeta
					? `${processedMeta} codeContent="${encodedContent}"`
					: `codeContent="${encodedContent}"`
			}

			try {
				// Ensure processedMeta is properly formed for JSX
				// Remove any trailing spaces and ensure proper quoting
				processedMeta = processedMeta.trim()

				const mdxTag = `<${child.tagName} ${processedMeta} />`

				const replacement = fromMarkdown(mdxTag, {
					extensions: [mdxjs()],
					mdastExtensions: [mdxFromMarkdown()],
				}).children[0] as MdxJsxFlowElementHast

				replacement.children = child.children
				replacement.data = child.data
				replacement.position = child.position
				replacement.attributes.unshift(
					...propertiesToMdxJsxAttributes(child.properties, { elementAttributeNameCase }),
				)

				parent.children[parent.children.indexOf(child)] = replacement
			} catch (error) {
				console.error('Error processing code meta for:', {
					meta: processedMeta,
					language,
					filename,
					error,
				})
				// If parsing fails, keep the original node and do not modify it
			}
		})
	}
}

export default rehypeMdxCodeProps
