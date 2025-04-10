import { Callout } from '@/components/v0/callout'
import { Code } from './code'
import { InThisChapter } from './in-this-chapter'
import { MdxImage } from './mdx-image'
import { Quiz } from './quiz'
import { Reveal } from './reveal'
import { Step, Steps } from './steps'
import { Tabs } from './tabs'
import { Card as MdxCard } from './card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FurtherReading } from '@/components/v0/further-reading'
import { MultipleChoiceQuestion } from '@/components/v0/multiple-choice-question'
import { CodeBlock } from '@/components/v0/code-block'
import { VideoPlaceholder } from '@/components/v0/video-placeholder'
import { VisualPlaceholder } from '@/components/v0/visual-placeholder'
import { TokenPredictionDiagram } from '@/components/v0/token-prediction-diagram'
import { SetupChecklist } from '@/components/v0/setup-checklist'
import { Details } from '@/components/v0/details'
import { ProjectShowcase } from '@/components/v0/project-showcase'
import { CongratsVideo } from '@/components/v0/congrats-video'
import { InlinePromptUI } from '@/components/v0/inline-prompt-ui'
import { ICODBreakdown } from '@/components/v0/icod-breakdown'
import { TalladegaNightsImage } from '@/components/v0/talladega-nights-image'
import { SideQuest } from '@/components/v0/side-quest'
import { DeepDive } from '@/components/v0/deep-dive'
import { V0PromptLink } from '@/components/v0/v0-prompt-link'
import { Exploration } from '@/components/v0/exploration'
import { InlineMultilinePromptUI } from '@/components/v0/inline-multiline-prompt-ui'
import { GeneratedCard } from '@/components/v0/generated-card'
import { ExternalLink } from 'lucide-react'

export default {
	Image: MdxImage,
	InThisChapter: InThisChapter,
	Quiz: Quiz,
	Reveal: Reveal,
	Steps: Steps,
	Step: Step,
	pre: Code,
	Tabs: Tabs,
	Card: MdxCard,
	Button: Button,
	Textarea: Textarea,
	Input: Input,
	CardHeader: CardHeader,
	CardTitle: CardTitle,
	CardContent: CardContent,
	Callout: Callout,
	FurtherReading: FurtherReading,
	MultipleChoiceQuestion: MultipleChoiceQuestion,
	CodeBlock: CodeBlock,
	VideoPlaceholder: VideoPlaceholder,
	VisualPlaceholder: VisualPlaceholder,
	TokenPredictionDiagram: TokenPredictionDiagram,
	SetupChecklist: SetupChecklist,
	Details: Details,
	ProjectShowcase: ProjectShowcase,
	CongratsVideo: CongratsVideo,
	InlinePromptUI: InlinePromptUI,
	ICODBreakdown: ICODBreakdown,
	TalladegaNightsImage: TalladegaNightsImage,
	SideQuest: SideQuest,
	DeepDive: DeepDive,
	V0PromptLink: V0PromptLink,
	Exploration: Exploration,
	InlineMultilinePromptUI: InlineMultilinePromptUI,
	GeneratedCard: GeneratedCard,
	ExternalLink: ExternalLink,
}
