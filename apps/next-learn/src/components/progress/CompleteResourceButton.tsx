'use client'

import { useState } from 'react'
import { markResourceComplete } from '@/lib/data/progress'

interface CompleteResourceButtonProps {
	userId: string
	resourceId: string
	onComplete?: () => void
	className?: string
	variant?: 'primary' | 'secondary' | 'outline'
}

export function CompleteResourceButton({
	userId,
	resourceId,
	onComplete,
	className = '',
	variant = 'primary',
}: CompleteResourceButtonProps) {
	const [isLoading, setIsLoading] = useState(false)

	const variantClasses = {
		primary: 'bg-blue-600 hover:bg-blue-700 text-white',
		secondary: 'bg-green-600 hover:bg-green-700 text-white',
		outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
	}

	const handleClick = async () => {
		setIsLoading(true)
		try {
			await markResourceComplete(userId, resourceId)
			if (onComplete) {
				onComplete()
			}
		} catch (error) {
			console.error('Error marking resource as complete:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
			type="button"
			className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${variantClasses[variant]} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
			onClick={handleClick}
			disabled={isLoading}
		>
			{isLoading ? (
				<span className="flex items-center justify-center">
					<span className="sr-only">Loading</span>
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					Processing...
				</span>
			) : (
				'Mark as Complete'
			)}
		</button>
	)
}
