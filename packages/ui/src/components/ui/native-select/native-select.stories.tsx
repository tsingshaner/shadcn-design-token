import type { Meta, StoryObj } from '@storybook/react-vite'

import { NativeSelect } from './native-select'

const meta = {
  component: NativeSelect,
  parameters: {
    docs: {
      description: {
        component:
          'A styled native select element for simple option picking. Examples and guidance reference the [shadcn/ui Native Select documentation](https://ui.shadcn.com/docs/components/base/native-select.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/NativeSelect'
} satisfies Meta<typeof NativeSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NativeSelect aria-label="Component">
      <option>Button</option>
      <option>Card</option>
      <option>Input</option>
    </NativeSelect>
  )
}
