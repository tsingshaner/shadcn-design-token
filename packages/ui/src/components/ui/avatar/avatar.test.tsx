import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar'

describe('Avatar', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders image and fallback slots', () => {
    render(
      <Avatar>
        <AvatarImage alt="User" src="/avatar.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )

    expect(screen.getByAltText('User')).toHaveAttribute('data-slot', 'avatar-image')
    expect(screen.getByText('JD')).toHaveAttribute('data-slot', 'avatar-fallback')
  })

  test('renders badge, group, count, and size slots', () => {
    render(
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    )

    expect(screen.getByText('JD').closest('[data-slot="avatar"]')).toHaveAttribute('data-size', 'lg')
    expect(screen.getByText('+3')).toHaveAttribute('data-slot', 'avatar-group-count')
    expect(document.querySelector('[data-slot="avatar-badge"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="avatar-group"]')).toBeInTheDocument()
  })
})
