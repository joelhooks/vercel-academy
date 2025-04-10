import { ModuleProgressProvider } from '@/components/providers/module-progress-provider'
import { auth } from '@/auth'
import { getProgressForModule } from '@/server/progress/user-progress'
import { ChapterCompletion, type ChapterCompletionProps } from './chapter-completion'

/**
 * ChapterProgress is a server component that is the boundary between the
 * server page and the component that has progress details for the current
 * lesson for a specific user if logged in.
 * @param props
 */
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
