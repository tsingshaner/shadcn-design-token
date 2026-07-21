import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionTriggerIcon } from './accordion'

describe('Accordion', () => {
  afterEach(() => {
    cleanup()
  })

  test('expands an accordion item', () => {
    render(
      <Accordion>
        <AccordionItem value="item">
          <AccordionTrigger>
            Details
            <AccordionTriggerIcon />
          </AccordionTrigger>
          <AccordionContent>Expanded content</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Details' }))

    expect(screen.getByText('Expanded content')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Details' })).toHaveClass('cn-accordion-trigger')
    expect(document.querySelector('[data-slot="accordion"]')).toHaveClass('cn-accordion')
    expect(document.querySelector('[data-slot="accordion-item"]')).toHaveClass('cn-accordion-item')
    expect(document.querySelector('[data-slot="accordion-content"]')).toHaveClass('cn-accordion-content')
    expect(document.querySelector('[data-slot="accordion-trigger-icon"]')).toHaveClass('cn-accordion-trigger-icon')
    expect(document.querySelector('[data-slot="accordion-trigger-icon"]')).toHaveAttribute('aria-hidden', 'true')
  })
})
