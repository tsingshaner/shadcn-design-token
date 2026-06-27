import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Badge } from '../badge'
import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '../input-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Input } from './input'

type IconProps = SVGProps<SVGSVGElement>

const InfoIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' }
]

const meta = {
  args: {
    placeholder: 'Email'
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the input and applies the disabled visual state.'
    },
    placeholder: {
      control: 'text',
      description: 'Helper text shown when the input has no value.'
    },
    type: {
      control: 'select',
      description: 'Native input type forwarded to the underlying input element.',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'file']
    }
  },
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'A text input component for forms and user data entry. Story examples are adapted from the [shadcn/ui Base Input documentation](https://ui.shadcn.com/docs/components/base/input.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Input'
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: 'Enter text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic text input pattern. Reference: [shadcn/ui Input Basic example](https://ui.shadcn.com/docs/components/base/input.md#basic)'
      }
    }
  }
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByPlaceholderText('Enter text')

  await userEvent.type(input, 'Token name')

  await expect(input).toHaveValue('Token name')
}

export const FieldExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Field, FieldLabel, and FieldDescription to pair an input with accessible supporting copy. Reference: [shadcn/ui Input Field example](https://ui.shadcn.com/docs/components/base/input.md#field)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
      <Input id="input-field-username" placeholder="Enter your username" type="text" />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  )
}

export const FieldGroupExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldGroup to stack related fields and form actions. Reference: [shadcn/ui Input Field Group example](https://ui.shadcn.com/docs/components/base/input.md#field-group)'
      }
    }
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input id="fieldgroup-email" placeholder="name@example.com" type="email" />
        <FieldDescription>We&apos;ll send updates to this address.</FieldDescription>
      </Field>
      <Field className="flex-row justify-end">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the disabled prop on Input and data-disabled on Field when the field container should share the disabled state. Reference: [shadcn/ui Input Disabled example](https://ui.shadcn.com/docs/components/base/input.md#disabled)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm" data-disabled>
      <FieldLabel htmlFor="input-disabled">Email</FieldLabel>
      <Input disabled id="input-disabled" placeholder="Email" type="email" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Email')).toBeDisabled()
  await expect(canvas.getByText('This field is currently disabled.')).toBeVisible()
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-invalid on the input and data-invalid on the field wrapper to expose and style validation errors. Reference: [shadcn/ui Input Invalid example](https://ui.shadcn.com/docs/components/base/input.md#invalid)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm" data-invalid>
      <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
      <Input aria-invalid id="input-invalid" placeholder="Error" />
      <FieldDescription>This field contains validation errors.</FieldDescription>
    </Field>
  )
}
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Invalid Input')).toHaveAttribute('aria-invalid', 'true')
  await expect(canvas.getByText('This field contains validation errors.')).toBeVisible()
}

export const File: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use type="file" for file upload controls. Reference: [shadcn/ui Input File example](https://ui.shadcn.com/docs/components/base/input.md#file)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}

export const Inline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place an input and a submit action on one row for compact search forms. Reference: [shadcn/ui Input Inline example](https://ui.shadcn.com/docs/components/base/input.md#inline)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[1fr_auto]">
      <Input aria-label="Search" placeholder="Search..." type="search" />
      <Button>Search</Button>
    </Field>
  )
}

export const Grid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use a grid layout to place related inputs side by side. Reference: [shadcn/ui Input Grid example](https://ui.shadcn.com/docs/components/base/input.md#grid)'
      }
    }
  },
  render: () => (
    <FieldGroup className="grid max-w-sm grid-cols-2">
      <Field>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input id="first-name" placeholder="Jordan" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
        <Input id="last-name" placeholder="Lee" />
      </Field>
    </FieldGroup>
  )
}

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the required attribute and visible label affordance for required fields. Reference: [shadcn/ui Input Required example](https://ui.shadcn.com/docs/components/base/input.md#required)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-required">
        Required Field <span className="text-destructive">*</span>
      </FieldLabel>
      <Input id="input-required" placeholder="This field is required" required />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  )
}
Required.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText(/Required Field/)).toBeRequired()
}

export const WithBadge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair a label with Badge when a field needs an inline status or recommendation marker. Reference: [shadcn/ui Input Badge example](https://ui.shadcn.com/docs/components/base/input.md#badge)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel className="flex items-center" htmlFor="input-badge">
        Webhook URL
        <Badge className="ml-auto" variant="secondary">
          Beta
        </Badge>
      </FieldLabel>
      <Input id="input-badge" placeholder="https://api.example.com/webhook" type="url" />
    </Field>
  )
}

export const WithInputGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use InputGroup for inline adornments such as protocol text or icons. Reference: [shadcn/ui Input Group example](https://ui.shadcn.com/docs/components/base/input.md#input-group)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon>
          <InfoIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}

export const WithButtonGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ButtonGroup when an input is coupled to an adjacent action. Reference: [shadcn/ui Input Button Group example](https://ui.shadcn.com/docs/components/base/input.md#button-group)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup className="w-full [&_[data-slot=button]]:rounded-l-none [&_[data-slot=input]]:rounded-r-none [&_[data-slot=input]]:shadow-none">
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  )
}

export const Form: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A complete form composition with multiple inputs, a select, descriptions, and actions. Reference: [shadcn/ui Input Form example](https://ui.shadcn.com/docs/components/base/input.md#form)'
      }
    }
  },
  render: () => (
    <form className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input id="form-name" placeholder="Jordan Lee" required type="text" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input id="form-email" placeholder="john@example.com" type="email" />
          <FieldDescription>We&apos;ll never share your email with anyone.</FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
            <Input id="form-phone" placeholder="+1 (555) 123-4567" type="tel" />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-country">Country</FieldLabel>
            <Select defaultValue="us" items={countries}>
              <SelectTrigger id="form-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="form-address">Address</FieldLabel>
          <Input id="form-address" placeholder="123 Main St" type="text" />
        </Field>
        <Field className="flex-row justify-end">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
Form.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Name')).toBeRequired()
  await expect(canvas.getByLabelText('Email')).toHaveAttribute('type', 'email')
  await expect(canvas.getByRole('button', { name: 'Submit' })).toBeEnabled()
}
