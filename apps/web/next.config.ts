import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
	experimental: {
		ppr: 'incremental',
	},
}

// @ts-ignore Using Next.js Canary
export default withPayload(nextConfig)
