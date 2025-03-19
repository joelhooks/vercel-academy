const nextConfig = {
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		ppr: 'incremental',
		useCache: true,
		dynamicIO: true,
	},
}

export default nextConfig
