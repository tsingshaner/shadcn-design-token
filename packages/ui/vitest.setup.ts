import '@testing-library/jest-dom/vitest'

class ResizeObserverMock {
  disconnect() {}
  observe() {}
  unobserve() {}
}

globalThis.ResizeObserver ??= ResizeObserverMock

Element.prototype.scrollIntoView ??= function scrollIntoView() {}

if (!globalThis.PointerEvent) {
  globalThis.PointerEvent = MouseEvent as typeof PointerEvent
}
