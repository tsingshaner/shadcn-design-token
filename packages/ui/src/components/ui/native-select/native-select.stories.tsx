import type { Meta, StoryObj } from '@storybook/react-vite'

import { NativeSelect } from './native-select'

const meta = {
  component: NativeSelect,
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
