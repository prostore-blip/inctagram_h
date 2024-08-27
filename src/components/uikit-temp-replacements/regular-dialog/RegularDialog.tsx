'use client'

import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from 'react'

import * as DialogSource from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './regularDialog.module.scss'

const Dialog = DialogSource.Root

const DialogTrigger = DialogSource.Trigger

const DialogPortal = DialogSource.Portal

const DialogClose = DialogSource.Close

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogSource.Overlay>,
  ComponentPropsWithoutRef<typeof DialogSource.Overlay>
>(({ className, ...props }, ref) => (
  <DialogSource.Overlay className={clsx(s.overlay, className)} ref={ref} {...props} />
))

DialogOverlay.displayName = DialogSource.Overlay.displayName

const DialogContent = forwardRef<
  ElementRef<typeof DialogSource.Content>,
  ComponentPropsWithoutRef<typeof DialogSource.Content>
>(({ children, className, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogSource.Content className={clsx(s.content, className)} ref={ref} {...props}>
      {children}
    </DialogSource.Content>
  </DialogPortal>
))

DialogContent.displayName = DialogSource.Content.displayName

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(s.header, className)} {...props} />
)

DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(s.footer, className)} {...props} />
)

DialogFooter.displayName = 'DialogFooter'

const DialogTitle = forwardRef<
  ElementRef<typeof DialogSource.Title>,
  ComponentPropsWithoutRef<typeof DialogSource.Title>
>(({ className, ...props }, ref) => (
  <DialogSource.Title className={clsx(className)} ref={ref} {...props} />
))

DialogTitle.displayName = DialogSource.Title.displayName

const DialogDescription = forwardRef<
  ElementRef<typeof DialogSource.Description>,
  ComponentPropsWithoutRef<typeof DialogSource.Description>
>(({ className, ...props }, ref) => (
  <DialogSource.Description className={clsx(s.description, className)} ref={ref} {...props} />
))

DialogDescription.displayName = DialogSource.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
