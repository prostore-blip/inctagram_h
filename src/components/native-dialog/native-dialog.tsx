import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'

import { CloseIcon } from '@/assets/icons/close-icon'
import { Button } from '@chrizzo/ui-kit'
import { clsx } from 'clsx'

import s from './native-dialog.module.scss'

export type DialogProps = {
  isModal?: boolean
  onClose?: () => void
} & ComponentPropsWithoutRef<'dialog'>

export const NativeDialog = ({
  children,
  className,
  isModal = true,
  onClose,
  open,
  ...restProps
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialogElement = dialogRef.current

    if (!dialogElement) {
      return
    }

    if (open) {
      if (isModal) {
        dialogElement.showModal()
      } else {
        dialogElement.show()
      }
    }
    if (!open) {
      dialogElement.close()
    }
  }, [open, isModal])

  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <dialog
      className={clsx(open && s.dialog, className)}
      onClose={handleClose}
      ref={dialogRef}
      {...restProps}
    >
      {children}
      <Button className={s.closeButton} onClick={handleClose} variant={'text'}>
        <CloseIcon size={14} />
      </Button>
    </dialog>
  )
}
