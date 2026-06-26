import { cx } from 'tailwind-variants/lite'

const cn = (...inputs: Parameters<typeof cx>) => cx(...inputs)

export { cn }
