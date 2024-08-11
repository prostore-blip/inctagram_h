import React, { useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { FollowersUsersType } from '@/components/modalFollowers/types'
import { useDeleteFolowerFromFolowersMutation } from '@/services/inctagram.followings.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from './modalConfirm.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'
type Props = {
  user: FollowersUsersType
}

export const ModalConfirm = ({ user }: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)
  /**
   * хук RTKQ. Убрать юзера из подписчиков
   */
  const [unfollow] = useDeleteFolowerFromFolowersMutation()
  const unfollowUser = (selectedUserId: number) => {
    unfollow(selectedUserId)
      .unwrap()
      .then(() => setOpen(false))
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Button className={s.unfollowButton} variant={'outline'}>
          <Typography variant={'h3'}>Unfollow</Typography>
        </Button>
      </ModalkaTrigger>
      <ModalkaContent aria-describedby={'open viewport followers'} className={s.content}>
        <ModalkaTitle className={s.title}>
          <Typography variant={'h1'}>Unfollow</Typography>
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
            <Typography as={'span'} className={s.questionConfirm} variant={'regular16'}>
              Do you really want to Unfollow from this user "
              <Typography as={'span'} className={s.userName} variant={'h3'}>
                {user.userName}
              </Typography>
              "?
            </Typography>
          </div>
          <div className={s.buttonBlock}>
            <Button
              className={s.yesButton}
              onClick={() => unfollowUser(user.userId)}
              variant={'outline'}
            >
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
