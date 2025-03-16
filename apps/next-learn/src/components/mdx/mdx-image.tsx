import Image, { ImageProps } from 'next/image'
import React from 'react'

// Set your image base URL here or import it from your environment config
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''

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
	...rest
}: MdxImageProps): React.ReactElement {
	const hasThemeVariants = srcLight && srcDark
	const sharedClasses = 'rounded-md border border-gray-200 bg-gray-100'
	const combinedClasses = `${sharedClasses} ${className}`

	return (
		<figure className="my-6">
			{/* Image variants (srcLight and srcDark) provided */}
			{hasThemeVariants ? (
				<>
					<Image
						className={`${combinedClasses} dark:hidden`}
						{...rest}
						alt={alt}
						src={`${IMAGE_BASE_URL}${srcLight}`}
					/>
					<Image
						className={`${combinedClasses} hidden dark:block`}
						{...rest}
						alt={alt}
						src={`${IMAGE_BASE_URL}${srcDark}`}
					/>
				</>
			) : (
				/* Only src provided - show in both themes */
				<Image className={combinedClasses} {...rest} alt={alt} src={`${IMAGE_BASE_URL}${src}`} />
			)}

			{caption ? (
				<figcaption className="mt-2 text-center text-sm text-gray-500">{caption}</figcaption>
			) : null}
		</figure>
	)
}
