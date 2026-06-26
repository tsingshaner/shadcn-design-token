import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

afterEach(cleanup)

describe('HoverCard', () => {
  test('renders controlled preview content', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger render={<Button variant="link" />}>@tokens</HoverCardTrigger>
        <HoverCardContent>Token details</HoverCardContent>
      </HoverCard>
    )

    expect(screen.getByText('Token details')).toBeInTheDocument()
  })
})
