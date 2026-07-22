import { createCallable } from 'react-call'

import type { ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../alert-dialog'

type ConfirmDialogProps = {
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  description?: ReactNode
  title: ReactNode
}

const UNMOUNTING_DELAY = 200

const ConfirmDialog = createCallable<ConfirmDialogProps, boolean>(
  ({ call, cancelLabel = 'Cancel', confirmLabel = 'Continue', description, title }) => (
    <AlertDialog onOpenChange={(open) => !open && call.end(false)} open={!call.ended}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description != null && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={() => call.end(true)}>{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  UNMOUNTING_DELAY
)

export type { ConfirmDialogProps }
export { ConfirmDialog }
