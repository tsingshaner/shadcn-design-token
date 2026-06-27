import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta = {
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'A vertically stacked set of interactive headings that reveal related content sections. Examples and guidance reference the [shadcn/ui Accordion documentation](https://ui.shadcn.com/docs/components/base/accordion.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Accordion'
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic accordion with one section open by default. Reference: [shadcn/ui Accordion Basic example](https://ui.shadcn.com/docs/components/base/accordion.md#basic)'
      }
    }
  },
  render: () => (
    <Accordion className="max-w-md" defaultValue={['tokens']}>
      <AccordionItem value="tokens">
        <AccordionTrigger>Design tokens</AccordionTrigger>
        <AccordionContent>Color, radius, spacing, and typography variables shared by UI components.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="components">
        <AccordionTrigger>Components</AccordionTrigger>
        <AccordionContent>Composable React primitives styled with the shared token system.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(
    canvas.getByText('Color, radius, spacing, and typography variables shared by UI components.')
  ).toBeVisible()

  await userEvent.click(canvas.getByRole('button', { name: 'Components' }))

  await expect(canvas.getByText('Composable React primitives styled with the shared token system.')).toBeVisible()
}

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Allow multiple sections to remain open together. Reference: [shadcn/ui Accordion Multiple example](https://ui.shadcn.com/docs/components/base/accordion.md#multiple)'
      }
    }
  },
  render: () => (
    <Accordion className="max-w-md" defaultValue={['tokens', 'components']}>
      <AccordionItem value="tokens">
        <AccordionTrigger>Design tokens</AccordionTrigger>
        <AccordionContent>Centralized values for colors, spacing, radius, and typography.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="components">
        <AccordionTrigger>Components</AccordionTrigger>
        <AccordionContent>Composable primitives styled with the shared token system.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="themes">
        <AccordionTrigger>Themes</AccordionTrigger>
        <AccordionContent>Light and dark mode values can be swapped without changing markup.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Disable unavailable accordion triggers. Reference: [shadcn/ui Accordion Disabled example](https://ui.shadcn.com/docs/components/base/accordion.md#disabled)'
      }
    }
  },
  render: () => (
    <Accordion className="max-w-md" defaultValue={['tokens']}>
      <AccordionItem value="tokens">
        <AccordionTrigger>Design tokens</AccordionTrigger>
        <AccordionContent>Published token sets are available for use.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="themes">
        <AccordionTrigger disabled>Themes</AccordionTrigger>
        <AccordionContent>Theme publishing is disabled for this workspace.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Design tokens' })).toHaveAttribute('aria-expanded', 'true')
  await expect(canvas.getByRole('button', { name: 'Themes' })).toHaveAttribute('aria-disabled', 'true')
}

export const Borders: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use borders to visually separate accordion rows. Reference: [shadcn/ui Accordion Borders example](https://ui.shadcn.com/docs/components/base/accordion.md#borders)'
      }
    }
  },
  render: () => (
    <Accordion className="max-w-md rounded-md border px-4" defaultValue={['usage']}>
      <AccordionItem value="usage">
        <AccordionTrigger>Usage</AccordionTrigger>
        <AccordionContent>Import components from the package entry point.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="styling">
        <AccordionTrigger>Styling</AccordionTrigger>
        <AccordionContent>Adjust design tokens in the stylesheet to theme every component.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place accordion content in a card-like container for settings panels. Reference: [shadcn/ui Accordion Card example](https://ui.shadcn.com/docs/components/base/accordion.md#card)'
      }
    }
  },
  render: () => (
    <Accordion className="max-w-md rounded-lg border bg-card px-4 shadow-sm" defaultValue={['sync']}>
      <AccordionItem value="sync">
        <AccordionTrigger>Token sync</AccordionTrigger>
        <AccordionContent>Automatically sync token updates from the source repository.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="review">
        <AccordionTrigger>Review changes</AccordionTrigger>
        <AccordionContent>Require manual review before publishing generated component styles.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
