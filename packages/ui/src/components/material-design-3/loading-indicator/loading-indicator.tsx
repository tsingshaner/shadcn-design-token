import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

import { cn } from '@/lib/utils'

type LoadingIndicatorProps = Omit<ProgressPrimitive.Root.Props, 'value'> & {
  showContainer?: boolean
}

const morphStyles = `
  .cn-loading-indicator-shape {
    animation: cn-loading-indicator-morph 4550ms ease-in-out infinite,
      cn-loading-indicator-rotate 4666ms linear infinite;
    transform-origin: center;
  }
  @keyframes cn-loading-indicator-morph {
    0%, 100% { d: path("M24 5 L28 11.6 L35.2 8.6 L34.5 16.4 L42.1 18.1 L37 24 L42.1 29.9 L34.5 31.6 L35.2 39.4 L28 36.4 L24 43 L20 36.4 L12.8 39.4 L13.5 31.6 L5.9 29.9 L11 24 L5.9 18.1 L13.5 16.4 L12.8 8.6 L20 11.6 Z"); }
    14.286% { d: path("M24 7.5 L29.3 7.6 L32.9 11.7 L38.9 13.2 L37.6 19.6 L42.8 24 L37.6 28.4 L38.9 34.8 L32.9 36.3 L29.3 40.4 L24 40.5 L19.1 39 L13.5 38.4 L12.2 32.6 L6.2 29.8 L9.8 24 L6.2 18.2 L12.2 15.4 L13.5 9.6 L19.1 9 Z"); }
    28.571% { d: path("M24 7.8 L29.7 6.6 L33.5 10.9 L35.4 15.7 L39.4 19 L42.3 24 L39.4 29 L35.4 32.3 L33.5 37.1 L29.7 41.4 L24 40.2 L19.6 37.4 L14.5 37.1 L9.2 34.8 L8.6 29 L9.9 24 L8.6 19 L9.2 13.2 L14.5 10.9 L19.6 10.6 Z"); }
    42.857% { d: path("M16.2 16.2 L20.8 12.5 L25.6 9.8 L30.3 8.6 L34.4 8.8 L37.4 10.6 L39.2 13.6 L39.4 17.7 L38.2 22.4 L35.5 27.2 L31.8 31.8 L27.2 35.5 L22.4 38.2 L17.7 39.4 L13.6 39.2 L10.6 37.4 L8.8 34.4 L8.6 30.3 L9.8 25.6 L12.5 20.8 Z"); }
    57.143% { d: path("M24 5 L28.2 11.2 L35.2 8.6 L34.9 16.1 L42.1 18.1 L37.5 24 L42.1 29.9 L34.9 31.9 L35.2 39.4 L28.2 36.8 L24 43 L19.8 36.8 L12.8 39.4 L13.1 31.9 L5.9 29.9 L10.5 24 L5.9 18.1 L13.1 16.1 L12.8 8.6 L19.8 11.2 Z"); }
    71.429% { d: path("M24 5.3 L29.1 8.3 L31.6 13.6 L34.4 16.4 L39.7 18.9 L42.7 24 L39.7 29.1 L34.4 31.6 L31.6 34.4 L29.1 39.7 L24 42.7 L18.9 39.7 L16.4 34.4 L13.6 31.6 L8.3 29.1 L5.3 24 L8.3 18.9 L13.6 16.4 L16.4 13.6 L18.9 8.3 Z"); }
    85.714% { d: path("M15.5 15.5 L20.1 11.8 L25 9.2 L29.9 8.1 L34.2 8.6 L37.4 10.6 L39.4 13.8 L39.9 18.1 L38.8 23 L36.2 27.9 L32.5 32.5 L27.9 36.2 L23 38.8 L18.1 39.9 L13.8 39.4 L10.6 37.4 L8.6 34.2 L8.1 29.9 L9.2 25 L11.8 20.1 Z"); }
  }
  @keyframes cn-loading-indicator-rotate { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) {
    .cn-loading-indicator-shape { animation: none; }
  }
`

const LoadingIndicator = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  className,
  showContainer = false,
  ...props
}: LoadingIndicatorProps) => (
  <ProgressPrimitive.Root
    aria-label={ariaLabel ?? (ariaLabelledby ? undefined : 'Loading')}
    aria-labelledby={ariaLabelledby}
    className={cn(
      'cn-loading-indicator grid size-12 place-items-center rounded-full',
      showContainer && 'bg-primary/10',
      className
    )}
    data-slot="loading-indicator"
    value={null}
    {...props}
  >
    {children}
    <svg aria-hidden="true" className="size-[38px] text-primary" viewBox="0 0 48 48">
      <style>{morphStyles}</style>
      <path
        className="cn-loading-indicator-shape"
        d="M24 5 L28 11.6 L35.2 8.6 L34.5 16.4 L42.1 18.1 L37 24 L42.1 29.9 L34.5 31.6 L35.2 39.4 L28 36.4 L24 43 L20 36.4 L12.8 39.4 L13.5 31.6 L5.9 29.9 L11 24 L5.9 18.1 L13.5 16.4 L12.8 8.6 L20 11.6 Z"
        data-slot="loading-indicator-shape"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
    </svg>
  </ProgressPrimitive.Root>
)

export type { LoadingIndicatorProps }
export { LoadingIndicator }
