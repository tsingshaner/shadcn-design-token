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
    expect(fallback).toHaveAttribute('data-scope', 'avatar')
    expect(fallback).toHaveAttribute('data-slot', 'fallback')

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

    const avatar = screen.getByText('JD').closest('[data-scope="avatar"][data-slot="root"]')
    const groupCount = screen.getByText('+3')
    const badge = document.querySelector('[data-scope="avatar"][data-slot="badge"]')
    const group = document.querySelector('[data-scope="avatar"][data-slot="group"]')
    expect(avatar).toHaveAttribute('data-size', 'lg')
    expect(avatar).toHaveAttribute('data-scope', 'avatar')
    expect(avatar).toHaveAttribute('data-slot', 'root')
    expect(groupCount).toHaveAttribute('data-scope', 'avatar')
    expect(groupCount).toHaveAttribute('data-slot', 'group-count')

    expect(badge).toHaveAttribute('data-scope', 'avatar')
    expect(badge).toHaveAttribute('data-slot', 'badge')
    expect(group).toHaveAttribute('data-scope', 'avatar')
    expect(group).toHaveAttribute('data-slot', 'group')
  })
})
