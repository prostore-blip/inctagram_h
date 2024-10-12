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
import clsx from 'clsx'
import Image from 'next/image'

import s from './modalPayment.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  buttonTitle?: string
  callback?: (isShowModalSuccessOrFailedPayment: string) => void
  children?: ReactNode
  classNameContent?: string
  description?: string
  title?: string
}
export const ModalPayment = ({
  buttonTitle,
  callback,
  classNameContent,
  description,
  title,
}: Props) => {
  /**
   * функция вызова коллбэка из пропсов по клику на кнопку Yes. Коллбэк передаёт в родителя id юзера и set-функцию для
   * закрытия данной модалки, если запрос в родителе успешен
   */
  const closeHandler = () => {
    if (callback) {
      callback('')
    }
  }

  return (
    <Modalka onOpenChange={(a: boolean) => {}} open>
      <ModalkaContent aria-describedby={undefined} className={clsx(s.content, classNameContent)}>
        <ModalkaTitle className={s.title}>
          <Typography variant={'h1'}>{title}</Typography>
          <ModalkaButtonCancel asChild>
            <Button className={s.close} onClick={closeHandler} variant={'text'}>
              <Close />
            </Button>
          </ModalkaButtonCancel>
        </ModalkaTitle>
        <Card className={s.card} maxWidth={'644px'} variant={'dark300'}>
          <div className={s.avaAndQuestionConfirmBlock}>{description}</div>
          <div className={s.buttonBlock}>
            <ModalkaButtonCancel asChild>
              <Button className={s.noButton} fullWidth onClick={closeHandler} variant={'primary'}>
                <Typography variant={'h3'}>{buttonTitle}</Typography>
              </Button>
            </ModalkaButtonCancel>
          </div>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}
