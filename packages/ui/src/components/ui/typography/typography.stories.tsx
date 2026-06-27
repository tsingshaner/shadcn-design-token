import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyP
} from './typography'

const meta = {
  component: TypographyH1,
  parameters: {
    docs: {
      description: {
        component:
          'Text primitives and examples for consistent document hierarchy. Examples and guidance reference the [shadcn/ui Typography documentation](https://ui.shadcn.com/docs/components/base/typography.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Typography'
} satisfies Meta<typeof TypographyH1>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <article className="max-w-2xl">
      <TypographyH1>Design tokens</TypographyH1>
      <TypographyLead>Reusable primitives for a token-driven interface.</TypographyLead>
      <TypographyH2>Usage</TypographyH2>
      <TypographyP>
        Compose typography with <TypographyInlineCode>data-slot</TypographyInlineCode> hooks and semantic elements.
      </TypographyP>
      <TypographyBlockquote>Tokens should describe intent before implementation.</TypographyBlockquote>
      <TypographyList>
        <li>Color</li>
        <li>Spacing</li>
      </TypographyList>
    </article>
  )
}
