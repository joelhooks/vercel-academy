'use client'

import Link from 'next/link'
import { SlashForwardIcon, SparklesIcon, VercelIcon } from '../icons'

export function HomeLinks() {
	return (
		<span className="flex flex-row items-center gap-2 home-links">
			<Link
				className="text-zinc-800 dark:text-zinc-100 -translate-y-[.5px] pl-4"
				href="https://vercel.com/"
				rel="noopener"
				target="_blank"
			>
				<VercelIcon />
			</Link>

			<div className="w-4 text-lg text-center text-zinc-300 dark:text-zinc-600">
				<SlashForwardIcon />
			</div>

			<div className="flex flex-row items-center gap-4">
				<Link className="flex flex-row items-center gap-2" href="/">
					<div className="flex flex-row items-center gap-2">
						<div className="text-zinc-800 dark:text-zinc-100">
							<SparklesIcon />
						</div>
						<div className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
							AI <span className="hidden min-[385px]:inline">SDK</span>
						</div>
					</div>
				</Link>
			</div>

			<style jsx>{`
				.home-links {
					mask-image: linear-gradient(60deg, black 25%, rgba(0, 0, 0, 0.2) 50%, black 75%);
					mask-size: 400%;
					mask-position: 0%;
				}
				.home-links:hover {
					mask-position: 100%;
					transition:
						mask-position 1s ease,
						-webkit-mask-position 1s ease;
				}
			`}</style>
		</span>
	)
}
