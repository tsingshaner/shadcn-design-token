import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { ButtonGroup, ButtonGroupSeparator } from './button-group'

const meta = {
  component: ButtonGroup,
  tags: ['autodocs'],
  title: 'UI/ButtonGroup'
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Paste</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">More</Button>
    </ButtonGroup>
  )
}
