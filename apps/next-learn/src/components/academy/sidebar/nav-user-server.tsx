import { auth } from '@/auth'
import { NavUser } from './nav-user'

export async function NavUserServer() {
	const session = await auth()
	return <NavUser user={session?.user} />
}
