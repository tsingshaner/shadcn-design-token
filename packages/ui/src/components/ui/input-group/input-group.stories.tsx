import type { Meta, StoryObj } from '@storybook/react-vite'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from './input-group'

const meta = {
  component: InputGroup,
  tags: ['autodocs'],
  title: 'UI/InputGroup'
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="URL" placeholder="tokens.example.com" />
      <InputGroupAddon>
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
