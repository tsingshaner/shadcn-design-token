import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const meta = {
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'A small anchored hint for supplemental information. Examples and guidance reference the [shadcn/ui Tooltip documentation](https://ui.shadcn.com/docs/components/base/tooltip.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Tooltip'
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
        <TooltipContent>Token metadata</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
