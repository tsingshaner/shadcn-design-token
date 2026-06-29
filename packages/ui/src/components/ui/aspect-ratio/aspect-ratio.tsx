import type { ComponentProps, CSSProperties } from 'react'

import { cn } from '@/lib/utils'

type AspectRatioProps = ComponentProps<'div'> & {
  ratio?: number
}

const AspectRatio = ({ className, ratio = 16 / 9, style, ...props }: AspectRatioProps) => (
  <div
    className={cn('relative aspect-(--ratio) w-full overflow-hidden', className)}
    data-slot="aspect-ratio"
    style={{ '--ratio': ratio, ...style } as CSSProperties}
    {...props}
  />
)

export type { AspectRatioProps }
export { AspectRatio }
