import { type ComponentProps, useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

const MINIMUM_PRESS_MS = 225
const PRESS_GROW_MS = 450
const TOUCH_DELAY_MS = 150

type RippleProps = Omit<ComponentProps<'span'>, 'children' | 'ref'> & {
  disabled?: boolean
  hover?: boolean
  unbounded?: boolean
}

const Ripple = ({ className, disabled = false, hover: showHover = true, unbounded = false, ...props }: RippleProps) => {
  const rootRef = useRef<HTMLSpanElement>(null)
  const hoverRef = useRef<HTMLSpanElement>(null)
  const pressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const control = root?.parentElement
    const hoverLayer = hoverRef.current
    const press = pressRef.current

    if (!(root && control && hoverLayer && press) || disabled) {
      return
    }
    if (window.matchMedia?.('(forced-colors: active)').matches) {
      return
    }

    let animation: Animation | undefined
    let pressStartedAt = 0
    let releaseTimer: ReturnType<typeof setTimeout> | undefined
    let touchTimer: ReturnType<typeof setTimeout> | undefined
    let startEvent: PointerEvent | undefined

    const isControlDisabled = () => control.matches(':disabled, [aria-disabled="true"], [data-disabled]')

    const startPress = (event?: PointerEvent) => {
      const { height, left, top, width } = (unbounded ? root : control).getBoundingClientRect()
      const maxDimension = Math.max(height, width)
      const initialSize = Math.max(1, Math.floor(maxDimension * 0.2))
      const softEdge = Math.max(maxDimension * 0.35, 75)
      const scale = (Math.hypot(width, height) + 10 + softEdge) / initialSize
      const positionEvent = unbounded ? undefined : event
      const [originX, originY] = positionEvent
        ? [positionEvent.clientX - left, positionEvent.clientY - top]
        : [width / 2, height / 2]
      const startX = originX - initialSize / 2
      const startY = originY - initialSize / 2
      const endX = (width - initialSize) / 2
      const endY = (height - initialSize) / 2

      clearTimeout(releaseTimer)
      animation?.cancel()
      press.style.height = `${initialSize}px`
      press.style.width = `${initialSize}px`
      press.style.opacity = '0.12'
      press.style.transitionDuration = '105ms'
      pressStartedAt = performance.now()
      if (typeof press.animate === 'function') {
        animation = press.animate(
          {
            transform: [
              `translate(${startX}px, ${startY}px) scale(1)`,
              `translate(${endX}px, ${endY}px) scale(${scale})`
            ]
          },
          {
            duration: PRESS_GROW_MS,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            fill: 'forwards'
          }
        )
      } else {
        press.style.transform = `translate(${endX}px, ${endY}px) scale(${scale})`
      }
    }

    const endPress = () => {
      const elapsed = performance.now() - pressStartedAt
      releaseTimer = setTimeout(
        () => {
          press.style.opacity = '0'
          press.style.transitionDuration = '375ms'
        },
        Math.max(0, MINIMUM_PRESS_MS - elapsed)
      )
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || event.isPrimary === false || isControlDisabled()) {
        return
      }

      startEvent = event
      pressStartedAt = 0
      if (event.pointerType === 'touch') {
        touchTimer = setTimeout(() => startPress(event), TOUCH_DELAY_MS)
      } else {
        startPress(event)
      }
    }

    const handlePointerUp = () => {
      if (!startEvent) {
        return
      }
      if (touchTimer) {
        clearTimeout(touchTimer)
        touchTimer = undefined
        if (pressStartedAt === 0) {
          startPress(startEvent)
        }
      }
      startEvent = undefined
      endPress()
    }

    const handlePointerCancel = () => {
      clearTimeout(touchTimer)
      touchTimer = undefined
      startEvent = undefined
      if (pressStartedAt > 0) {
        endPress()
      }
    }

    const handlePointerEnter = (event: PointerEvent) => {
      if (showHover && event.pointerType !== 'touch' && !isControlDisabled()) {
        hoverLayer.style.opacity = '0.08'
      }
    }

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') {
        hoverLayer.style.opacity = '0'
      }
      if (startEvent && event.pointerType !== 'touch') {
        handlePointerCancel()
      }
    }

    const handleClick = (event: MouseEvent) => {
      if (event.detail !== 0 || isControlDisabled()) {
        return
      }
      startPress()
      endPress()
    }

    control.addEventListener('click', handleClick)
    control.addEventListener('pointercancel', handlePointerCancel)
    control.addEventListener('pointerdown', handlePointerDown)
    control.addEventListener('pointerenter', handlePointerEnter)
    control.addEventListener('pointerleave', handlePointerLeave)
    control.addEventListener('pointerup', handlePointerUp)

    return () => {
      clearTimeout(releaseTimer)
      clearTimeout(touchTimer)
      animation?.cancel()
      control.removeEventListener('click', handleClick)
      control.removeEventListener('pointercancel', handlePointerCancel)
      control.removeEventListener('pointerdown', handlePointerDown)
      control.removeEventListener('pointerenter', handlePointerEnter)
      control.removeEventListener('pointerleave', handlePointerLeave)
      control.removeEventListener('pointerup', handlePointerUp)
    }
  }, [disabled, showHover, unbounded])

  return (
    <span
      aria-hidden="true"
      className={cn(
        'cn-ripple pointer-events-none absolute overflow-hidden forced-colors:hidden',
        unbounded
          ? 'top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full'
          : 'inset-0 rounded-[inherit]',
        disabled && 'hidden',
        className
      )}
      data-slot="ripple"
      ref={rootRef}
      {...props}
    >
      <span
        className="absolute inset-0 bg-current opacity-0 transition-opacity duration-[15ms]"
        data-slot="ripple-hover"
        ref={hoverRef}
      />
      <span
        className="absolute top-0 left-0 rounded-full opacity-0 transition-opacity"
        data-slot="ripple-press"
        ref={pressRef}
        style={{
          background: 'radial-gradient(closest-side, currentColor max(calc(100% - 70px), 65%), transparent 100%)'
        }}
      />
    </span>
  )
}

export type { RippleProps }
export { Ripple }
