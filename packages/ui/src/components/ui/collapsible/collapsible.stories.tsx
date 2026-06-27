import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

const meta = {
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component:
          'A disclosure pattern for showing and hiding a single content region. Examples and guidance reference the [shadcn/ui Collapsible documentation](https://ui.shadcn.com/docs/components/base/collapsible.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Collapsible'
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80" defaultOpen>
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-sm">Token collections</span>
        <CollapsibleTrigger render={<Button size="sm" variant="ghost" />}>Toggle</CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-muted-foreground">
        Foundation, semantic, and component-scoped tokens.
      </CollapsibleContent>
    </Collapsible>
  )
}
