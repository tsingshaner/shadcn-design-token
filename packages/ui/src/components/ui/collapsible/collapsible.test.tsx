import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

describe('Collapsible', () => {
  afterEach(() => {
    cleanup()
  })

  test('toggles collapsible content', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))

    expect(screen.getByText('Hidden content')).toBeVisible()
  })
})
