import { type Root } from 'hast'
import { propertiesToMdxJsxAttributes } from 'hast-util-properties-to-mdx-jsx-attributes'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxFromMarkdown } from 'mdast-util-mdx'
import { type MdxJsxFlowElementHast } from 'mdast-util-mdx-jsx'
import { mdxjs } from 'micromark-extension-mdxjs'
import { type Plugin } from 'unified'
import { visitParents } from 'unist-util-visit-parents'

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
 * This enhanced version properly handles highlight ranges.
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

			const meta = node.data?.meta
			if (typeof meta !== 'string' || !meta) {
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

			// Enhanced handling for highlight ranges in different formats
			let processedMeta = meta

			// Match highlight={x} patterns
			const highlightMatch = meta.match(/highlight=\{([^}]+)\}/)
			if (highlightMatch) {
				const highlightValue = highlightMatch[1]
				// Keep the original format, the CodeBlock component will parse it
				processedMeta = meta.replace(/highlight=\{([^}]+)\}/, `highlight="${highlightValue}"`)
			}

			try {
				const replacement = fromMarkdown(`<${child.tagName} ${processedMeta} />`, {
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
				console.error('Error processing code meta:', error)
				// If parsing fails, keep the original node
			}
		})
	}
}

export default rehypeMdxCodeProps
