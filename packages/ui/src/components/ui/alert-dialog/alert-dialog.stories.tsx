import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog'

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
  title: 'UI/AlertDialog'
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Delete token</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this token?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The token will be removed from synced themes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button variant="destructive" />}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
