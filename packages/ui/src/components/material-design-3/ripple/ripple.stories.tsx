import type { Meta, StoryObj } from '@storybook/react-vite'

import { Ripple } from './ripple'

const meta = {
  component: Ripple,
  parameters: {
    docs: {
      description: {
        component:
          'Adds the Material Design 3 hover and pressed state layers to its positioned parent. The parent must use `position: relative`. See the [Material Web Ripple documentation](https://material-web.dev/components/ripple/).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Ripple'
} satisfies Meta<typeof Ripple>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render: () => (
    <button
      className="relative h-10 overflow-hidden rounded-full bg-primary px-6 font-medium text-primary-foreground text-sm"
      type="button"
    >
      Press me
      <Ripple />
    </button>
  )
}
