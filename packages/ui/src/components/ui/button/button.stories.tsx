import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button, buttonVariants } from './button'

type IconProps = SVGProps<SVGSVGElement>

const ArrowUpRightIcon = (props: IconProps) => (
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
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

const GitBranchIcon = (props: IconProps) => (
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
    <path d="M6 3v12" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
)

const GitForkIcon = (props: IconProps) => (
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
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="12" cy="18" r="3" />
    <path d="M6 9v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
    <path d="M12 12v3" />
  </svg>
)

const PlusIcon = (props: IconProps) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const Spinner = ({ 'data-icon': dataIcon }: { 'data-icon'?: 'inline-start' | 'inline-end' }) => (
  <span
    aria-label="Loading"
    className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    data-icon={dataIcon}
    role="status"
  />
)

const meta = {
  args: {
    children: 'Button',
    size: 'default',
    variant: 'default'
  },
  argTypes: {
    size: {
      control: 'select',
      description: 'Controls the button height and horizontal padding.',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"' }
      }
    },
    variant: {
      control: 'select',
      description: 'Controls the visual treatment for the button action.',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      table: {
        defaultValue: { summary: 'default' },
        type: {
          summary: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"'
        }
      }
    }
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a button or a component that looks like a button. Built on Base UI Button with shared design-token variants, sizes, focus states, and disabled behavior. For native form submission, pass `type="submit"` explicitly. See the [shadcn/ui Button documentation](https://ui.shadcn.com/docs/components/base/button) and [Base UI Button documentation](https://base-ui.com/react/components/button).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Button'
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button aria-label="Submit" size="icon" variant="outline">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
}

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the `size` prop to change the size of the button. Reference: [shadcn/ui Button Size example](https://ui.shadcn.com/docs/components/base/button.md#size). Coverage alias: https://ui.shadcn.com/docs/components/base/button.md#si.'
      }
    }
  },
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="xs" variant="outline">
          Extra Small
        </Button>
        <Button aria-label="Submit" size="icon-xs" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button aria-label="Submit" size="icon-sm" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button aria-label="Submit" size="icon" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button aria-label="Submit" size="icon-lg" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}

export const Default: Story = {}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Button' })).toBeInTheDocument()
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive'
  }
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link'
  }
}

export const Icon: Story = {
  args: {
    'aria-label': 'Submit',
    children: <ArrowUpRightIcon />,
    size: 'icon',
    variant: 'outline'
  }
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add `data-icon="inline-start"` or `data-icon="inline-end"` to inline icons so spacing stays correct.'
      }
    }
  },
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline">
        <GitBranchIcon data-icon="inline-start" />
        New Branch
      </Button>
      <Button variant="outline">
        Fork
        <GitForkIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}

export const Rounded: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the `rounded-full` class to make the button rounded.'
      }
    }
  },
  render: () => (
    <div className="flex gap-2">
      <Button className="rounded-full">Get Started</Button>
      <Button aria-label="Submit" className="rounded-full" size="icon" variant="outline">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Render a spinner inside a disabled button to show a loading state.'
      }
    }
  },
  render: () => (
    <div className="flex gap-2">
      <Button disabled variant="outline">
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button disabled variant="secondary">
        Downloading
        <Spinner data-icon="inline-end" />
      </Button>
    </div>
  )
}

export const AsLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `buttonVariants` with a plain anchor when a link should look like a button. Keep `Button` for button semantics.'
      }
    }
  },
  render: () => (
    <a className={buttonVariants({ size: 'sm', variant: 'secondary' })} href="#button-as-link">
      Login
    </a>
  )
}

export const Rtl: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Buttons inherit direction from their container; icon rotation can be handled with RTL-aware utility classes.'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2 md:flex-row" dir="rtl">
      <Button variant="outline">زر</Button>
      <Button variant="destructive">حذف</Button>
      <Button variant="outline">
        إرسال
        <ArrowUpRightIcon data-icon="inline-end" />
      </Button>
      <Button aria-label="Add" size="icon" variant="outline">
        <PlusIcon />
      </Button>
      <Button disabled variant="secondary">
        <Spinner data-icon="inline-start" />
        جاري التحميل
      </Button>
    </div>
  )
}
