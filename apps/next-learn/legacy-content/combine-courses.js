import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory path in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directory containing the course folders
const legacyContentDir = path.join(__dirname)

// Get all course directories
const courseDirs = fs
	.readdirSync(legacyContentDir, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory() && dirent.name.match(/^\d+-/))
	.map((dirent) => dirent.name)

console.log(`Found ${courseDirs.length} course directories: ${courseDirs.join(', ')}`)

courseDirs.forEach((courseDir) => {
	const coursePath = path.join(legacyContentDir, courseDir)
	const outputFileName = `${courseDir}.md`
	const outputFilePath = path.join(legacyContentDir, outputFileName)

	// Get all .mdx files in the course directory
	const mdxFiles = fs
		.readdirSync(coursePath, { withFileTypes: true })
		.filter((file) => file.isFile() && file.name.endsWith('.mdx'))
		.map((file) => file.name)
		// Sort files numerically (01-, 02-, etc.)
		.sort((a, b) => {
			// Extract the numeric prefix if it exists
			const numA = a.match(/^(\d+)-/) ? parseInt(a.match(/^(\d+)-/)[1], 10) : 999
			const numB = b.match(/^(\d+)-/) ? parseInt(b.match(/^(\d+)-/)[1], 10) : 999
			return numA - numB
		})

	console.log(`Processing ${courseDir} with ${mdxFiles.length} lesson files`)

	// Content to be written to the combined file
	let combinedContent = `# ${courseDir.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase()}\n\n`

	// Process each file
	mdxFiles.forEach((mdxFile) => {
		const mdxFilePath = path.join(coursePath, mdxFile)
		const content = fs.readFileSync(mdxFilePath, 'utf8')

		// Extract title from frontmatter if present
		const titleMatch = content.match(/title:\s*(.+)/)
		const title = titleMatch
			? titleMatch[1]
			: mdxFile.replace(/^\d+-(.+)\.mdx$/, '$1').replace(/-/g, ' ')

		// Add filename reference and section heading for each file
		combinedContent += `\n\n<!-- Source: ${mdxFile} -->\n`
		combinedContent += `## ${title}\n\n`

		// Add the file content with frontmatter preserved
		combinedContent += content

		console.log(`  Added ${mdxFile}`)
	})

	// Write the combined content to the output file
	fs.writeFileSync(outputFilePath, combinedContent)
	console.log(`Created ${outputFileName}`)
})

console.log('All courses combined successfully!')
