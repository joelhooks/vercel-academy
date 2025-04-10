import Image, { ImageProps } from 'next/image'
import React from 'react'
import { IMAGE_BASE_URL, DEFAULT_IMAGE_SIZES } from '@/config/images'

interface MdxImageProps extends Omit<ImageProps, 'src' | 'alt'> {
	srcLight?: string
	srcDark?: string
	alt?: string
	caption?: string
	src?: string
}

export function MdxImage({
	src,
	srcLight,
	srcDark,
	caption,
	alt = caption || '',
	className = '',
	width = DEFAULT_IMAGE_SIZES.width,
	height = DEFAULT_IMAGE_SIZES.height,
	...rest
}: MdxImageProps): React.ReactElement {
	const hasThemeVariants = srcLight && srcDark
	const sharedClasses = 'rounded-md border border-gray-200 bg-gray-100'
	const combinedClasses = `${sharedClasses} ${className}`

	// Format the URL correctly even if it starts with a slash
	const formatSrc = (imgSrc: string | undefined): string => {
		if (!imgSrc) return ''
		const basePath = IMAGE_BASE_URL.endsWith('/') ? IMAGE_BASE_URL : `${IMAGE_BASE_URL}/`
		const imgPath = imgSrc.startsWith('/') ? imgSrc.substring(1) : imgSrc
		return `${basePath}${imgPath}`
	}

	return (
		<figure className="my-6">
			{/* Image variants (srcLight and srcDark) provided */}
			{hasThemeVariants ? (
				<>
					<Image
						className={`${combinedClasses} dark:hidden`}
						width={width}
						height={height}
						{...rest}
						alt={alt}
						src={formatSrc(srcLight)}
					/>
					<Image
						className={`${combinedClasses} hidden dark:block`}
						width={width}
						height={height}
						{...rest}
						alt={alt}
						src={formatSrc(srcDark)}
					/>
				</>
			) : (
				/* Only src provided - show in both themes */
				<Image
					className={combinedClasses}
					width={width}
					height={height}
					{...rest}
					alt={alt}
					src={formatSrc(src)}
				/>
			)}

			{caption ? (
				<figcaption className="mt-2 text-center text-sm text-gray-500">{caption}</figcaption>
			) : null}
		</figure>
	)
}
