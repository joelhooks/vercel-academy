import { NextConfig } from 'next'

const nextConfig: NextConfig = {
	strictMode: true,
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.public.blob.vercel-storage.com',
			},
		],
	},
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		ppr: 'incremental',
		useCache: true,
		dynamicIO: true,
	},
}

export default nextConfig
