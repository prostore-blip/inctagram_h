import { DialogProps, NativeDialog } from '@/components/native-dialog/native-dialog'
import { Button, Typography } from '@chrizzo/ui-kit'

import s from './native-confirm.module.scss'

export type NativeConfirmProps = {
  text: string
} & DialogProps

export const NativeConfirm = ({
  onClose,
  role = 'alertdialog',
  text,
  title,
  ...restProps
}: NativeConfirmProps) => {
  return (
    <NativeDialog {...restProps} onClose={onClose} role={role} title={title}>
      <div className={s.header}>
        <Typography variant={'h1'}>{title}</Typography>
      </div>
      <div className={s.content}>
        <Typography variant={'regular16'}>{text}</Typography>
      </div>
      <div className={s.buttonContainer}>
        <div className={s.flexFiller} />
        <Button onClick={onClose} variant={'primary'}>
          OK
        </Button>
      </div>
    </NativeDialog>
  )
}

//todo promise based confirm
