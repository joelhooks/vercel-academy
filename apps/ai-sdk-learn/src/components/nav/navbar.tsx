import { ClientNavbar } from './client-navbar'
import { Suspense } from 'react'

export const PAGES = [
	{
		href: '/docs',
		tooltip: 'Docs',
		name: 'docs',
	},
	{
		href: '/cookbook',
		tooltip: 'Cookbook',
		name: 'cookbook',
	},
	{
		href: '/providers',
		tooltip: 'Providers',
		name: 'providers',
	},
	{
		href: '/showcase',
		tooltip: 'Showcase',
		name: 'showcase',
	},
	{
		href: '/playground',
		tooltip: 'Playground',
		name: 'playground',
	},
]

async function SuspendedNavbar() {
	return <ClientNavbar pages={PAGES} />
}

export function Navbar() {
	return (
		<Suspense fallback={<ClientNavbar pages={PAGES} />}>
			<SuspendedNavbar />
		</Suspense>
	)
}
