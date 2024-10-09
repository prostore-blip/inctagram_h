import { ComponentPropsWithoutRef, ElementRef, forwardRef, memo } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { Inter } from 'next/font/google'

import s from './modal.module.scss'
const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const Modal = memo((props: ComponentPropsWithoutRef<typeof Dialog.Root>) => {
  return <Dialog.Root {...props} />
})

export type OwnerModalTriggerProps = {
  className?: string
}

export const ModalTrigger = memo(
  forwardRef<
    ElementRef<typeof Dialog.Trigger>,
    ComponentPropsWithoutRef<typeof Dialog.Trigger> & OwnerModalTriggerProps
  >((props, ref) => {
    const { asChild, children } = props

    return (
      <Dialog.Trigger asChild={asChild} className={inter.className} ref={ref}>
        {children}
      </Dialog.Trigger>
    )
  })
)

export type OwnerModalContentProps = {
  className?: string
}

export const ModalContent = memo(
  forwardRef<
    ElementRef<typeof Dialog.Content>,
    ComponentPropsWithoutRef<typeof Dialog.Content> & OwnerModalContentProps
  >((props, ref) => {
    const { asChild, children, className, ...rest } = props

    return (
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content
          asChild={asChild}
          className={clsx(s.content, className, inter.className)}
          ref={ref}
          {...rest}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    )
  })
)

export type OwnerModalButtonCancelProps = {
  cancelTitle?: string
  className?: string
}

export const ModalButtonCancel = memo(
  forwardRef<
    ElementRef<typeof Dialog.Close>,
    ComponentPropsWithoutRef<typeof Dialog.Close> & OwnerModalButtonCancelProps
  >((props, ref) => {
    const { asChild, children } = props

    return (
      <Dialog.Close asChild={asChild} ref={ref}>
        {children}
      </Dialog.Close>
    )
  })
)

export type OwnerModalTitleProps = {
  className?: string
}

export const ModalTitle = memo(
  forwardRef<
    ElementRef<typeof Dialog.Title>,
    ComponentPropsWithoutRef<typeof Dialog.Title> & OwnerModalTitleProps
  >((props, ref) => {
    const { asChild, children, ...rest } = props

    return (
      <Dialog.Title asChild={asChild} ref={ref} {...rest}>
        {children}
      </Dialog.Title>
    )
  })
)
