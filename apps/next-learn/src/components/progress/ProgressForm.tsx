'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ProgressIndicator } from './ProgressIndicator'

interface ProgressFormProps {
	userId: string
	resourceId: string
	initialProgress?: number
	action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>
	buttonText?: string
	showProgressBar?: boolean
	className?: string
}

export function ProgressForm({
	userId,
	resourceId,
	initialProgress = 0,
	action,
	buttonText = 'Update Progress',
	showProgressBar = true,
	className = '',
}: ProgressFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [progressValue, setProgressValue] = useState(initialProgress)
	const pathname = usePathname()

	const handleSubmit = async (formData: FormData) => {
		setIsSubmitting(true)
		setError(null)

		try {
			const result = await action(formData)

			if (result.error) {
				setError(result.error)
			}
		} catch (error) {
			setError('An unexpected error occurred')
			console.error(error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form action={handleSubmit} className={className}>
			<input type="hidden" name="userId" value={userId} />
			<input type="hidden" name="resourceId" value={resourceId} />
			<input type="hidden" name="returnPath" value={pathname} />

			{showProgressBar && (
				<div className="mb-4">
					<label
						htmlFor={`progress-${resourceId}`}
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Progress
					</label>
					<div className="flex items-center space-x-4">
						<input
							id={`progress-${resourceId}`}
							type="range"
							name="progressPercent"
							min="0"
							max="100"
							step="1"
							value={progressValue}
							onChange={(e) => setProgressValue(Number(e.target.value))}
							className="w-full"
						/>
						<span className="text-sm font-medium text-gray-500">{progressValue}%</span>
					</div>
					<div className="mt-2">
						<ProgressIndicator progressPercent={progressValue} />
					</div>
				</div>
			)}

			{!showProgressBar && <input type="hidden" name="progressPercent" value="100" />}

			<button
				type="submit"
				disabled={isSubmitting}
				className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
					isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
				}`}
			>
				{isSubmitting ? 'Updating...' : buttonText}
			</button>

			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</form>
	)
}
