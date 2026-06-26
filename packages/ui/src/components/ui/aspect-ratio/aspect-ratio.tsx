import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type AspectRatioProps = ComponentProps<'div'> & {
  ratio?: number
}

const AspectRatio = ({ className, ratio = 16 / 9, style, ...props }: AspectRatioProps) => (
  <div
    className={cn('relative w-full overflow-hidden', className)}
    data-slot="aspect-ratio"
    style={{ aspectRatio: String(ratio), ...style }}
    {...props}
  />
)

export type { AspectRatioProps }
export { AspectRatio }
