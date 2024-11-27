import React, { Dispatch, SetStateAction } from 'react'

import { Return } from '@/assets/icons'
import { ModalCloseCreatePost } from '@/components/modal-close-create-post'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/uikit-temp-replacement/regular-dialog/RegularDialog'
import { Button, Typography } from '@chrizzo/ui-kit'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'

import s from '@/components/modalCreatePost/modalCreatePost.module.scss'

type Props = {
  clearStatesCreatePost: () => void
  imageError: string
  isDIsabledNextButton: boolean
  isPreview: boolean
  isShowModalConfirmCloseModalCreatePost: boolean
  onClickNextButtonHandler: () => void
  onClickReturnAddPhoto: () => void
  saveDraftPost: () => void
  setIsShowModalConfirmCloseModalCreatePost: Dispatch<SetStateAction<boolean>>
  toLoadForm: boolean
  toLoadImages: boolean
}
export const HeaderContent = ({
  clearStatesCreatePost,
  imageError,
  isDIsabledNextButton,
  isPreview,
  isShowModalConfirmCloseModalCreatePost,
  onClickNextButtonHandler,
  onClickReturnAddPhoto,
  saveDraftPost,
  setIsShowModalConfirmCloseModalCreatePost,
  toLoadForm,
  toLoadImages,
}: Props) => {
  return (
    <DialogHeader>
      {(toLoadForm || toLoadImages) && (
        <Button
          className={s.closeButton}
          disabled={isDIsabledNextButton}
          onClick={onClickReturnAddPhoto}
          variant={'text'}
        >
          <Return />
        </Button>
      )}
      <DialogTitle asChild>
        <Typography as={'h1'} variant={'h1'}>
          {!toLoadImages && !toLoadForm && 'Add Photo'}
          {toLoadImages && !toLoadForm && 'Edit Photo'}
          {toLoadForm && 'Publications'}
        </Typography>
      </DialogTitle>
      <VisuallyHidden>
        <DialogDescription>Select image from your computer</DialogDescription>
      </VisuallyHidden>
      {!toLoadForm && !toLoadImages && (
        <DialogClose asChild>
          <Button className={s.closeButton} variant={'text'}>
            <CloseIcon />
          </Button>
        </DialogClose>
      )}
      {isShowModalConfirmCloseModalCreatePost && (
        <ModalCloseCreatePost
          clearParentStates={clearStatesCreatePost}
          saveDraftPost={saveDraftPost}
          showModal={setIsShowModalConfirmCloseModalCreatePost}
          title={'Close'}
        >
          <Typography as={'span'} className={s.questionConfirm} variant={'regular16'}>
            Do you really want to close the creation of a publication? <br /> If you close
            everything will be deleted
          </Typography>
        </ModalCloseCreatePost>
      )}
      {isPreview && toLoadForm && (
        <Button className={s.publisheButton} form={'submitPostForm'} variant={'text'}>
          <Typography variant={'h3'}>Publish</Typography>
        </Button>
      )}
      {toLoadImages && (
        <Button
          className={s.publisheButton}
          disabled={isDIsabledNextButton || !!imageError}
          onClick={onClickNextButtonHandler}
          variant={'text'}
        >
          <Typography variant={'h3'}>Next</Typography>
        </Button>
      )}
    </DialogHeader>
  )
}
