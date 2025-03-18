import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to recursively get all TypeScript files in a directory
function getAllTsFiles(dir) {
	let results = []
	const list = fs.readdirSync(dir)

	for (const file of list) {
		const fullPath = path.join(dir, file)
		const stat = fs.statSync(fullPath)

		if (stat.isDirectory()) {
			// Recursively search subdirectories, but skip node_modules and .next
			if (file !== 'node_modules' && file !== '.next') {
				results = results.concat(getAllTsFiles(fullPath))
			}
		} else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
			results.push(fullPath)
		}
	}

	return results
}

// Main function to combine all TypeScript files
function combineFiles() {
	const srcDir = path.resolve(__dirname, '../')
	const outputPath = path.resolve(__dirname, '../combined-ts-files.txt')
	console.log(`Searching for TypeScript files in: ${srcDir}`)

	const files = getAllTsFiles(srcDir)
	console.log(`Found ${files.length} TypeScript files`)

	let combinedContent = ''

	for (const file of files) {
		const relativePath = path.relative(srcDir, file)
		const content = fs.readFileSync(file, 'utf8')

		// Add file header with filepath
		combinedContent += `\n\n// ===================================================\n`
		combinedContent += `// File: ${relativePath}\n`
		combinedContent += `// ===================================================\n\n`
		combinedContent += content
	}

	// Write combined content to output file
	fs.writeFileSync(outputPath, combinedContent)
	console.log(`Combined content written to: ${outputPath}`)
}

// Execute the main function
combineFiles()
console.log('Done!')
