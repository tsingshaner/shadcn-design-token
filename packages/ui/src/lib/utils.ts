import { cx } from 'tailwind-variants/lite'

export const cn = (...inputs: Parameters<typeof cx>) => {
  return cx(...inputs)
}
