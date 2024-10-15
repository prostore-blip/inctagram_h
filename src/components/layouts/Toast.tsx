import { ComponentPropsWithoutRef } from 'react'

import { Close } from '@/assets/icons/close'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'

import s from './toast.module.scss'

type Props = {
  onDismiss?: () => void
  text: string
  variant?: 'error' | 'info' | 'success' | 'warning'
} & ComponentPropsWithoutRef<'div'>

export const Toast = ({ className, onDismiss, text, variant = 'info' }: Props) => {
  const handleDismiss = () => {
    onDismiss && onDismiss()
  }

  return (
    <div className={clsx(s.toastWrapper, s[variant], className)}>
      {text && <Typography variant={'regular16'}>{text}</Typography>}
      <Button className={s.close} onClick={handleDismiss} variant={'text'}>
        <Close />
      </Button>
    </div>
  )
}
