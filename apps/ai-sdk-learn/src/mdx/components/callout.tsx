import React from 'react'
import { AlertCircle, Info, AlertTriangle, CheckCircle, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'warning' | 'error' | 'success'

interface CalloutProps {
	type?: CalloutType
	title?: string
	children: React.ReactNode
	icon?: LucideIcon
}

const icons = {
	info: Info,
	warning: AlertTriangle,
	error: AlertCircle,
	success: CheckCircle,
}

const styles = {
	info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200',
	warning:
		'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-900 dark:text-yellow-200',
	error:
		'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200',
	success:
		'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-900 dark:text-green-200',
}

export function Callout({ type = 'info', title, children, icon: CustomIcon }: CalloutProps) {
	const Icon = CustomIcon || icons[type]

	return (
		<div className={cn('border-l-4 p-4 my-6 rounded-r-md', styles[type])}>
			<div className="flex items-start">
				<div className="flex-shrink-0 mt-0.5">
					<Icon className="h-5 w-5" />
				</div>
				<div className="ml-3">
					{title && <h3 className="text-sm font-medium">{title}</h3>}
					<div className={cn('text-sm mt-1', !title && 'mt-0')}>{children}</div>
				</div>
			</div>
		</div>
	)
}
