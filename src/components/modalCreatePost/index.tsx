import React, { ChangeEvent, ReactNode, SyntheticEvent, useRef, useState } from 'react'

import { ImageIcon } from '@/assets/icons/image-icon'
import { ModalkaTrigger } from '@/components/modal'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/uikit-temp-replacements/regular-dialog/RegularDialog'
import { useTranslation } from '@/hooks/useTranslation'
import { Button, Typography } from '@chrizzo/ui-kit'
import { DialogProps } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import clsx from 'clsx'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import Image from 'next/image'

import s from './modalCreatePost.module.scss'

const BYTES_IN_MB = 1024 * 1024
const IMAGE_SIZE_MAX_MB = 10

const maxImageSizeBytes = BYTES_IN_MB * IMAGE_SIZE_MAX_MB

export type AvatarSelectionDialogProps = {
  onSave: (image: File | null) => Promise<void>
  trigger: ReactNode
} & DialogProps

export function ModalAddPhotoForPost({
  onOpenChange,
  onSave,
  ...props
}: AvatarSelectionDialogProps) {
  const [openModal, setOpenModal] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<null | string>(null)
  const [imageError, setImageError] = useState<null | string>(null)

  const [file, setFile] = useState<File | null>(null)

  const { t } = useTranslation()

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file) {
        console.warn('error getting file from the input')
      }
      if (!file.type.includes('png') && !file.type.includes('jpg') && !file.type.includes('jpeg')) {
        //todo fix layout - png and jbg have to be on a new line ('\n doesn't work for some reason')
        //implement dynamic content for locales https://safronman.gitbook.io/next-i18n-rree78-ewe#id-8-dinamicheskii-perevod
        setImageError(t.profile.settings.wrongFileFormat)

        return
      }

      if (file.size >= maxImageSizeBytes) {
        setImageError(t.profile.settings.imageSizeExceeded)

        return
      }

      const newPreview = URL.createObjectURL(file)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)
      setFile(file)
    }
  }

  const handleSaveImage = async () => {
    try {
      await onSave(file)
      preview && URL.revokeObjectURL(preview)
      setPreview(null)
    } catch (error) {
      console.log(error)
    }
  }

  const triggerFileInput = () => {
    imageError && setImageError(null)

    if (!inputRef.current) {
      return
    }
    inputRef.current.click()
  }

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    setPreview(null)
    console.log(e)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      //being closed
      preview && URL.revokeObjectURL(preview)
      imageError && setImageError(null)
      setPreview(null)
      setFile(null)
    }
    setOpenModal(open)
  }

  return (
    <Dialog {...props} onOpenChange={handleOpenChange} open={openModal}>
      <ModalkaTrigger asChild className={clsx(openModal && s.open)}>
        {props.trigger}
      </ModalkaTrigger>
      <DialogContent className={s.content}>
        <DialogHeader>
          <DialogTitle asChild>
            <Typography as={'h1'} variant={'h1'}>
              Add Photo
            </Typography>
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Select image from your computer</DialogDescription>
          </VisuallyHidden>
          <DialogClose asChild>
            <Button className={s.closeButton} variant={'text'}>
              <CloseIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <input
          accept={'image/*'}
          hidden
          onChange={handleImageSelect}
          ref={inputRef}
          type={'file'}
        />

        <div className={s.flexColumn}>
          {imageError && (
            <div className={s.errorBox}>
              <Typography variant={'regularBold14'}>Error!</Typography>
              <Typography variant={'regular14'}>{imageError}</Typography>
            </div>
          )}
          <div className={s.imageContainer}>
            {!preview && <ImageIcon size={36} />}
            {preview && (
              <Image
                alt={'profile image'}
                height={228}
                onError={handleImageError}
                src={preview}
                style={{ objectFit: 'cover' }}
                width={222}
              />
            )}
          </div>
          <div className={s.buttonsBlock}>
            <Button className={s.selectButton} onClick={triggerFileInput} variant={'primary'}>
              {t.common.selectFromComputer}
            </Button>
            <Button className={s.selectButton} onClick={() => {}} variant={'outline'}>
              Open Draft
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
