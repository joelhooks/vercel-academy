import { GraduationCap } from 'lucide-react'

import { SignInButton } from './sign-in-button'
import { SignOutButton } from './sign-out-button'
import { getServerAuthSession } from '@/auth'

export const SignInCta = async () => {
	const session = await getServerAuthSession()

	const user = session?.user

	return (
		<div className="rounded-md md:col-span-2 sm:divide-x sm:grid border sm:grid-cols-[auto_1fr_16rem] bg-accent/30 sm:h-[84.5px]">
			<div className="px-4 pt-4 sm:p-4 flex items-center sm:justify-center sm:bg-accent/50 sm:aspect-square">
				<GraduationCap size={32} />
			</div>
			{user ? (
				<>
					<div className="p-4 flex flex-col">
						<h4 className="font-semibold text-xl tracking-tight">Welcome back, {user.name}</h4>
						<p className="text-muted-foreground text-[15px]">
							Continue learning where you left off.
						</p>
					</div>
					<div className="px-4 pb-4 sm:p-4 flex items-center justify-center bg-accent/50">
						<SignOutButton className="w-full" />
					</div>
				</>
			) : (
				<>
					<div className="p-4 flex flex-col">
						<h4 className="font-semibold text-xl tracking-tight">Start Learning Today</h4>
						<p className="text-muted-foreground text-[15px]">
							Sign in to track your progress and continue where you left off.
						</p>
					</div>
					<div className="px-4 pb-4 sm:p-4 flex items-center justify-center bg-accent/50">
						<SignInButton className="w-full" />
					</div>
				</>
			)}
		</div>
	)
}

export const SignInCtaSkeleton = async () => {
	return (
		<div className="rounded-md md:col-span-2 sm:divide-x sm:grid border sm:grid-cols-[auto_1fr_16rem] bg-accent/30 sm:h-[84.5px]">
			<div className="px-4 pt-4 sm:p-4 flex items-center sm:justify-center sm:bg-accent/50 sm:aspect-square">
				<GraduationCap size={32} />
			</div>
			<div className="p-4 flex flex-col">
				<h4 className="font-semibold text-xl tracking-tight">Start Learning Today</h4>
				<p className="text-muted-foreground text-[15px]">
					Sign in to track your progress and continue where you left off.
				</p>
			</div>
			<div className="px-4 pb-4 sm:p-4 flex items-center justify-center bg-accent/50">
				<SignInButton className="w-full" />
			</div>
		</div>
	)
}
