import { cn } from '@/lib/utils'

import { BrandLogo } from '../brands/brand-logo'

import type { Brand } from '@/payload-types'

const SIZES = {
  sm: {
    container: 'h-[40px] w-[32px]',
    spine: 'w-[3px]',
    logo: 'w-4 h-4',
  },
  md: {
    container: 'h-[50px] w-[40px] md:h-[80px] md:w-[64px]',
    spine: 'w-[4px]',
    logo: 'w-6 h-6 md:w-8 md:h-8',
  },
  lg: {
    container: 'h-[100px] w-[80px]',
    spine: 'w-[5px]',
    logo: 'w-10 h-10',
  },
} as const

export const CourseBook = ({
  brand,
  size = 'lg',
  className,
}: {
  brand?: Brand
  size?: keyof typeof SIZES
  className?: string
}) => {
  const sizeConfig = SIZES[size]
  if (!brand) return null

  return (
    <div
      className={cn(
        'relative flex bg-background shadow-sm transition-all duration-300',
        'rounded-l-[4px] rounded-r-[2px]',
        sizeConfig.container,
        className,
      )}
      role="img"
      aria-label={`${brand.name} course book`}
    >
      {/* Book Spine */}
      <div
        className={cn(
          'h-full shrink-0 rounded-l-[4px]',
          'bg-gradient-to-r from-foreground/20 to-foreground/10',
          'border-r border-foreground/10',
          sizeConfig.spine,
        )}
      />

      {/* Book Cover */}
      <div
        className={cn(
          'flex h-full w-full items-center justify-center',
          'rounded-r-[2px] border border-l-0',
          'bg-gradient-to-br from-foreground/5 to-foreground/10',
          'transition-colors duration-300',
        )}
      >
        {brand && <BrandLogo brand={brand} className={sizeConfig.logo} />}
      </div>
    </div>
  )
}
