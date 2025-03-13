import db from '@/db'
import { resourceProgress } from '@/db/schema'

async function seedProgressData(userId: string) {
	console.log(`🌱 Seeding progress data for user ID: ${userId}...`)

	try {
		// Create progress records for some lessons
		await db.insert(resourceProgress).values([
			{
				userId,
				resourceId: 'lesson-installation',
				isComplete: true,
				progressPercent: 100,
			},
			{
				userId,
				resourceId: 'lesson-project-structure',
				isComplete: true,
				progressPercent: 100,
			},
			{
				userId,
				resourceId: 'lesson-app-router',
				isComplete: false,
				progressPercent: 75,
			},
			{
				userId,
				resourceId: 'lesson-functional-components',
				isComplete: true,
				progressPercent: 100,
			},
			{
				userId,
				resourceId: 'lesson-props',
				isComplete: false,
				progressPercent: 50,
			},
		])

		console.log('✅ Progress data seeded successfully!')
	} catch (error) {
		console.error('❌ Error seeding progress data:', error)
		throw error
	}
}

async function main() {
	// Get user ID from command line argument or use a default
	const userId = process.argv[2] || 'test-user-1'

	try {
		await seedProgressData(userId)
		process.exit(0)
	} catch (error) {
		console.error('Failed to seed progress data:', error)
		process.exit(1)
	} finally {
		// Ensure we clean up the database connection
		await db.$client?.end?.()
	}
}

// Run the script if it's invoked directly
main()

export { seedProgressData }
