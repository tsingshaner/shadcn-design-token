import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar'

describe('Avatar', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders image and fallback slots', () => {
    const onLoadingStatusChange = vi.fn()

    render(
      <Avatar>
        <AvatarImage alt="User" onLoadingStatusChange={onLoadingStatusChange} src="/avatar.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )

    const fallback = screen.getByText('JD')
    expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback')
    expect(fallback).toHaveClass('cn-avatar-fallback')
    expect(onLoadingStatusChange).toHaveBeenCalled()
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

    const avatar = screen.getByText('JD').closest('[data-slot="avatar"]')
    const groupCount = screen.getByText('+3')
    const badge = document.querySelector('[data-slot="avatar-badge"]')
    const group = document.querySelector('[data-slot="avatar-group"]')
    expect(avatar).toHaveAttribute('data-size', 'lg')
    expect(avatar).toHaveClass('cn-avatar')
    expect(groupCount).toHaveAttribute('data-slot', 'avatar-group-count')
    expect(groupCount).toHaveClass('cn-avatar-group-count')
    expect(badge).toHaveClass('cn-avatar-badge')
    expect(group).toHaveClass('cn-avatar-group')
  })
})
