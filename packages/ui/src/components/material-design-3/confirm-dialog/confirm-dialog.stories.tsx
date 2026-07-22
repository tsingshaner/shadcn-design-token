import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { ConfirmDialog } from './confirm-dialog'

const ConfirmDialogExample = () => {
  const [confirmed, setConfirmed] = useState<boolean>()

  const openDialog = async () => {
    setConfirmed(
      await ConfirmDialog.call({
        description: 'This action cannot be undone.',
        title: 'Delete token?'
      })
    )
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button onClick={openDialog} variant="destructive">
        Delete token
      </Button>
      <p aria-live="polite" className="text-muted-foreground text-sm">
        {confirmed === undefined ? 'No response yet' : `Confirmed: ${confirmed}`}
      </p>
      <ConfirmDialog />
    </div>
  )
}

const meta = {
  component: ConfirmDialog,
  parameters: {
    docs: {
      description: {
        component:
          'Mount ConfirmDialog once, then call and await `ConfirmDialog.call(...)` from an event handler. The promise resolves to `true` when confirmed and `false` when cancelled.'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/ConfirmDialog'
} satisfies Meta<typeof ConfirmDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ConfirmDialogExample />
}

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Delete token' }))
  await expect(await page.findByRole('alertdialog', { name: 'Delete token?' })).toBeVisible()
  await userEvent.click(page.getByRole('button', { name: 'Cancel' }))
  await expect(await canvas.findByText('Confirmed: false')).toBeVisible()
}
