import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { buildConfig } from 'payload'

import { fileURLToPath } from 'node:url'
import path from 'node:path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	editor: lexicalEditor(),
	collections: [],
	secret: process.env.PAYLOAD_SECRET || '',
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL,
		},
	}),
	plugins: [
		vercelBlobStorage({
			collections: {
				media: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN || '',
		}),
	],
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
})
