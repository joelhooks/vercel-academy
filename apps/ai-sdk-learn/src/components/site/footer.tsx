'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from './theme-switcher'

export function Footer() {
	const [email, setEmail] = useState('')

	return (
		<footer className="w-full border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-9">
				{/* Mobile Header with Logo and Social Icons */}
				<div className="flex items-center justify-between md:hidden mb-8">
					<Link href="/" className="text-foreground">
						<svg
							height="20"
							viewBox="0 0 76 65"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-label="Logo"
							role="img"
						>
							<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
						</svg>
					</Link>
					<div className="flex items-center gap-3">
						<Link
							href="https://github.com/vercel"
							className="text-muted-foreground hover:text-foreground"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 98 96"
								className="h-4 w-4"
								aria-label="Logo"
								role="img"
							>
								<path
									fill="currentColor"
									fillRule="evenodd"
									d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
									clipRule="evenodd"
								/>
							</svg>
						</Link>
						<Link
							href="https://twitter.com/vercel"
							className="text-muted-foreground hover:text-foreground"
						>
							<svg
								fill="none"
								height="16"
								width="16"
								viewBox="0 0 24 24"
								aria-label="Logo"
								role="img"
							>
								<path
									fill="currentColor"
									d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
								/>
							</svg>
						</Link>
						<Link
							href="https://bsky.app/profile/vercel.com"
							className="text-muted-foreground hover:text-foreground"
						>
							<svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-label="Logo" role="img">
								<path
									fill="currentColor"
									d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.697-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948Z"
								/>
							</svg>
						</Link>
					</div>
				</div>

				{/* Desktop Layout */}
				<div className="hidden md:grid md:grid-cols-7 md:gap-8">
					{/* Logo - Column 1 */}
					<div className="md:col-span-1">
						<Link href="/" className="text-foreground">
							<svg
								height="20"
								viewBox="0 0 76 65"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-label="Logo"
								role="img"
							>
								<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
							</svg>
						</Link>
					</div>

					{/* Resources - Column 2 */}
					<div className="md:col-span-1">
						<h4 className="mb-4 text-sm font-medium">Resources</h4>
						<div className="flex flex-col gap-3">
							<Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
								Docs
							</Link>
							<Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground">
								Learn
							</Link>
							<Link
								href="/showcase"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Showcase
							</Link>
							<Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
								Blog
							</Link>
							<Link href="/team" className="text-sm text-muted-foreground hover:text-foreground">
								Team
							</Link>
							<Link
								href="/analytics"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Analytics
							</Link>
							<Link href="/conf" className="text-sm text-muted-foreground hover:text-foreground">
								Next.js Conf
							</Link>
							<Link
								href="/previews"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Previews
							</Link>
						</div>
					</div>

					{/* More - Column 3 */}
					<div className="md:col-span-1">
						<h4 className="mb-4 text-sm font-medium">More</h4>
						<div className="flex flex-col gap-3">
							<Link
								href="/commerce"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Next.js Commerce
							</Link>
							<Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
								Contact Sales
							</Link>
							<Link
								href="https://github.com/vercel/next.js"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								GitHub
							</Link>
							<Link
								href="/releases"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Releases
							</Link>
							<Link
								href="/telemetry"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Telemetry
							</Link>
							<Link
								href="/governance"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Governance
							</Link>
						</div>
					</div>

					{/* About Vercel - Column 4 */}
					<div className="md:col-span-1">
						<h4 className="mb-4 text-sm font-medium">About Vercel</h4>
						<div className="flex flex-col gap-3">
							<Link href="/next" className="text-sm text-muted-foreground hover:text-foreground">
								Next.js + Vercel
							</Link>
							<Link href="/oss" className="text-sm text-muted-foreground hover:text-foreground">
								Open Source Software
							</Link>
							<Link
								href="https://github.com/vercel"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								GitHub
							</Link>
							<Link
								href="https://bsky.app/profile/vercel.com"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Bluesky
							</Link>
							<Link
								href="https://twitter.com/vercel"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								X
							</Link>
						</div>
					</div>

					{/* Legal - Column 5 */}
					<div className="md:col-span-1">
						<h4 className="mb-4 text-sm font-medium">Legal</h4>
						<div className="flex flex-col gap-3">
							<Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
								Privacy Policy
							</Link>
							<button
								type="button"
								className="text-left text-sm text-muted-foreground hover:text-foreground"
							>
								Cookie Preferences
							</button>
						</div>
					</div>

					{/* Subscribe - Column 6-7 */}
					<div className="md:col-span-2">
						<h4 className="mb-4 text-sm font-medium">Subscribe to our newsletter</h4>
						<p className="mb-4 text-sm text-muted-foreground">
							Stay updated on new releases and features, guides, and case studies.
						</p>
						<div className="relative">
							<Input
								type="email"
								placeholder="you@domain.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-muted pr-20 h-8 text-sm"
							/>
							<Button size="sm" className="absolute right-1 top-1 h-6 text-xs px-2">
								Subscribe
							</Button>
						</div>
					</div>
				</div>

				{/* Mobile Layout */}
				<div className="grid grid-cols-2 gap-8 md:hidden">
					{/* Resources */}
					<div>
						<h4 className="mb-4 text-sm font-medium">Resources</h4>
						<div className="flex flex-col gap-3">
							<Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
								Docs
							</Link>
							<Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground">
								Learn
							</Link>
							<Link
								href="/showcase"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Showcase
							</Link>
							<Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
								Blog
							</Link>
							<Link href="/team" className="text-sm text-muted-foreground hover:text-foreground">
								Team
							</Link>
							<Link
								href="/analytics"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Analytics
							</Link>
							<Link href="/conf" className="text-sm text-muted-foreground hover:text-foreground">
								Next.js Conf
							</Link>
							<Link
								href="/previews"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Previews
							</Link>
						</div>
					</div>

					{/* More */}
					<div>
						<h4 className="mb-4 text-sm font-medium">More</h4>
						<div className="flex flex-col gap-3">
							<Link
								href="/commerce"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Next.js Commerce
							</Link>
							<Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
								Contact Sales
							</Link>
							<Link
								href="https://github.com/vercel/next.js"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								GitHub
							</Link>
							<Link
								href="/releases"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Releases
							</Link>
							<Link
								href="/telemetry"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Telemetry
							</Link>
							<Link
								href="/governance"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Governance
							</Link>
						</div>
					</div>

					{/* About Vercel */}
					<div>
						<h4 className="mb-4 text-sm font-medium">About Vercel</h4>
						<div className="flex flex-col gap-3">
							<Link href="/next" className="text-sm text-muted-foreground hover:text-foreground">
								Next.js + Vercel
							</Link>
							<Link href="/oss" className="text-sm text-muted-foreground hover:text-foreground">
								Open Source Software
							</Link>
							<Link
								href="https://github.com/vercel"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								GitHub
							</Link>
							<Link
								href="https://bsky.app/profile/vercel.com"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								Bluesky
							</Link>
							<Link
								href="https://twitter.com/vercel"
								className="text-sm text-muted-foreground hover:text-foreground"
							>
								X
							</Link>
						</div>
					</div>

					{/* Legal */}
					<div>
						<h4 className="mb-4 text-sm font-medium">Legal</h4>
						<div className="flex flex-col gap-3">
							<Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
								Privacy Policy
							</Link>
							<button
								type="button"
								className="text-left text-sm text-muted-foreground hover:text-foreground"
							>
								Cookie Preferences
							</button>
						</div>
					</div>

					{/* Newsletter - Full Width */}
					<div className="col-span-2 mt-8">
						<h4 className="mb-4 text-sm font-medium">Subscribe to our newsletter</h4>
						<p className="mb-4 text-sm text-muted-foreground">
							Stay updated on new releases and features, guides, and case studies.
						</p>
						<div className="relative">
							<Input
								type="email"
								placeholder="you@domain.com"
								value={email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
								className="bg-muted pr-20 h-8 text-sm"
							/>
							<Button size="sm" className="absolute right-1 top-1 h-6 text-xs px-2">
								Subscribe
							</Button>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
					<div className="flex flex-col gap-4 md:gap-6">
						<span className="text-sm text-muted-foreground">
							© {new Date().getFullYear()} Vercel, Inc.
						</span>
						<div className="hidden md:flex items-center gap-3">
							<Link
								href="https://github.com/vercel"
								className="text-muted-foreground hover:text-foreground"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 98 96"
									className="h-4 w-4"
									aria-label="Logo"
									role="img"
								>
									<path
										fill="currentColor"
										fillRule="evenodd"
										d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
							<div className="h-4 w-px bg-border" />
							<Link
								href="https://twitter.com/vercel"
								className="text-muted-foreground hover:text-foreground"
							>
								<svg
									fill="none"
									height="16"
									width="16"
									viewBox="0 0 24 24"
									aria-label="Logo"
									role="img"
								>
									<path
										fill="currentColor"
										d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
									/>
								</svg>
							</Link>
							<div className="h-4 w-px bg-border" />
							<Link
								href="https://bsky.app/profile/vercel.com"
								className="text-muted-foreground hover:text-foreground"
							>
								<svg
									className="h-4 w-4"
									viewBox="0 0 16 16"
									fill="none"
									aria-label="Logo"
									role="img"
								>
									<path
										fill="currentColor"
										d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.697-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948Z"
									/>
								</svg>
							</Link>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</footer>
	)
}
