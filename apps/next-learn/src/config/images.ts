/**
 * Configuration for images used throughout the application
 */

// Base URL for images loaded by MDX components
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/images/'

// Default image dimensions
export const DEFAULT_IMAGE_SIZES = {
	width: 800,
	height: 450,
}

// Default aspect ratios
export const ASPECT_RATIOS = {
	widescreen: 16 / 9,
	square: 1,
	portrait: 3 / 4,
}

// Quality settings
export const IMAGE_QUALITY = {
	high: 90,
	medium: 75,
	low: 60,
}
