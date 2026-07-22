import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Ripple } from './ripple'

describe('Ripple', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    Reflect.deleteProperty(Element.prototype, 'animate')
  })

  test('grows a press state layer from the pointer position', () => {
    const animate = vi.fn(() => ({ cancel: vi.fn() }) as unknown as Animation)
    Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
    render(
      <button type="button">
        Press
        <Ripple />
      </button>
    )
    const button = screen.getByRole('button', { name: 'Press' })
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      bottom: 60,
      height: 40,
      left: 10,
      right: 110,
      toJSON: () => ({}),
      top: 20,
      width: 100,
      x: 10,
      y: 20
    })

    fireEvent.pointerDown(button, { button: 0, clientX: 30, clientY: 40, pointerType: 'mouse' })

    const press = button.querySelector('[data-slot="ripple-press"]')
    expect(press).toHaveStyle({ height: '20px', opacity: '0.12', width: '20px' })
    expect(animate).toHaveBeenCalledWith(
      {
        transform: ['translate(10px, 10px) scale(1)', expect.stringMatching(/^translate\(40px, 10px\) scale\(/)]
      },
      {
        duration: 450,
        easing: 'cubic-bezier(0.2, 0, 0, 1)',
        fill: 'forwards'
      }
    )
  })

  test('does not show a press state layer when disabled', () => {
    const animate = vi.fn(() => ({ cancel: vi.fn() }) as unknown as Animation)
    Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
    render(
      <button disabled type="button">
        Press
        <Ripple />
      </button>
    )

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Press' }), {
      button: 0,
      pointerType: 'mouse'
    })

    expect(animate).not.toHaveBeenCalled()
  })

  test('centers an unbounded ripple on its control', () => {
    const animate = vi.fn(() => ({ cancel: vi.fn() }) as unknown as Animation)
    Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
    render(
      <button type="button">
        Select
        <Ripple unbounded />
      </button>
    )
    const ripple = document.querySelector<HTMLElement>('[data-slot="ripple"]') as HTMLElement
    vi.spyOn(ripple, 'getBoundingClientRect').mockReturnValue({
      bottom: 50,
      height: 40,
      left: 10,
      right: 50,
      toJSON: () => ({}),
      top: 10,
      width: 40,
      x: 10,
      y: 10
    })

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Select' }), {
      button: 0,
      clientX: 12,
      clientY: 12,
      pointerType: 'mouse'
    })

    expect(animate).toHaveBeenCalledWith(
      {
        transform: [
          expect.stringMatching(/^translate\(16px, 16px\)/),
          expect.stringMatching(/^translate\(16px, 16px\)/)
        ]
      },
      expect.any(Object)
    )
  })
})
