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

const frameworks = ['Next.js', 'Remix', 'Astro', 'Laravel', 'Nuxt']

export const Default: Story = {
  render: () => (
    <Combobox defaultOpen items={frameworks}>
      <div className="grid w-72 gap-2">
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Search framework" />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxGroupLabel>Frameworks</ComboboxGroupLabel>
              {frameworks.map((framework) => (
                <ComboboxItem key={framework} value={framework}>
                  {framework}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </div>
    </Combobox>
  )
}
