'use client'

import { NavigationMenu, NavigationMenuIndicator, NavigationMenuList } from './navigation-menu'

import { HomeLinks } from './home-links'

export interface RepositoryDetails {
	starsCount: number
	latestVersion: string
}

export const ClientNavbar = ({
	pages,
}: {
	pages: { href: string; tooltip: string; name: string }[]
}) => {
	return (
		<>
			<div className="sticky top-0 flex justify-between border-b h-[57px] z-40 bg-background-100">
				<div className="flex flex-row items-center select-none">
					<div className="flex flex-row items-center gap-2 shrink-0">
						<HomeLinks />
					</div>

					<div className="flex-row hidden pl-6 md:flex">
						<NavigationMenu>
							<NavigationMenuList className="gap-3 h-14">
								<NavigationMenuIndicator />
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				<div className="hidden md:flex">
					<div className="flex-row items-center justify-end hidden gap-4 px-6 lg:col-start-2 lg:col-span-1 lg:flex md:px-4"></div>
				</div>
			</div>
		</>
	)
}
