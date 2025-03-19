import type * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Suspense } from 'react'

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<Suspense>
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
		</Suspense>
	)
}
