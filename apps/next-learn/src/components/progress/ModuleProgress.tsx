import { ProgressIndicator } from './ProgressIndicator'
import { ResourceTitle } from '../ResourceTitle'
import { getAllProgressForUser } from '@/lib/data/progress'
import { getSectionsByModuleId, getLessonsBySectionId } from '@/lib/data/content-resources'

interface ModuleProgressProps {
	userId: string
	moduleId: string
	locale?: string
	className?: string
}

export async function ModuleProgress({
	userId,
	moduleId,
	locale = 'en',
	className = '',
}: ModuleProgressProps) {
	// Fetch all sections in this module
	const sections = await getSectionsByModuleId(moduleId)

	// Initialize progress tracking
	let totalLessons = 0
	let completedLessons = 0

	// Get all user progress records
	const allUserProgress = await getAllProgressForUser(userId)
	const progressMap = new Map(allUserProgress.map((progress) => [progress.resourceId, progress]))

	// For each section, get all lessons and count progress
	const sectionProgress = await Promise.all(
		sections.map(async (section) => {
			const lessons = await getLessonsBySectionId(section.id)

			// Count completed lessons in this section
			const sectionTotalLessons = lessons.length
			const sectionCompletedLessons = lessons.filter(
				(lesson) => progressMap.get(lesson.id)?.isComplete,
			).length

			totalLessons += sectionTotalLessons
			completedLessons += sectionCompletedLessons

			// Calculate section progress percentage
			const sectionProgressPercent =
				sectionTotalLessons > 0 ? (sectionCompletedLessons / sectionTotalLessons) * 100 : 0

			return {
				section,
				lessons,
				totalLessons: sectionTotalLessons,
				completedLessons: sectionCompletedLessons,
				progressPercent: sectionProgressPercent,
			}
		}),
	)

	// Calculate overall module progress
	const moduleProgressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

	return (
		<div className={className}>
			<div className="mb-6">
				<h3 className="text-lg font-medium mb-2">Module Progress</h3>
				<ProgressIndicator progressPercent={moduleProgressPercent} size="lg" />
				<p className="mt-1 text-sm text-gray-600">
					{completedLessons} of {totalLessons} lessons completed (
					{Math.round(moduleProgressPercent)}%)
				</p>
			</div>

			<div className="space-y-4">
				{sectionProgress.map(({ section, progressPercent, completedLessons, totalLessons }) => (
					<div key={section.id} className="border rounded-lg p-4">
						<ResourceTitle
							resource={{
								fields: section.fields || {},
							}}
							locale={locale}
							className="text-md font-medium mb-2"
						/>
						<ProgressIndicator progressPercent={progressPercent} />
						<p className="mt-1 text-xs text-gray-600">
							{completedLessons} of {totalLessons} completed
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
