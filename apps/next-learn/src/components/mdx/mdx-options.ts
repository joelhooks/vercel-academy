import rehypeMdxCodeProps from '@/rehype-mdx-code-props'
import rehypeHighlight from 'rehype-highlight'
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines'
import { Pluggable } from 'unified'
export default {
	rehypePlugins: [
		rehypeHighlight,
		[rehypeHighlightCodeLines, { showLineNumbers: true }] as Pluggable,
		rehypeMdxCodeProps,
	],
}
