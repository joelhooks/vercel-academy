import db from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'

async function seedContentData() {
	console.log('🌱 Seeding content data...')

	try {
		// Insert modules
		console.log('Creating modules...')
		await db.insert(contentResource).values([
			{
				id: 'module-nextjs-foundations',
				type: 'module',
				fields: {
					title: { en: 'Next.js Foundations', ja: 'Next.js の基礎' },
					description: {
						en: 'Learn the fundamentals of Next.js by building a full-stack application',
						ja: 'フルスタックアプリケーションを構築してNext.jsの基礎を学ぶ',
					},
					slug: 'nextjs-foundations',
				},
			},
			{
				id: 'module-react-essentials',
				type: 'module',
				fields: {
					title: { en: 'React Essentials', ja: 'React の基本' },
					description: {
						en: 'Learn the essentials of React for building user interfaces',
						ja: 'ユーザーインターフェイスを構築するためのReactの基本を学ぶ',
					},
					slug: 'react-essentials',
				},
			},
		])

		// Insert sections
		console.log('Creating sections...')
		await db.insert(contentResource).values([
			{
				id: 'section-getting-started',
				type: 'section',
				fields: {
					title: { en: 'Getting Started with Next.js', ja: 'Next.js を始める' },
					slug: 'getting-started',
				},
			},
			{
				id: 'section-routing',
				type: 'section',
				fields: {
					title: { en: 'Routing in Next.js', ja: 'Next.js のルーティング' },
					slug: 'routing',
				},
			},
			{
				id: 'section-components',
				type: 'section',
				fields: {
					title: { en: 'React Components', ja: 'React コンポーネント' },
					slug: 'components',
				},
			},
			{
				id: 'section-hooks',
				type: 'section',
				fields: {
					title: { en: 'React Hooks', ja: 'React フック' },
					slug: 'hooks',
				},
			},
		])

		// Insert lessons
		console.log('Creating lessons...')
		await db.insert(contentResource).values([
			{
				id: 'lesson-installation',
				type: 'lesson',
				fields: {
					title: { en: 'Installing Next.js', ja: 'Next.js のインストール' },
					content: {
						en: '# Installing Next.js\n\nLearn how to create a new Next.js project...',
					},
					slug: 'installation',
				},
			},
			{
				id: 'lesson-project-structure',
				type: 'lesson',
				fields: {
					title: { en: 'Project Structure', ja: 'プロジェクト構造' },
					content: {
						en: '# Project Structure\n\nUnderstanding the Next.js project structure...',
					},
					slug: 'project-structure',
				},
			},
			{
				id: 'lesson-app-router',
				type: 'lesson',
				fields: {
					title: { en: 'App Router', ja: 'アプリルーター' },
					content: {
						en: '# App Router\n\nExploring the new App Router in Next.js...',
					},
					slug: 'app-router',
				},
			},
			{
				id: 'lesson-page-router',
				type: 'lesson',
				fields: {
					title: { en: 'Page Router', ja: 'ページルーター' },
					content: {
						en: '# Page Router\n\nUnderstanding the classic Page Router in Next.js...',
					},
					slug: 'page-router',
				},
			},
			{
				id: 'lesson-functional-components',
				type: 'lesson',
				fields: {
					title: { en: 'Functional Components', ja: '関数コンポーネント' },
					content: {
						en: '# Functional Components\n\nCreating React components using functions...',
					},
					slug: 'functional-components',
				},
			},
			{
				id: 'lesson-props',
				type: 'lesson',
				fields: {
					title: { en: 'Understanding Props', ja: 'Props を理解する' },
					content: {
						en: '# Understanding Props\n\nPassing data between React components...',
					},
					slug: 'props',
				},
			},
			{
				id: 'lesson-useState',
				type: 'lesson',
				fields: {
					title: { en: 'useState Hook', ja: 'useState フック' },
					content: {
						en: '# useState Hook\n\nManaging state in React components...',
					},
					slug: 'usestate',
				},
			},
			{
				id: 'lesson-useEffect',
				type: 'lesson',
				fields: {
					title: { en: 'useEffect Hook', ja: 'useEffect フック' },
					content: {
						en: '# useEffect Hook\n\nPerforming side effects in React components...',
					},
					slug: 'useeffect',
				},
			},
		])

		// Connect modules to sections (parent-child relationship)
		console.log('Creating content relationships (modules to sections)...')
		await db.insert(contentResourceResource).values([
			{
				resourceOfId: 'module-nextjs-foundations',
				resourceId: 'section-getting-started',
				position: 1,
			},
			{ resourceOfId: 'module-nextjs-foundations', resourceId: 'section-routing', position: 2 },
			{ resourceOfId: 'module-react-essentials', resourceId: 'section-components', position: 1 },
			{ resourceOfId: 'module-react-essentials', resourceId: 'section-hooks', position: 2 },
		])

		// Connect sections to lessons (parent-child relationship)
		console.log('Creating content relationships (sections to lessons)...')
		await db.insert(contentResourceResource).values([
			{ resourceOfId: 'section-getting-started', resourceId: 'lesson-installation', position: 1 },
			{
				resourceOfId: 'section-getting-started',
				resourceId: 'lesson-project-structure',
				position: 2,
			},
			{ resourceOfId: 'section-routing', resourceId: 'lesson-app-router', position: 1 },
			{ resourceOfId: 'section-routing', resourceId: 'lesson-page-router', position: 2 },
			{
				resourceOfId: 'section-components',
				resourceId: 'lesson-functional-components',
				position: 1,
			},
			{ resourceOfId: 'section-components', resourceId: 'lesson-props', position: 2 },
			{ resourceOfId: 'section-hooks', resourceId: 'lesson-useState', position: 1 },
			{ resourceOfId: 'section-hooks', resourceId: 'lesson-useEffect', position: 2 },
		])

		console.log('✅ Content data seeded successfully!')
	} catch (error) {
		console.error('❌ Error seeding content data:', error)
		throw error
	}
}

async function main() {
	try {
		await seedContentData()
		process.exit(0)
	} catch (error) {
		console.error('Failed to seed content data:', error)
		process.exit(1)
	} finally {
		// Ensure we clean up the database connection
		await db.$client?.end?.()
	}
}

// Run the script if it's invoked directly
main()

export { seedContentData }
