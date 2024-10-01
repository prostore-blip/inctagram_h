import React, { ReactNode, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { PropsLink } from '@/components/nav/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'

import s from './modalConfirmLogout.module.scss'

type Props = {
  callback: (isButton?: boolean, linkName?: string) => void
  children: ReactNode
  link?: PropsLink
  title: string
  variantTriggerButton: ReactNode
}
export const ModalConfirmLogout = ({
  callback,
  children,
  link,
  title,
  variantTriggerButton,
}: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  /**
   * функция вызова коллбэка из пропсов по клику на кнопку Yes. Коллбэк передаёт в родителя
   * имя кнопки и флаш, является ли ссылка кнопкой
   */
  const logoutHandler = () => {
    callback(link?.isButton, link?.name)
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>{variantTriggerButton}</ModalkaTrigger>
      <ModalkaContent aria-describedby={undefined} className={s.content}>
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
