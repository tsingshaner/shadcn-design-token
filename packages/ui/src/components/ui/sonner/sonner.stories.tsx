import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Sonner, sonnerToast } from './sonner'

const meta = {
  component: Sonner,
  parameters: {
    docs: {
      description: {
        component:
          'Toast notification primitives built around the Sonner pattern. Examples and guidance reference the [shadcn/ui Sonner documentation](https://ui.shadcn.com/docs/components/base/sonner.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Sonner'
} satisfies Meta<typeof Sonner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => sonnerToast.success('Token published')}>Publish</Button>
      <Sonner timeout={3000} />
    </>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Publish' }))

  await expect(await page.findByText('Token published')).toHaveAttribute('data-slot', 'toast-title')
}

export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers toast types from [shadcn/ui Sonner Types](https://ui.shadcn.com/docs/components/base/sonner.md#types).'
      }
    }
  },
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => sonnerToast.toast('Event has been created')} variant="outline">
          Default
        </Button>
        <Button onClick={() => sonnerToast.success('Event has been created')} variant="outline">
          Success
        </Button>
        <Button onClick={() => sonnerToast.info('Be at the area 10 minutes before the event time')} variant="outline">
          Info
        </Button>
        <Button
          onClick={() =>
            sonnerToast.custom({ description: 'Event start time cannot be earlier than 8am', type: 'warning' })
          }
          variant="outline"
        >
          Warning
        </Button>
        <Button onClick={() => sonnerToast.error('Event has not been created')} variant="outline">
          Error
        </Button>
        <Button
          onClick={() =>
            sonnerToast.promise(
              new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: 'Event' }), 2000)),
              {
                error: 'Error',
                loading: 'Loading...',
                success: (data) => `${data.name} has been created`
              }
            )
          }
          variant="outline"
        >
          Promise
        </Button>
      </div>
      <Sonner timeout={3000} />
    </>
  )
}
Types.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Success' }))

  await expect(await page.findByText('Event has been created')).toHaveAttribute('data-slot', 'toast-title')
}

export const Description: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers secondary toast copy from [shadcn/ui Sonner Description](https://ui.shadcn.com/docs/components/base/sonner.md#description).'
      }
    }
  },
  render: () => (
    <>
      <Button
        className="w-fit"
        onClick={() =>
          sonnerToast.toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm'
          })
        }
        variant="outline"
      >
        Show Toast
      </Button>
      <Sonner timeout={3000} />
    </>
  )
}
Description.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Show Toast' }))

  await expect(await page.findByText('Event has been created')).toHaveAttribute('data-slot', 'toast-title')
  await expect(page.getByText('Monday, January 3rd at 6:00pm')).toHaveAttribute('data-slot', 'toast-description')
}

export const Position: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers per-toast placement from [shadcn/ui Sonner Position](https://ui.shadcn.com/docs/components/base/sonner.md#position).'
      }
    }
  },
  render: () => (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={() => sonnerToast.toast('Event has been created', { position: 'top-left' })} variant="outline">
          Top Left
        </Button>
        <Button
          onClick={() => sonnerToast.toast('Event has been created', { position: 'top-center' })}
          variant="outline"
        >
          Top Center
        </Button>
        <Button
          onClick={() => sonnerToast.toast('Event has been created', { position: 'top-right' })}
          variant="outline"
        >
          Top Right
        </Button>
        <Button
          onClick={() => sonnerToast.toast('Event has been created', { position: 'bottom-left' })}
          variant="outline"
        >
          Bottom Left
        </Button>
        <Button
          onClick={() => sonnerToast.toast('Event has been created', { position: 'bottom-center' })}
          variant="outline"
        >
          Bottom Center
        </Button>
        <Button
          onClick={() => sonnerToast.toast('Event has been created', { position: 'bottom-right' })}
          variant="outline"
        >
          Bottom Right
        </Button>
      </div>
      <Sonner timeout={3000} />
    </>
  )
}
Position.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Bottom Left' }))

  await expect(await page.findByText('Event has been created')).toHaveAttribute('data-slot', 'toast-title')
  await expect(page.getByTestId('toast-viewport-bottom-left')).toHaveAttribute('data-position', 'bottom-left')
}
