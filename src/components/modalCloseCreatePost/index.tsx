import React, { ReactNode, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { Modalka, ModalkaButtonCancel, ModalkaContent, ModalkaTitle } from '@/components/modal'
import { Button, Card, Typography } from '@chrizzo/ui-kit'

import s from './modalCloseCreatePost.module.scss'

type Props = {
  children: ReactNode
  clearParentStates: () => void
  showModal: (open: boolean) => void
  title: string
}
export const ModalCloseCreatePost = ({ children, clearParentStates, showModal, title }: Props) => {
  /**
   * функция вызова коллбэка из пропсов по клику на кнопку
   */
  const logoutHandler = (o: boolean) => {
    showModal(false)
  }

  return (
    <Modalka onOpenChange={logoutHandler} open>
      <ModalkaContent
        aria-describedby={undefined}
        className={s.content}
        onInteractOutside={event => {
          event.preventDefault()
        }}
      >
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
            <ModalkaButtonCancel asChild>
              <Button
                className={s.discardButton}
                onClick={() => {
                  clearParentStates()
                  showModal(false)
                }}
                variant={'outline'}
              >
                <Typography variant={'h3'}>Discard</Typography>
              </Button>
            </ModalkaButtonCancel>
            <Button
              className={s.saveDraftButton}
              onClick={() => {
                alert('не реализовано!')
              }}
              variant={'primary'}
            >
              <Typography variant={'h3'}>Save draft</Typography>
            </Button>
          </div>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}
