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
    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute('data-scope', 'accordion')
    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute('data-slot', 'trigger')
    expect(document.querySelector('[data-scope="accordion"][data-slot="root"]')).toHaveAttribute(
      'data-scope',
      'accordion'
    )
    expect(document.querySelector('[data-scope="accordion"][data-slot="root"]')).toHaveAttribute('data-slot', 'root')
    expect(document.querySelector('[data-scope="accordion"][data-slot="item"]')).toHaveAttribute(
      'data-scope',
      'accordion'
    )
    expect(document.querySelector('[data-scope="accordion"][data-slot="item"]')).toHaveAttribute('data-slot', 'item')
    expect(document.querySelector('[data-scope="accordion"][data-slot="content"]')).toHaveAttribute(
      'data-scope',
      'accordion'
    )
    expect(document.querySelector('[data-scope="accordion"][data-slot="content"]')).toHaveAttribute(
      'data-slot',
      'content'
    )
    expect(document.querySelector('[data-scope="accordion"][data-slot="trigger-icon"]')).toHaveAttribute(
      'data-scope',
      'accordion'
    )
    expect(document.querySelector('[data-scope="accordion"][data-slot="trigger-icon"]')).toHaveAttribute(
      'data-slot',
      'trigger-icon'
    )
    expect(document.querySelector('[data-scope="accordion"][data-slot="trigger-icon"]')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
