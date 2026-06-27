import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger
} from './combobox'

const meta = {
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          'An autocomplete selection control that combines text input with a selectable list. Examples and guidance reference the [shadcn/ui Combobox documentation](https://ui.shadcn.com/docs/components/base/combobox.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Combobox'
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const
const timezones = [
  { items: ['(GMT-5) New York', '(GMT-8) Los Angeles', '(GMT-6) Chicago'], value: 'Americas' },
  { items: ['(GMT+0) London', '(GMT+1) Paris', '(GMT+1) Berlin'], value: 'Europe' },
  { items: ['(GMT+9) Tokyo', '(GMT+8) Shanghai', '(GMT+8) Singapore'], value: 'Asia/Pacific' }
] as const

const FrameworkItems = () => (
  <ComboboxList>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxGroup>
      {frameworks.map((framework) => (
        <ComboboxItem key={framework} value={framework}>
          {framework}
        </ComboboxItem>
      ))}
    </ComboboxGroup>
  </ComboboxList>
)

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers a simple framework picker from [shadcn/ui Combobox Basic](https://ui.shadcn.com/docs/components/base/combobox.md#basic).'
      }
    }
  },
  render: () => (
    <Combobox defaultOpen items={frameworks}>
      <div className="grid w-72 gap-2">
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <FrameworkItems />
        </ComboboxContent>
      </div>
    </Combobox>
  )
}

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers multiple selection from [shadcn/ui Combobox Multiple](https://ui.shadcn.com/docs/components/base/combobox.md#multiple).'
      }
    }
  },
  render: () => (
    <Combobox defaultOpen defaultValue={[frameworks[0]]} items={frameworks} multiple>
      <div className="grid w-72 gap-2">
        <ComboboxInputGroup>
          <span className="rounded bg-muted px-2 py-0.5 text-sm">{frameworks[0]}</span>
          <ComboboxInput placeholder="Select frameworks" />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <FrameworkItems />
        </ComboboxContent>
      </div>
    </Combobox>
  )
}

export const ClearButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers clear affordances from [shadcn/ui Combobox Clear Button](https://ui.shadcn.com/docs/components/base/combobox.md#clear-button).'
      }
    }
  },
  render: () => (
    <Combobox defaultOpen defaultValue={frameworks[0]} items={frameworks}>
      <div className="grid w-72 gap-2">
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Select a framework" />
          <button className="px-2 text-muted-foreground text-sm" type="button">
            Clear
          </button>
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <FrameworkItems />
        </ComboboxContent>
      </div>
    </Combobox>
  )
}

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers grouped options from [shadcn/ui Combobox Groups](https://ui.shadcn.com/docs/components/base/combobox.md#groups).'
      }
    }
  },
  render: () => (
    <Combobox defaultOpen items={timezones}>
      <div className="grid w-80 gap-2">
        <ComboboxInput placeholder="Select a timezone" />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No timezones found.</ComboboxEmpty>
            {timezones.map((group, index) => (
              <ComboboxGroup key={group.value}>
                <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                {group.items.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
                {index < timezones.length - 1 ? <ComboboxSeparator /> : null}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </div>
    </Combobox>
  )
}
