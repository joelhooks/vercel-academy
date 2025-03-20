const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'h8dxkfmaphn8o0p3.public.blob.vercel-storage.com',
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
