'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
	items: {
		label: string
		content: React.ReactNode
	}[]
	defaultIndex?: number
	className?: string
}

export function Tabs({ items, defaultIndex = 0, className }: TabsProps) {
	const [activeIndex, setActiveIndex] = useState(defaultIndex)

	return (
		<div className={cn('not-prose my-6', className)}>
			<div className="flex border-b">
				{items.map((item, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={cn(
							'px-4 py-2 text-sm font-medium',
							activeIndex === index
								? 'border-b-2 border-primary text-primary'
								: 'text-muted-foreground hover:text-foreground',
						)}
					>
						{item.label}
					</button>
				))}
			</div>
			<div className="p-4">{items[activeIndex]?.content}</div>
		</div>
	)
}
