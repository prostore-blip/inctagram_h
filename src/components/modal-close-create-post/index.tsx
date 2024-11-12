import React, { ReactNode, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { Toast } from '@/components/layouts/Toast'
import { Modal, ModalButtonCancel, ModalContent, ModalTitle } from '@/components/modal'
import { db } from '@/services/db'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import { toast } from 'sonner'

import s from './modalCloseCreatePost.module.scss'

type Props = {
  children: ReactNode
  clearParentStates: () => void
  saveDraftPost: () => void
  showModal: (open: boolean) => void
  title: string
}
export const ModalCloseCreatePost = ({
  children,
  clearParentStates,
  saveDraftPost,
  showModal,
  title,
}: Props) => {
  /**
   * функция вызова коллбэка из пропсов по клику на кнопку
   */
  const logoutHandler = (o: boolean) => {
    showModal(false)
  }

  return (
    <Modal onOpenChange={logoutHandler} open>
      <ModalContent
        aria-describedby={undefined}
        className={s.content}
        onInteractOutside={event => {
          event.preventDefault()
        }}
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
          <div className={s.questionConfirmBlock}>{children}</div>
          <div className={s.buttonBlock}>
            <ModalButtonCancel asChild>
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
            </ModalButtonCancel>
            <Button className={s.saveDraftButton} onClick={saveDraftPost} variant={'primary'}>
              <Typography variant={'h3'}>Save draft</Typography>
            </Button>
          </div>
        </Card>
      </ModalContent>
    </Modal>
  )
}
