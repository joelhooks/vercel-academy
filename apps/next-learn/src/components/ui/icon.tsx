import React from 'react'
import { cn } from '@/utils/common'

interface IconProps {
	name: 'check' | 'close' | 'arrow-left' | 'arrow-right' | 'question' | 'eye' | 'eye-off'
	size?: number
	className?: string
	strokeWidth?: number
}

/**
 * A reusable icon component that renders SVG icons consistently
 * throughout the application.
 */
export function Icon({
	name,
	size = 24,
	className,
	strokeWidth = 2,
}: IconProps): React.ReactElement {
	const icons = {
		check: <polyline points="20 6 9 17 4 12" />,
		close: (
			<>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</>
		),
		'arrow-left': <path d="m15 18-6-6 6-6" />,
		'arrow-right': <path d="M14 5l7 7m0 0l-7 7m7-7H3" />,
		question: (
			<path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		),
		eye: (
			<>
				<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
				<circle cx="12" cy="12" r="3" />
			</>
		),
		'eye-off': (
			<>
				<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
				<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
				<path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
				<line x1="2" x2="22" y1="2" y2="22" />
			</>
		),
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn('', className)}
			aria-hidden="true"
		>
			{icons[name]}
		</svg>
	)
}
