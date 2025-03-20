'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Button } from '@/components/ui/button'
import { useState, type JSX } from 'react'
import { cn } from '@/lib/utils'
import styles from './reveal.module.css'

export function Reveal({ children }: { children: React.ReactNode }): JSX.Element {
	const [show, setShow] = useState(false)

	return (
		<div className="-mx-5 mb-8 p-[21px] md:-mx-[62px] md:rounded-[16px] md:p-4 md:px-[62px] md:py-12">
			<Collapsible.Root onOpenChange={setShow} open={show}>
				<Collapsible.Trigger asChild>
					<Button
						onClick={(): void => setShow((s) => !s)}
						variant="outline"
						className="flex items-center gap-2"
					>
						{show ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
								<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
								<path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
								<line x1="2" x2="22" y1="2" y2="22"></line>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
								<circle cx="12" cy="12" r="3"></circle>
							</svg>
						)}
						{show ? 'Hide' : 'Reveal'} the solution
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Content
					className={cn(
						'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all pt-4',
						styles.content,
					)}
				>
					{children}
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	)
}
