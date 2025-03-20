import { ModuleProgressProvider } from '@/components/providers/module-progress-provider'
import { auth } from '@/auth'
import { getProgressForModule } from '@/server/progress/user-progress'
import { ChapterCompletion } from './chapter-completion'

interface ChapterCompletionProps {
	lessonId: string
	moduleSlug: string
	currentLessonNumber: number
	lang?: string
}

export async function ChapterProgress({
	lessonId,
	moduleSlug,
	currentLessonNumber,
	lang,
}: ChapterCompletionProps) {
	const session = await auth()
	const userId = session?.user?.id

	const moduleProgressLoader = getProgressForModule({
		userId,
		moduleId: moduleSlug,
	})

	return (
		<ModuleProgressProvider moduleProgressLoader={moduleProgressLoader}>
			<ChapterCompletion
				lessonId={lessonId}
				moduleSlug={moduleSlug}
				currentLessonNumber={currentLessonNumber}
				lang={lang}
			/>
		</ModuleProgressProvider>
	)
}
