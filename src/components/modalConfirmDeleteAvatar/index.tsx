import React, { ReactNode, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { Button, Card, Typography } from '@chrizzo/ui-kit'

import s from './modalConfirmDeleteAvatar.module.scss'

type Props = {
  callback: (setFn: Function) => void
  children: ReactNode
  title: string
  variantTriggerButton: ReactNode
}
export const ModalConfirmDeleteAvatar = ({
  callback,
  children,
  title,
  variantTriggerButton,
}: Props) => {
  /**
   * хук useState для управления open/close Dialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  /**
   * функция вызова коллбэка из пропсов по клику на кнопку Yes.
   */
  const logoutHandler = () => {
    callback(setOpen)
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>{variantTriggerButton}</ModalkaTrigger>
      <ModalkaContent aria-describedby={'open viewport followers'} className={s.content}>
        <ModalkaTitle className={s.title}>
          <Typography variant={'h1'}>{title}</Typography>
          <ModalkaButtonCancel asChild>
            <Button className={s.close} variant={'text'}>
              <Close />
            </Button>
          </ModalkaButtonCancel>
        </ModalkaTitle>
        <Card className={s.card} maxWidth={'644px'} variant={'dark300'}>
          <div className={s.questionConfirmBlock}>{children}</div>
          <div className={s.buttonBlock}>
            <Button className={s.yesButton} onClick={logoutHandler} variant={'outline'}>
              <Typography variant={'h3'}>Yes</Typography>
            </Button>
            <ModalkaButtonCancel asChild>
              <Button className={s.noButton} variant={'primary'}>
                <Typography variant={'h3'}>No</Typography>
              </Button>
            </ModalkaButtonCancel>
          </div>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}
