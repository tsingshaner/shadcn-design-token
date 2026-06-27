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

export const Default: Story = {
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
