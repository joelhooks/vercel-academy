'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

interface SignInButtonProps {
  className?: string
}

export function SignInButton({ className }: SignInButtonProps) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const { pending } = useFormStatus()

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true)
      await signIn('vercel', {
        redirect: true,
        callbackUrl: '/learn',
      })
    } catch (error) {
      console.error('Sign in failed:', error)
      setIsSigningIn(false)
    }
  }

  const isLoading = isSigningIn || pending

  return (
    <Button
      onClick={handleSignIn}
      className={cn(
        'flex items-center gap-2 justify-center',
        isLoading && 'cursor-not-allowed opacity-50',
        className,
      )}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Signing in...
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
          <span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
            Sign in with Vercel
          </span>
        </>
      )}
    </Button>
  )
}
