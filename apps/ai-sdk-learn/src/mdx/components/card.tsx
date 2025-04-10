import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
	className?: string
	title?: string
	icon?: React.ReactNode
	children: React.ReactNode
}

export function Card({ className, title, icon, children }: CardProps) {
	return (
		<div
			className={cn(
				'rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
				'p-6 my-6',
				className,
			)}
		>
			{(title || icon) && (
				<div className="flex items-center gap-2 mb-4">
					{icon && <div className="flex-shrink-0">{icon}</div>}
					{title && <h3 className="text-lg font-medium">{title}</h3>}
				</div>
			)}
			<div>{children}</div>
		</div>
	)
}
