import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

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
})
