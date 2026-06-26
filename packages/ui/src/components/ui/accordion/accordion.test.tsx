import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

describe('Accordion', () => {
  afterEach(() => {
    cleanup()
  })

  test('expands an accordion item', () => {
    render(
      <Accordion>
        <AccordionItem value="item">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Expanded content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Details' }))

    expect(screen.getByText('Expanded content')).toBeVisible()
  })
})
