import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'

import { Close } from '@/assets/icons/close'
import { Button } from '@chrizzo/ui-kit'
import * as Dialog from '@radix-ui/react-dialog'

export type DialogProps = {
  isModal?: boolean
  isOpen: boolean
  onClose: () => void
} & ComponentPropsWithoutRef<'dialog'>

const NativeDialog = ({ children, isModal = true, isOpen, onClose }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialogElement = dialogRef.current

    if (!dialogElement) {
      return
    }

    if (isOpen) {
      if (isModal) {
        dialogElement.showModal()
      } else {
        dialogElement.show()
      }
    } else {
      dialogElement.close()
    }
  }, [isOpen, isModal])

  const handleClose = () => {
    onClose()
  }

  return (
    <dialog onClose={handleClose} ref={dialogRef}>
      <Dialog.Root></Dialog.Root>
      {children}
      <Button onClick={handleClose}>
        <Close />
      </Button>
    </dialog>
  )
}
