import React, { ReactNode, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { FollowersUsersType } from '@/components/ModalFollowers/types'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from './modalConfirm.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  callback: (userId: number, setFn: any) => void
  children: ReactNode
  title: string
  titleButtonTrigger: string
  user: FollowersUsersType
  variantTriggerButton: 'outline' | 'primary' | 'secondary' | 'text'
}
export const ModalConfirm = ({
  callback,
  children,
  title,
  titleButtonTrigger,
  user,
  variantTriggerButton,
}: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  /**
   * функция вызова коллбэка из пропсов по клику на кнопку Yes. Коллбэк передаёт в родителя id юзера и set-функцию для
   * закрытия данной модалки, если запрос в родителе успешен
   */
  const unfollowUser = () => {
    callback(user.userId, setOpen)
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Button className={s.unfollowButton} variant={variantTriggerButton}>
          <Typography variant={'h3'}>{titleButtonTrigger}</Typography>
        </Button>
      </ModalkaTrigger>
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
          <div className={s.avaAndQuestionConfirmBlock}>
            <Image
              alt={'small-avatar'}
              className={s.image}
              height={36}
              src={user.avatars[0]?.url ?? defaultAva}
              width={36}
            />
            {children}
          </div>
          <div className={s.buttonBlock}>
            <Button className={s.yesButton} onClick={unfollowUser} variant={'outline'}>
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
