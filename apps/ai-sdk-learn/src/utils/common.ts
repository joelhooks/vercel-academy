import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines Tailwind classes with clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
