import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toggle } from '../toggle'
import { ToggleGroup } from './toggle-group'

const meta = {
  component: ToggleGroup,
  tags: ['autodocs'],
  title: 'UI/ToggleGroup'
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={['bold']}>
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  )
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup defaultValue={['bold', 'italic']} multiple>
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  )
}
