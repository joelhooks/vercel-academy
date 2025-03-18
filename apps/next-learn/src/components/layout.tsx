import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
	id?: string
	isUniversity?: boolean
}

export const Section = ({ children, className, id, isUniversity = false }: Props) => {
	return (
		<section className={cn('sm:py-8', className)} id={id}>
			{children}
		</section>
	)
}

export const Container = ({ children, className, id, isUniversity }: Props) => {
	return (
		<div
			className={cn(
				'mx-auto px-4 py-6 md:px-6',
				isUniversity ? 'max-w-4xl' : 'max-w-6xl',
				className,
			)}
			id={id}
		>
			{children}
		</div>
	)
}
