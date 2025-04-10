'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface SignOutButtonProps {
  className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut({
        callbackUrl: '/',
        redirect: true,
      })
    } catch (error) {
      console.error('Sign out failed:', error)
      setIsSigningOut(false)
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      className={cn(
        'flex items-center gap-2 justify-center',
        isSigningOut && 'cursor-not-allowed opacity-50',
        className,
      )}
      disabled={isSigningOut}
    >
      {isSigningOut ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          <svg
            aria-label="Vercel logomark"
            height="64"
            role="img"
            viewBox="0 0 74 64"
            className="h-4 w-auto"
          >
            <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="currentColor" />
          </svg>
          Sign out
        </>
      )}
    </Button>
  )
}
