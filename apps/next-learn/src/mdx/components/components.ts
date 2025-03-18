import { Callout } from './callout'
import { CodeBlock } from './code-block'
import { InThisChapter } from './in-this-chapter'
import { MdxImage } from './mdx-image'
import { Quiz } from './quiz'
import { Reveal } from './reveal'
import { Step } from './steps'
import { Steps } from './steps'
import { Tabs } from './tabs'
import { Card as MdxCard } from './card'

export default {
	Image: MdxImage,
	InThisChapter: InThisChapter,
	Quiz: Quiz,
	Reveal: Reveal,
	Callout: Callout,
	Steps: Steps,
	Step: Step,
	// Map pre tags directly to CodeBlock
	pre: CodeBlock,
	Tabs: Tabs,
	Card: MdxCard,
}
