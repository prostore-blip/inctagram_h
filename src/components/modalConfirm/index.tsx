import React, { ReactNode, useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modal,
  ModalButtonCancel,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal'
import { FollowersUsersType } from '@/components/modal-followers/types'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from './modalConfirm.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  callback: (userId: string, setFn: any) => void
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
    <Modal onOpenChange={setOpen} open={open}>
      <ModalTrigger asChild>
        <Button className={s.unfollowButton} variant={variantTriggerButton}>
          <Typography variant={'h3'}>{titleButtonTrigger}</Typography>
        </Button>
      </ModalTrigger>
      <ModalContent
        aria-describedby={undefined}
        className={s.content}
        onInteractOutside={e => e.preventDefault()}
      >
        <ModalTitle className={s.title}>
          <Typography variant={'h1'}>{title}</Typography>
          <ModalButtonCancel asChild>
            <Button className={s.close} variant={'text'}>
              <Close />
            </Button>
          </ModalButtonCancel>
        </ModalTitle>
        <Card className={s.card} maxWidth={'644px'} variant={'dark300'}>
          <div className={s.avaAndQuestionConfirmBlock}>
            <Image
              alt={'small-avatar'}
              className={s.image}
              height={36}
              // src={user.avatars[0]?.url ?? defaultAva}
              src={defaultAva}
              width={36}
            />
            {children}
          </div>
          <div className={s.buttonBlock}>
            <Button className={s.yesButton} onClick={unfollowUser} variant={'outline'}>
              <Typography variant={'h3'}>Yes</Typography>
            </Button>
            <ModalButtonCancel asChild>
              <Button className={s.noButton} variant={'primary'}>
                <Typography variant={'h3'}>No</Typography>
              </Button>
            </ModalButtonCancel>
          </div>
        </Card>
      </ModalContent>
    </Modal>
  )
}
