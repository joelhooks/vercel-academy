import mdxOptions from '@/mdx/mdx-options'
import { serialize } from 'next-mdx-remote/serialize'

/**
 * Serialize MDX content with the rehype-mdx-code-props plugin
 * This enables code block metadata to be properly passed as props
 */
export async function serializeMdx(content: string) {
	return serialize(content, {
		mdxOptions,
	})
}
