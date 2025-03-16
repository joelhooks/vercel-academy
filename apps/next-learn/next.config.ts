import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		ppr: 'incremental',
	},
}

// @ts-ignore Using Next.js Canary
export default withPayload(nextConfig)
