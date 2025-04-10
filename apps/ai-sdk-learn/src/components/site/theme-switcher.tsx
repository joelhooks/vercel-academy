'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Sun, Moon, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ThemeSwitcher({ className }: { className?: string }) {
	const { setTheme, theme } = useTheme()

	return (
		<TooltipProvider>
			<div className={cn('flex w-fit items-center gap-0.5 rounded-md p-1', className)}>
				{[
					{ value: 'system', icon: Laptop, label: 'System Theme' },
					{ value: 'light', icon: Sun, label: 'Light Mode' },
					{ value: 'dark', icon: Moon, label: 'Dark Mode' },
				].map(({ value, icon: Icon, label }) => (
					<Tooltip key={value}>
						<TooltipTrigger asChild>
							<span className="h-full">
								<input
									className="peer sr-only"
									type="radio"
									id={`theme-switch-${value}`}
									value={value}
									checked={theme === value}
									onChange={(e) => setTheme(e.target.value)}
									aria-label={label}
								/>
								<label
									htmlFor={`theme-switch-${value}`}
									className="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-[0.2rem] text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground peer-checked:bg-accent peer-checked:text-accent-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
								>
									<Icon className="h-4 w-4" />
									<span className="sr-only">{label}</span>
								</label>
							</span>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>{label}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>
		</TooltipProvider>
	)
}
