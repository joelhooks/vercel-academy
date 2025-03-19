import { cn } from '@/lib/utils'

import { Check } from 'lucide-react'

export function StatusIndicator({ isComplete }: { isComplete: boolean }) {
  if (isComplete) {
    return <Check size={12} className="text-green-500 dark:text-green-400 mr-px" />
  }

  return <div className={cn('h-1.5 w-1.5 rounded-full mr-[3px]', 'bg-foreground/50')} />
}
