import { cn } from '@/utils/common'
import { type HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
			{...props}
		/>
	)
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
	return (
		<div
			data-slot="card-header"
			className={cn('flex flex-col space-y-1.5 p-6', className)}
			{...props}
		/>
	)
}

export function CardTitle({ className, ...props }: CardTitleProps) {
	return (
		<h3
			data-slot="card-title"
			className={cn('text-xl font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	)
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
	return (
		<p
			data-slot="card-description"
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
}

export function CardContent({ className, ...props }: CardContentProps) {
	return <div data-slot="card-content" className={cn('p-6 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: CardFooterProps) {
	return (
		<div
			data-slot="card-footer"
			className={cn('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	)
}
