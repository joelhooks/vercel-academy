import { getLocalizedField } from '@/lib/data'

interface ResourceTitleProps {
	resource: {
		fields: Record<string, unknown>
	}
	locale?: string
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p'
}

export function ResourceTitle({
	resource,
	locale = 'en',
	className = '',
	as: Component = 'h2',
}: ResourceTitleProps) {
	const title = getLocalizedField<string>(resource, 'title', locale, 'Untitled Resource')

	return <Component className={className}>{title}</Component>
}
