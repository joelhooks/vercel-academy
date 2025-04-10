import { NextConfig } from 'next'

const nextConfig: NextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.public.blob.vercel-storage.com',
			},
		],
	},
	transpilePackages: ['next-mdx-remote', '@vercel/geist', '@vercel/geist-test-utils'],
	experimental: {
		ppr: 'incremental',
		useCache: true,
		dynamicIO: true,
	},
	modularizeImports: {
		'@heroicons/react/24/outline': {
			transform: '@heroicons/react/24/outline/{{member}}',
			preventFullImport: true,
		},
		'@heroicons/react/24/solid': {
			transform: '@heroicons/react/24/solid/{{member}}',
			preventFullImport: true,
		},
		'@heroicons/react/20/solid': {
			transform: '@heroicons/react/20/solid/{{member}}',
			preventFullImport: true,
		},
		'@vercel/geist/components': {
			transform: '@vercel/geist/components/{{ kebabCase member }}',
			skipDefaultConversion: true,
		},
		'@vercel/geist/icons': {
			transform: '@vercel/geist/icons/{{ kebabCase member }}',
			skipDefaultConversion: true,
		},
		'@vercel/geist/new-icons/16': {
			transform: '@vercel/geist/new-icons/16/{{ kebabCase member }}',
			skipDefaultConversion: true,
		},
		'@vercel/geist/logos': {
			transform: '@vercel/geist/logos/{{ kebabCase member }}',
			skipDefaultConversion: true,
		},
	},
}

export default nextConfig
