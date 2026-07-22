import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../../ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog'

type IconProps = SVGProps<SVGSVGElement>

const PlusCircleIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
)

const meta = {
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component:
          'A modal confirmation dialog for critical actions that require explicit user attention. Examples and guidance reference the [shadcn/ui Alert Dialog documentation](https://ui.shadcn.com/docs/components/base/alert-dialog.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/AlertDialog'
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers the confirmation dialog layout from [shadcn/ui Alert Dialog Basic](https://ui.shadcn.com/docs/components/base/alert-dialog.md#basic).'
      }
    }
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Show Dialog</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Show Dialog' }))

  await expect(await page.findByRole('alertdialog', { name: 'Are you absolutely sure?' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled()
}

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers compact dialogs from [shadcn/ui Alert Dialog Small](https://ui.shadcn.com/docs/components/base/alert-dialog.md#small).'
      }
    }
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Show Dialog</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <PlusCircleIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to allow the USB accessory to connect to this device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Don&apos;t allow</AlertDialogCancel>
          <AlertDialogAction render={<Button />}>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
Small.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Show Dialog' }))

  await expect(await page.findByRole('alertdialog', { name: 'Allow accessory to connect?' })).toHaveAttribute(
    'data-size',
    'sm'
  )
  await expect(page.getByRole('button', { name: "Don't allow" })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Allow' })).toBeEnabled()
}
