import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from './native-select'

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
  parameters: {
    docs: {
      description: {
        story:
          'Use NativeSelectOptGroup to organize options into categories. Reference: [shadcn/ui Native Select Groups example](https://ui.shadcn.com/docs/components/base/native-select.md#groups)'
      }
    }
  },
  render: () => (
    <NativeSelect aria-label="Component">
      <NativeSelectOption value="">Select department</NativeSelectOption>
      <NativeSelectOptGroup label="Engineering">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Sales">
        <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
        <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
        <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const select = canvas.getByRole('combobox', { name: 'Component' })

  await userEvent.selectOptions(select, 'backend')

  await expect(select).toHaveValue('backend')
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Add disabled to prevent interaction. Reference: [shadcn/ui Native Select Disabled example](https://ui.shadcn.com/docs/components/base/native-select.md#disabled)'
      }
    }
  },
  render: () => (
    <NativeSelect aria-label="Disabled fruit" disabled>
      <NativeSelectOption value="">Disabled</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('combobox', { name: 'Disabled fruit' })).toBeDisabled()
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-invalid to show validation errors. Reference: [shadcn/ui Native Select Invalid example](https://ui.shadcn.com/docs/components/base/native-select.md#invalid)'
      }
    }
  },
  render: () => (
    <NativeSelect aria-invalid aria-label="Invalid fruit">
      <NativeSelectOption value="">Error state</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('combobox', { name: 'Invalid fruit' })).toHaveAttribute('aria-invalid', 'true')
}
