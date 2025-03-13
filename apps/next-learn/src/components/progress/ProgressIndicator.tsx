interface ProgressIndicatorProps {
	progressPercent: number
	size?: 'sm' | 'md' | 'lg'
	className?: string
}

export function ProgressIndicator({
	progressPercent,
	size = 'md',
	className = '',
}: ProgressIndicatorProps) {
	const sizeClasses = {
		sm: 'h-1 w-20',
		md: 'h-2 w-32',
		lg: 'h-3 w-48',
	}

	return (
		<div className={`bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
			<div
				className="bg-green-500 h-full transition-all duration-300 ease-in-out"
				style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={progressPercent}
				role="progressbar"
				tabIndex={0}
			/>
		</div>
	)
}
